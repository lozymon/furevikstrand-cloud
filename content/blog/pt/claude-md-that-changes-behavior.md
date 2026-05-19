---
title: 'O CLAUDE.md que de fato muda o comportamento'
summary: 'A maioria dos CLAUDE.md descreve o projeto. Stack, pastas, build — coisas que o Claude deriva em dois ls. Os que realmente mudam comportamento têm três tipos de regra: negativas, enraizadas em incidente, gosto com um porquê.'
publishAt: 2026-05-19T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

Já escrevi mais arquivos CLAUDE.md do que consigo contar. A maioria dos primeiros não mudou em nada o comportamento do Claude.

![À esquerda: um CLAUDE.md cheio de descrição do projeto (stack, pastas, comando de build) marcado "Claude pode derivar isso." À direita: um CLAUDE.md cheio de regras negativas, regras enraizadas em incidente, e regras de gosto com um porquê — marcado "muda o que é escrito."](/blog/claude-md-that-changes-behavior/pt.svg)

## O instinto que falha

Quando você abre um CLAUDE.md em branco pela primeira vez, o instinto é descrever o projeto. Stack, pastas, comandos de build, gerenciador de pacotes, deploy target.

```txt
Stack: Next.js + Postgres
Folders: src/, app/, lib/
Build: npm run build
Tests: npm test
```

Parece produtivo. Não é. O Claude consegue derivar quase tudo do repo com dois `ls` e uma leitura do `package.json`. O arquivo descreve o que o modelo já vê, o que significa que não muda nada no output. Você não ajustou o assistente; você escreveu um README.

Os arquivos CLAUDE.md que realmente deslocam comportamento têm três sabores de regra, e quase nenhuma descrição de projeto.

## O que funciona: três tipos de regra

### 1. Regras negativas

Regras no formato "não faça X." Estas são estruturais porque o modo de falha padrão de qualquer assistente é _excesso de ação_: você pede uma correção de bug e ganha um refactor, ou pede uma função e ganha uma abstração nova.

Exemplos que compensam ao longo de uma codebase:

- "Não adicione comentários a menos que o WHY não seja óbvio."
- "Sem shims de retrocompatibilidade. Mude o código."
- "Não adicione error handling para casos que não podem acontecer — valide só nas fronteiras do sistema."
- "Pergunte antes de comandos git destrutivos."

Cada regra negativa cerca um excesso comum. O efeito cumulativo é o equivalente a um revisor de contenção, aplicado silenciosamente em cada turno.

### 2. Regras enraizadas em incidente

Regras que existem porque algo específico deu errado, e você não quer que aconteça de novo. Estas têm um _porquê_, e o porquê é o ponto todo.

- "Testes de integração devem bater num banco real, não em mocks. Razão: divergência mock/prod no Q3 escondeu uma migration quebrada."
- "Nunca delete arquivos em `/migrations/` mesmo que pareçam obsoletos. Razão: suporte a rollback depende do histórico completo."
- "Use o logger existente, não console.log. Razão: output de console é descartado pelo log shipper de produção."

A razão importa tanto quanto a regra. Sem um _porquê_, uma regra enraizada em incidente parece arbitrária nos edge cases, e o modelo ou super-aplica ou silenciosamente pula. Com um _porquê_, o modelo pode exercitar julgamento quando o edge case aparece.

### 3. Regras de gosto com um porquê

Decisões de preferência sobre como você gosta que o trabalho seja feito — mas nunca preferências secas. Toda regra de gosto precisa da razão.

- "Prefira um PR único para refactors nesta área. Razão: revisores pediram."
- "Default para descrições de PR curtas. Razão: as longas não são lidas."
- "Evite abstrações prematuras. Três linhas parecidas é melhor que um helper usado uma vez."

O padrão regra-de-gosto + razão é a diferença entre um assistente que espelha seu estilo e um que volta aos defaults do training data no momento em que seu prompt fica curto.

## O teste do cheiro

Para cada linha do seu CLAUDE.md, pergunte:

> Se eu removesse essa linha, o output do Claude seria mensuravelmente pior?

Se a resposta for não, a linha é decoração. Decoração é cara — consome sua janela de contexto a cada turno, e dilui o sinal das linhas que importam. Corte.

Linhas que passam no teste do cheiro são quase sempre um dos três tipos acima. Linhas que falham são quase sempre descrição de projeto.

## A regra que você deveria remover

Uma prática contraintuitiva: a cada poucas semanas, olhe seu CLAUDE.md e ache a _uma regra que deu contraproducente_. Talvez seja muito rígida e o modelo começou a fazer coisas erradas para obedecer. Talvez seja muito vaga e o modelo interpretou diferente do que você quis dizer. Talvez a codebase tenha mudado e a regra não se aplique mais.

Corte.

Um CLAUDE.md que só cresce é um CLAUDE.md que acumulou regras mortas — e regras mortas são piores que regra nenhuma, porque o modelo as trata com o mesmo peso das vivas. A disciplina de remover uma regra obsoleta por revisão mantém o sinal do arquivo alto.

## Por que isso importa mais do que você imagina

CLAUDE.md é um dos 30 minutos de maior alavancagem que você vai gastar em ferramentas de IA. Diferente de prompts — que aplicam uma vez e são esquecidos — CLAUDE.md aplica a cada turno, em cada conversa, até você mudar. Uma boa regra te paga de volta centenas de vezes. Uma má regra te leva ao erro centenas de vezes.

O formato do arquivo importa menos que o conteúdo. Markdown, texto puro, bullets, prosa — Claude lida com todos. O que importa é se o arquivo _restringe_ ou _descreve_. Descrever é confortável e inútil. Restringir é desconfortável e é o ponto inteiro.

## A regra

Se uma linha do CLAUDE.md não muda o que é escrito, ela não pertence ali. Regras negativas, regras enraizadas em incidente com um porquê, regras de gosto com um porquê — essas conquistam seu lugar. Descrição de projeto não.

O modelo consegue ler sua codebase. Ele não consegue ler seus incidentes.
