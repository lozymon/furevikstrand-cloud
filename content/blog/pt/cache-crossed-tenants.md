---
title: 'O cache que cruzou tenants'
summary: 'Dois clientes passaram uma manhã cotando os preços um do outro porque um singleton NestJS guardava um Map em memória com apenas o SKU como chave. A correção foram três caracteres.'
publishAt: 2026-05-19T09:00:00+02:00
tags: [nestjs, typescript, multitenant, caching, war-story]
---

Dois dos nossos maiores clientes passaram uma manhã inteira cotando os preços um do outro. A correção foram três caracteres em uma chave de cache.

Nosso serviço de preços guardava um `Map<string, Price>` em um singleton NestJS, com o SKU como chave. Funcionava perfeitamente em testes, porque os testes nunca tinham mais de um tenant. Em produção, dois tenants compartilhavam um fornecedor e, portanto, compartilhavam SKUs. A primeira requisição que populava o cache definia o preço para todo mundo que pedisse aquele SKU depois.

O formato clássico:

```ts
@Injectable()
class PricingService {
  private cache = new Map<string, Price>()

  async getPrice(sku: string) {
    if (!this.cache.has(sku)) {
      this.cache.set(sku, await this.repo.fetch(sku))
    }
    return this.cache.get(sku)!
  }
}
```

Parece ok. Não é. O cache vive entre requisições — esse é o ponto de cachear. Mas a chave não carrega tenant nenhum, então um valor com escopo de tenant fica em um slot agnóstico a tenant.

A correção:

```ts
async getPrice(tenantId: string, sku: string) {
  const key = `${tenantId}:${sku}`
  if (!this.cache.has(key)) {
    this.cache.set(key, await this.repo.fetch(tenantId, sku))
  }
  return this.cache.get(key)!
}
```

Três caracteres na chave, um parâmetro na assinatura. Doze linhas de relatório de incidente.

O bug não dispara até dois tenants colidirem na chave interna — o que significa que ele sobrevive a todo teste e a todo ambiente de staging populado com um único tenant. Depois da correção, auditamos todos os outros `Map` e `Set` em memória do serviço atrás do mesmo formato. Achamos mais dois. Mesmo patch.

Regra de bolso: qualquer map em memória em um serviço multi-tenant é um vazamento de dados esperando para acontecer se a chave não carregar o tenant. Escope a chave. Não confie em nada compartilhado.
