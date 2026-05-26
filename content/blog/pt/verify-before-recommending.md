---
title: 'Verifique antes de recomendar: quando a IA cita, você dá grep'
summary: 'A saída mais perigosa da IA não é errada — é velha. O Claude cita com confiança uma flag removida no último trimestre, uma função renomeada, um caminho que não existe mais. Trate todo símbolo nomeado como hipótese. Dê grep antes de agir.'
publishAt: 2026-05-26T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

A saída mais perigosa da IA não é a errada. É a _desatualizada_.

O Claude vai recomendar uma flag que foi removida há três meses, uma função que foi renomeada no último trimestre, um caminho de arquivo que não existe mais. Cada citação soa certa porque _era_ certa.

![À esquerda: uma resposta da IA dizendo "Use a flag --strict e chame validateInput() em src/lib/auth/middleware.ts" carimbada CONFIANTE. À direita: saída de terminal do grep mostrando que a flag sumiu, a função foi renomeada, e o arquivo foi movido — três bugs silenciosos que a IA não conhecia.](/blog/verify-before-recommending/pt.svg)

## O modo de falha padrão

Isso não é alucinação. Alucinação é o modelo inventar uma API plausível mas falsa. Isso é pior: o modelo está repetindo algo que _era_ verdade no dia em que aprendeu, e não tem como perceber que não é mais.

Três sabores aparecem na prática:

1. **Símbolos renomeados.** Uma função foi refatorada no último trimestre; o assistente ainda cita o nome antigo.
2. **Flags removidas.** Uma opção de CLI foi descontinuada; o assistente ainda recomenda porque aparecia em um doc que ainda está cacheado em algum lugar.
3. **Caminhos movidos.** Um arquivo foi reorganizado; o assistente cita o import antigo.

Nenhum desses parece errado na página. O Markdown está intocado. O modelo emite a resposta com a mesma confiança de uma citação que gerou hoje de manhã.

## Por que isso acontece com qualquer sistema de estado persistente

É tentador chamar isso de falha do modelo, mas o mesmo padrão aparece em todo lugar onde um snapshot armazenado encontra um codebase em movimento:

- **Auto-memory.** Uma memória escrita há seis semanas diz que o fluxo de auth fica em `src/lib/auth/middleware.ts`. O arquivo foi renomeado há duas semanas. A memória agora é uma máquina de alucinação apontada para o seu projeto.
- **RAG sobre docs.** O índice foi reconstruído pela última vez antes do rewrite. Queries devolvem respostas formatadas com confiança a partir da superfície antiga da API.
- **Modelos fine-tunados.** Treinados no snapshot do repo do trimestre passado. Citam uma função que foi deletada no PR de limpeza.

O traço em comum é que a camada de armazenamento não sabe quando seu conteúdo ficou velho. O codebase continua se movendo; o snapshot, não.

## A disciplina

A correção é um hábito: quando a IA nomeia um símbolo específico, trate como hipótese. Verifique antes de agir.

"Verificar" é quase sempre um `grep` de dez segundos:

- _"Use a flag `--strict`"_ → `--strict` ainda existe? Dê grep na CLI.
- _"O middleware de sessão está em `src/lib/auth/session.ts`"_ → o caminho existe? `ls` nele.
- _"Chame `validateInput()`"_ → grep pela função. Ela foi renomeada no último refactor?

Dez segundos de verificação capturam o que de outra forma vira quinze minutos de confusão. A relação custo-benefício é tão desequilibrada que deveria ser reflexo.

O mesmo hábito vale para recomendações vindas de memória. Se uma memória referencia um caminho, uma função, ou uma pessoa em um projeto, essa referência é uma alegação que precisa ser checada — não um fato.

## O que isso não significa

Não significa desconfiar do modelo. O modelo acerta muito mais do que erra. A disciplina é estreita: ela vale para _símbolos nomeados específicos_, não para orientação conceitual.

Quando a IA diz _"considere extrair isso para um helper"_ — isso é conselho, sem necessidade de grep. Quando ela diz _"extraia isso para `formatRowForCSV()` como o helper em `src/utils/csv.ts`"_ — _agora_ você dá grep. O símbolo nomeado é a parte que envelhece. O conselho não.

É também por isso que enquadramentos genéricos de "confie, mas verifique" rendem pouco. São amplos demais para virar hábito. _Grep antes de agir em um símbolo nomeado_ é hábito. Dá pra construir reflexo em cima.

## A regra

Quando a IA cita, você verifica. Quando ela lembra, você confere.

O codebase é o presente. A memória é um snapshot. Quando discordam, o codebase ganha.

Os dez segundos de grep são o seguro mais barato do fluxo.
