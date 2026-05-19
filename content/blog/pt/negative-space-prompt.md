---
title: 'O prompt de espaço negativo'
summary: 'Você pede ao Claude uma correção de uma linha e recebe um refactor, três testes novos, um arquivo renomeado e um comentário. A correção é escopo negativo — nomeie a faixa que o assistente não deve cruzar, e o resto do prompt fica curto.'
publishAt: 2026-05-20T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

Você pede uma correção de uma linha. Você recebe um refactor, três testes novos, um arquivo renomeado, e um comentário explicando por que a mudança é segura.

![À esquerda: um prompt que diz "Conserte o bug." produz um diff espalhado de 300 linhas que refatora o código ao redor, adiciona testes, renomeia um arquivo, e se autoexplica. À direita: um prompt que diz "Conserte o bug. Não refatore." produz um diff de uma linha — exatamente o que foi pedido.](/blog/negative-space-prompt/pt.svg)

## O modo de falha padrão

O modo de falha padrão de qualquer assistente capaz — humano ou IA — é _excesso de ação_. Pedido para fazer uma coisa, faz cinco. Cada extra parece útil isoladamente. Nenhum foi pedido. Juntos, dobram o diff, triplicam o tempo de review, e enterram a correção real em ruído.

Todo guia de prompting que li tenta consertar isso adicionando mais instruções positivas: seja mais específico sobre o que quer, dê mais contexto, explique as restrições, liste os passos. Funciona, mais ou menos. Também demora mais para escrever do que a própria correção.

Existe um jeito mais rápido: restringir com negativos.

## Como parece

O padrão é anexar uma frase curta que cerca o excesso que você espera:

- "Conserte esse bug. **Não refatore o código ao redor.**"
- "Adicione esse campo. **Não adicione validação; a fronteira acima já valida.**"
- "Escreva a migration. **Não adicione feature flag.**"
- "Atualize o doc. **Não reestruture os títulos.**"
- "Adicione esse endpoint. **Não escreva testes ainda; faço isso numa rodada separada.**"

Cada negativo é uma frase curta. Nenhum requer enumerar o que você _quer_. Funcionam porque cortam a faixa específica em que o assistente teria se esticado.

## Por que isso bate scoping positivo

Você consegue o mesmo resultado sendo maximamente específico na direção positiva: "Mude a linha 42 de `==` para `===`. Não modifique nenhuma outra linha neste arquivo ou em qualquer outro arquivo." Funciona. Também leva trinta segundos para escrever e parece um contrato jurídico.

Scoping negativo é mais rápido porque excesso de ação tem um vocabulário pequeno e previsível. Quase todo excesso cai em uma de quatro categorias:

1. **Refactor dentro de uma correção.** "Conserte X, não refatore."
2. **Validação especulativa.** "Não adicione validação para casos que não podem acontecer."
3. **Comentários autoexplicativos.** "Não comente a menos que o WHY não seja óbvio."
4. **Testes que você não pediu.** "Não escreva testes; eu faço isso separado."

Se você consegue nomear a faixa que _não_ quer, o resto do prompt pode ficar curto. Você está descrevendo o _espaço negativo_ da mudança, não enumerando seu conteúdo positivo.

## A parte não óbvia

Isso não é um problema de IA. É um problema de _briefing_. Dê para um dev júnior um ticket vago e ele vai ou fazer três perguntas esclarecedoras ou — se não se sentir seguro perguntando — adivinhar generosamente e enviar mais do que você queria. Dê o mesmo ticket mais "não reestruture nada, só corrija o sintoma," e você recebe exatamente o que precisava.

O escopo negativo funciona em humanos pela mesma razão que funciona em assistentes: remove ambiguidade na dimensão que realmente importa. O pedido positivo sempre foi claro. O espaço para "adições úteis" era a parte que precisava ser cercada.

## Quando _não_ usar

Scoping negativo falha em dois casos:

1. **Quando o prompt em si é exploratório.** "Investigue essa query lenta" não deve ter negativos — você quer que o assistente siga pistas, não as cerque de antemão.
2. **Quando você ainda não sabe o que quer.** Scoping negativo pressupõe uma forma conhecida de "feito." Se a spec é vaga, mais negativos só produzem mais saídas estreitas confiantemente-erradas. Planeje primeiro, restrinja depois.

A regra: use escopo negativo quando você sabe como "feito" se parece e quer que o assistente pare na porta. Use prompts abertos quando você quer que ele vagueie.

## A regra

O que você diz ao assistente _não_ fazer é mais estrutural que o que você pede. Todo prompt que volta com extras surpresa é um prompt que deixou uma faixa aberta. Nomear a faixa é uma frase. Escrever uma spec positiva completa é um parágrafo.

Barato adicionar. Difícil pular depois que você sentiu a diferença.
