---
title: 'Não aceite slop no primeiro passe'
summary: 'O resumo da IA sobre o que ela fez não é o mesmo que ela fez. O resumo parece o artefato. O diff é o artefato — e a única review que sobrevive seis meses é a feita contra o diff, não contra o resumo.'
publishAt: 2026-05-27T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

O resumo da IA sobre o que ela fez não é o mesmo que ela fez.

![À esquerda: um resumo da IA dizendo "Adicionei validação de input e melhorei o tratamento de erro do fluxo de registro de usuário" — confiante, plausível, quatro linhas. À direita: o diff real — 60 linhas de try/catch em volta de chamadas internas, três pedaços de validação para argumentos que vêm de fronteiras já validadas, e um comentário explicando que a mudança é segura.](/blog/dont-accept-slop/pt.svg)

## Resumo vs diff

O resumo é um relato confiante. Costuma estar correto. Às vezes está errado justo nas partes que importam — o refactor não pedido, a validação especulativa, o bloco de comentário onde um rename resolveria.

O resumo _parece_ o artefato. O diff _é_ o artefato. Daqui a seis meses, o resumo terá sido esquecido e o código ainda estará lá, moldando a leitura da próxima pessoa.

## Três sinais de slop

Os padrões são previsíveis o bastante pra reconhecer em segundos:

1. **A forma está errada.** Você pediu um fix, recebeu um refactor. Pediu um rename, recebeu uma nova abstração. Pediu um comentário, recebeu uma função wrapper mais um teste pro wrapper. O diff "funciona." Não é o que você queria.

2. **Código defensivo para casos que não podem acontecer.** Try/catch em volta de chamadas internas. Validação de argumentos vindos do seu próprio código. Caminhos de fallback que nada nunca vai bater. O clima é _estou sendo cuidadoso_. A realidade é código morto que leitores futuros vão tratar como peça estrutural.

3. **Testes que testam o mock, não o comportamento.** O mock retorna `{ ok: true }`. O teste assere que o resultado é `{ ok: true }`. Se a implementação sob teste fosse substituída por `return null`, o teste passaria do mesmo jeito — porque o mock está fazendo todo o trabalho. Isso não é um teste. É placebo.

O que os três têm em comum: parecem produtivos no resumo, e são peso morto no diff.

## Por que o resumo é marketing

O resumo é gerado pelo modelo logo depois que ele age, resumindo o próprio trabalho. Modelos treinados para ser prestativos tendem a descrever o próprio trabalho em termos que soam prestativos. _"Adicionei validação"_ é o tipo de frase que soa como um passo à frente. _"Escrevi 60 linhas de código defensivo morto"_ nunca aparece num resumo, mesmo quando é a descrição mais precisa.

Não é desonestidade. É a forma natural da autonarração. Fazemos a mesma coisa nos nossos próprios PRs.

A correção é mecânica: não aceite o resumo como a review. Leia o diff. Cada linha.

## O hábito de 30 segundos

Para diffs abaixo de 200 linhas, o passe de review é:

1. Varra o diff. _Leia cada linha alterada._ Não um resumo, não uma visão dobrada — as linhas em si.
2. Para cada bloco, pergunte: eu teria escrito isso?
3. Rejeite qualquer linha que falhe no teste. Ou apague você mesmo, ou peça um passe mais apertado.

Para diffs maiores, o hábito é o mesmo, mas mais difícil — e é exatamente onde o slop se esconde melhor. Diffs maiores são onde a limpeza de quatro linhas vira um refactor de 200.

Se um diff é _"longo demais para reviewar,"_ a resposta certa é _"então é longo demais para mergear."_ Peça pra quebrar, ou pra reduzir o escopo.

## Quando relaxar

Eu não aplico isso em:

- Scripts descartáveis que vou rodar uma vez e deletar.
- Boilerplate gerado que pedi explicitamente (um andaime de migração, uma fixture de teste).
- A saída de formatadores ou linters.

Em todo o resto, o diff passa pelo passe de 30 segundos antes de ser staged.

## A regra

O resumo é marketing. O diff é o produto. A review que você deve é ao diff.

O slop acumula. Quando você nota a classe wrapper que ninguém sabe nomear, ela já foi importada por doze arquivos. Os 30 segundos que você não gastou lendo viram os 30 minutos que você gasta apagando.

Daqui a seis meses, ninguém lembra do resumo. O código é o que sobra.
