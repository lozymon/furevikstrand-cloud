---
title: 'Três slash commands que pagam o aluguel'
summary: 'A maioria dos recursos do Claude Code não é usada — as pessoas não saem do chat. /review, /security-review e /init se pagam no primeiro dia, mas cada um tem um uso errado que vira teatro. A ferramenta é grátis; o hábito é o custo.'
publishAt: 2026-05-28T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

A maioria dos recursos do Claude Code nunca é usada porque as pessoas não saem do chat.

![Três cards verticais em fundo escuro. Cada card mostra um slash command, o que faz em uma linha, e um destaque de "erro comum". Card 1: /review — leia o diff antes de pushar — erro: rodar depois do push. Card 2: /security-review — audita arquivos sensíveis de segurança — erro: rodar na branch inteira. Card 3: /init — bootstrap do CLAUDE.md — erro: manter a saída como está.](/blog/three-slash-commands/pt.svg)

O chat é a superfície de entrada. Não é o produto. O produto é tudo o que você constrói em cima: skills, agents, hooks, slash commands, settings. A maior parte fica sem uso porque a superfície de chat sozinha já é _suficiente_ para se sentir produtivo — e "suficiente" é inimigo de "realmente bom."

Três comandos pagam o aluguel no primeiro dia. Cada um vem com um erro comum que o transforma em teatro.

## `/review` — leia o diff antes de pushar

O que faz: roda uma passada de code review na branch atual. Pega o teste pela metade, o `TODO` esquecido, o import sem uso, a função que perdeu o último chamador dois refactors atrás.

Como uso: antes de _todo_ push. Branches solo incluídas. O custo marginal são 30 segundos. O valor esperado ao longo de um ano de branches é enorme — uma regressão pega paga por milhares de execuções.

O erro comum: rodar `/review` _depois_ do push. Nesse ponto a review é teatro — você já adicionou a mudança ao modelo mental do time, e qualquer captura agora exige um PR de follow-up. O ponto inteiro da review local é que ainda é grátis agir sobre ela. Rode antes do push, depois pushe.

## `/security-review` — escopo estreito ou ruído

O que faz: audita as mudanças por problemas de segurança comuns — tratamento de input, auth, segredos, fronteiras externas.

Quando usar: qualquer mudança que toque autenticação, qualquer coisa que leia input de usuário, qualquer coisa que cruze a fronteira de confiança (HTTP, IO de arquivo, subprocess, banco de dados). Para o resto, o custo de ruído supera o benefício.

O erro comum: apontar para a branch inteira. Um PR de 400 linhas com doze arquivos solta doze achados plausíveis de "considere", metade deles sobre código que não foi tocado e nunca teve o problema. O sinal afunda.

A correção é escopar: rode _só nos arquivos sensíveis a segurança_. Dois arquivos entram, quatro achados saem, todos relevantes. Agora a review está fazendo trabalho.

## `/init` — comece, não envie

O que faz: faz bootstrap de um `CLAUDE.md` lendo o codebase e resumindo estrutura, convenções e pontos de entrada.

Quando usar: qualquer repo novo, ou qualquer repo existente sem um CLAUDE.md. A saída é uma estrutura inicial útil — seções que você não precisou nomear, andaime que você não precisou escrever.

O erro comum: manter a saída como está. O bootstrap é genérico. Parece documentação. Funciona como papel de parede — o modelo lê e fica com uma vaga sensação do codebase, sem nenhuma restrição real sobre comportamento.

O valor vem das edições que _você_ faz em cima. Seu gosto, seus incidentes, seus "não faça". Cada memória ali dentro deveria ser algo que você teria dito a um colega depois de um incidente — não algo que dá pra derivar de `ls`. O bootstrap é a tela; o valor é a tinta.

## O padrão

Os três têm a mesma forma:

1. Grátis para rodar.
2. Alto valor no momento certo.
3. Valor zero — ou negativo — se você usa errado.

A razão de as pessoas não pegarem isso não é falta de acesso. É que a disciplina de "rode _aqui_, não _ali_" é invisível até você ter pago pelo erro uma vez.

## A regra

A ferramenta é grátis. O hábito é o custo.

Se você usa Claude Code há uma semana e não tocou em nenhum desses três, você está operando na menor superfície possível de um produto muito maior. Pegar um deles — e rodar na hora certa no escopo certo — é o upgrade de workflow mais barato disponível.

Pague o hábito uma vez. Ele rende para sempre.
