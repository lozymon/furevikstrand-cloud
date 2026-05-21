---
title: 'Planeje antes de codar: a armadilha do "só escreve"'
summary: 'O Claude escreve código de qualquer prompt vago — quase sempre no formato errado, que você só nota 300 linhas depois. A correção é uma frase: planeje primeiro. O valor é o desacordo que o plano revela enquanto ainda é grátis consertar.'
publishAt: 2026-05-21T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools, practice]
---

Perdi quase um dia inteiro neste mês com um refactor que precisou ser revertido no review. O modelo produziu um diff confiante e plausível. Era do formato errado. O plano teria pego isso em 90 segundos.

![À esquerda: um prompt "Refatore o fluxo de auth." produz um diff de 300 linhas que extrai uma classe base, adiciona três classes de estratégia, reescreve os chamadores, e escreve 18 testes — carimbado "ABSTRAÇÃO ERRADA — REVERTER." À direita: o mesmo prompt com "Planeje primeiro." anexado produz um plano numerado, com um risco no passo do strategy pattern — pego antes do código ser escrito.](/blog/plan-before-code/pt.svg)

## O modo de falha padrão

O Claude vai escrever código com prazer a partir de um prompt vago. É o padrão — o modelo é recompensado por produzir saída, não por parar e perguntar. O resultado costuma ser _plausível_ e errado de um jeito que você só percebe quando o diff já tem 300 linhas, a abstração já se espalhou por seis chamadores, e reverter parece quase tão caro quanto continuar.

Isso não é falha do modelo. É falha de _briefing_. O prompt não restringiu a forma da resposta, então o assistente escolheu uma. Escolheu plausivelmente. Escolheu errado. A mesma coisa acontece com um dev júnior que recebe um ticket vago; a diferença é que o dev é mais devagar, então a direção errada costuma aparecer antes.

## Como o planejamento parece

A correção é uma frase a mais:

> "Refatore o fluxo de auth. Planeje primeiro — não escreva código ainda."

Ou, se você prefere um slash command, o agente embutido equivalente. De qualquer jeito: o modelo produz um plano numerado em vez de um diff. Você lê. Discorda das partes que parecem erradas. Aprova. _Aí sim_ ele escreve o código.

Um plano típico parece assim:

```txt
1. Ler uso existente de authFlow() em todo o codebase.
2. Extrair a lógica de validação compartilhada para um helper.
3. Adicionar um strategy pattern para os três casos atuais.
4. Atualizar cada chamador para usar o novo ponto de entrada.
5. Adicionar testes para cada ramo de estratégia.
```

É aqui também que o desacordo acontece. O passo 3 — "adicionar um strategy pattern" — é exatamente o tipo de jogada que soa plausível e vira uma abstração arrependida. Com o plano na sua frente, você consegue dizer: "Não, dois desses casos vão ser deletados. Só inline o terceiro." Pronto, o passo 3 some antes de qualquer código ter sido escrito.

## A parte não óbvia

O instinto é pensar que o valor do plano é _o plano em si_ — um mapa, um entendimento compartilhado, um documento. Não é.

O valor é a _captura_. O plano é só o meio onde o desacordo aparece enquanto ainda é grátis de consertar. O mesmo desacordo, aparecendo num diff de 300 linhas, custa uma reversão e um recomeço. Aparecendo em três frases de pseudocódigo, custa quinze segundos.

Depois que você internaliza isso, o plano deixa de parecer overhead e começa a parecer um seguro barato. O preço é uma frase a mais no prompt e 90 segundos de leitura. O retorno é cada commit de direção errada que você não enviou.

## Quando não planejar

Planejar é overhead. Como todo overhead, só deve ser pago quando a alternativa é mais cara. Três casos em que pulo o plano:

1. **Trabalho trivial e mecânico.** Renomeações, formatação, "aplique esse padrão em mais 12 lugares." O diff é previsível. Planejar adiciona atrito sem adicionar capturas.
2. **Trabalho exploratório.** Investigar uma query lenta, rastrear por que um teste é flaky. Você _quer_ que o assistente siga pistas, não as cerque antes. Planejamento prematuro é só restrição prematura.
3. **Código descartável.** Um script que vai rodar uma vez e deletar. A direção errada é barata; o plano não vale os segundos que custa.

A heurística: se você consegue _prever o formato do diff_, pule o plano. Se não consegue, planeje primeiro. O custo de errar essa decisão escala com o tamanho da mudança.

## A regra de uma linha

Se você não consegue prever o diff, planeje primeiro.

É isso. Barato de lembrar. Barato de aplicar. As oito horas que você não perde com uma abstração arrependida pagam de sobra os segundos gastos pensando se vale planejar.

O modelo vai escrever a coisa errada com prazer. Seu trabalho é perceber que ele pode estar prestes a — e pedir o plano em vez.
