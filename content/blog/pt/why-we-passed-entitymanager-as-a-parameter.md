---
title: 'Por que passamos EntityManager como parâmetro'
summary: 'Um bug de stock drift que ninguém conseguia reproduzir localmente. A correção foi uma mudança de assinatura — pare de injetar EntityManager em singletons NestJS, passe por requisição.'
publishAt: 2026-05-12T09:00:00-03:00
tags: [nestjs, typescript, concurrency, dependency-injection, war-story]
---

Tivemos um bug de stock drift que ninguém conseguia reproduzir localmente. A correção foi uma mudança de assinatura de função.

Nosso serviço de subscriptions tinha um stock manager que injetava `EntityManager` via DI e segurava uma referência. Requisições concorrentes compartilhavam a mesma instância. Sob carga, as transações começaram a vazar uma na outra — o rollback de uma requisição podia descartar a escrita já commitada de outra.

O formato clássico do NestJS:

```ts
@Injectable()
class StockManager {
  constructor(@InjectEntityManager() private em: EntityManager) {}

  async reserve(eventId: string) {
    return this.em.transaction(async (tx) => {
      /* ... */
    })
  }
}
```

Parece ok. Não é. O `em` injetado é um singleton com escopo no módulo. Toda requisição concorrente compartilha. O contexto de transação dentro do callback `.transaction(...)` é específico da requisição — o TypeORM trata isso corretamente. Mas o campo wrapper em `this` não.

Sob carga, duas requisições chamando `reserve()` no mesmo milissegundo podiam disputar de formas que o ambiente de testes não conseguia reproduzir, porque o ambiente de testes era efetivamente single-threaded. Especificamente: se a transação da requisição A estava em andamento quando a transação da requisição B começou e fez rollback, o rollback de B podia descartar estado já commitado de A. Não sempre. Só com frequência suficiente para o contador de estoque divergir uma ou duas unidades por dia em produção.

A correção: passar `EntityManager` como parâmetro explícito em cada método, vindo do contexto de transação da requisição.

```ts
async reserve(eventId: string, manager: EntityManager) {
  return manager.transaction(async (tx) => {
    /* ... */
  })
}
```

Os callers obtêm o `EntityManager` da requisição via um interceptor do NestJS ou um lookup no `AsyncLocalStorage`. Uma mudança de assinatura por método. Três dias de refactor no serviço inteiro. A drift sumiu uma semana depois do deploy.

No NestJS a tentação é injetar tudo. Mas injectable + mutable + shared = o formato do bug que enviamos. Escolha dois dos três e você está bem. Escolha os três e você envia o bug que enviamos.

Regra de bolso: se a mesma instância vive entre requisições E o estado dela muda por requisição, você tem um bug de concorrência esperando para acontecer. Passe o estado, não injete.
