---
title: 'O bug que vivia no gap entre dois serviços'
summary: "Dois serviços calculavam 'sold' de duas formas diferentes. O admin recebia um 409 Conflict que não fazia sentido de nenhum dos lados. O bug não estava em nenhum dos serviços — estava no gap entre eles, e um contract test impede o próximo."
publishAt: 2026-05-14T09:00:00-03:00
tags: [microservices, debugging, distributed-systems, war-story]
---

Uma correção de bug levou duas semanas porque o bug não estava no código que eu mudei.

![Dois serviços calculando o mesmo número de duas formas diferentes: o caminho de exibição diz sold=7, o caminho de validação diz sold=10, Δ=3 no gap entre eles.](/blog/gap-between-services/pt.svg)

## O sintoma

Um admin abre a página de inventário de um item. A página diz **3 disponíveis**. Quer corrigir para **0** porque sabe que o item está esgotado.

Submete. O servidor retorna um genérico **409 Conflict**. Sem detalhes, sem diff, só "conflict."

Tenta **1**. Mesmo 409.

Tenta **3** — igual ao que a página já mostra. Aceita. Recarrega.

A página continua mostrando **3 disponíveis**.

Esse é o bug como o admin viu. Do lugar dele, o formulário está quebrado: rejeita valores que deveriam funcionar, e aceita um valor que visivelmente não tem efeito.

## O que estava acontecendo de verdade

Há dois caminhos nesse fluxo, e cada um calculava "sold" contra uma fonte de verdade diferente.

- **Caminho de exibição.** A página de inventário consulta o banco local diretamente. Query rápida. Contava compras finalizadas e excluía subscrições de cupom de reserva, porque era assim que o relatório foi originalmente especificado.
- **Caminho de validação.** O endpoint de save cruza com um microsserviço separado via HTTP antes de aceitar o novo valor de "available". Esse serviço tem seu próprio modelo do que "sold" significa, e _inclui_ subscrições de cupom de reserva.

Para a maioria dos itens as duas definições concordavam, então ninguém percebeu. Esse item específico tinha três subscritores de cupom de reserva. A exibição dizia `sold = 7`. O validador dizia `sold = 10`. O admin estava olhando para uma página que achava que havia três unidades de folga que, do ponto de vista do validador, não existiam.

Então `available = 0` falhou na validação (o validador achava que 10 estavam vendidos; você não pode ter menos disponíveis que vendidos). `available = 3` passou (3 ≥ 3 do ponto de vista da exibição, e o check `available - sold` do validador também se manteve porque o threshold do validador para _este_ caminho estava estruturado de forma diferente). E a página continuou mostrando 3 depois, porque a query de _exibição_ não havia mudado — o número dela não tinha estado errado pelas próprias regras dela.

Duas queries. Cada uma correta contra sua própria definição. Ambas nomeando a mesma coisa.

## Por que a correção levou duas semanas

A primeira semana foi gasta tratando como um bug na página. Depois como um bug no endpoint de validação. Depois como um bug no contrato da API. Cada uma dessas é uma leitura defensável — e cada uma está errada, porque o bug não está _em_ nenhum dos lados.

O momento em que escrevemos as duas queries lado a lado e perguntamos "qual é a função que produz esse número?" foi o momento em que ficou óbvio. Não tínhamos uma função. Tínhamos duas definições da mesma palavra.

> Quando dois serviços calculam "o mesmo número" de duas formas diferentes, você não tem um contador. Você tem uma corrida contra seu próprio relatório.

O tipo de entidade cupom-de-reserva foi adicionado meses antes. Foi plugado no cálculo do validador (porque subscrições são como o validador raciocina sobre compromissos), e não foi plugado na query de exibição (porque a query de exibição estava com escopo em "compras finalizadas" e cupons de reserva tecnicamente ainda não são isso).

Todo revisor que viu cada mudança isoladamente teria aprovado. Nenhum lado estava errado por si só.

## A correção

O instinto é escolher um lado. _A exibição é a resposta certa; atualize o validador._ Ou _o validador é autoritativo; atualize a exibição._ Escolher lados é metade da correção.

A correção real tem duas partes:

1. **Decida qual definição está certa, no domínio — não em nenhum dos serviços.** "Sold," neste domínio, inclui subscritores de cupom de reserva, porque o negócio se importa com compromissos, não só com checkouts concluídos. Escreva isso em algum lugar duradouro.
2. **Aplique essa definição em todos os lugares onde o número aparece.** Os dois serviços. A query de exibição. A query de validação. O relatório de reconciliação. O export de CSV. Todo relator que nomeia o número recebe a mesma definição.

A etapa 2 é a lenta. Você tem que de fato achar todos os relatores. Achamos quatro nesta codebase. Provavelmente havia mais.

## Quando você não pode compartilhar a função

A versão limpa da regra é: escreva a função uma vez, chame dos dois caminhos.

Isso é frequentemente impossível atravessando fronteiras de microsserviço — runtimes diferentes, orçamentos de perf diferentes, SLAs diferentes. Você não pode compartilhar a função Python com o serviço Node. Tudo bem. O fallback é:

**Escreva um contract test que roda contra as duas implementações com a mesma matriz de input e assertar igualdade.**

```ts
const cases = [
  { fixture: 'no-coupons', expectedSold: 7 },
  { fixture: 'with-reservation-3', expectedSold: 10 },
  { fixture: 'fully-cancelled-batch', expectedSold: 0 },
  // every input shape that matters in the domain
]

for (const c of cases) {
  test(`sold(${c.fixture}) — display path`, async () => {
    expect(await displaySvc.sold(c.fixture)).toBe(c.expectedSold)
  })
  test(`sold(${c.fixture}) — validation path`, async () => {
    expect(await validationSvc.sold(c.fixture)).toBe(c.expectedSold)
  })
}
```

O ponto do contract test não é pegar o bug que já corrigimos. É falhar alto da próxima vez que alguém adicionar um novo tipo de entidade que deveria contar para "sold" e só atualizar um lado. O que vai acontecer, porque a codebase não tem uma única função para atualizar — tem duas, em dois serviços, e o revisor de cada mudança não vai ver a outra.

## O formato, generalizado

Se seu domínio tem um número que importa, ele tem exatamente uma definição.

"Importa" está fazendo trabalho nessa frase. Vários números não importam nesse sentido estrito — um contador cacheado num dashboard, uma estimativa grosseira num tooltip, uma figura analítica que pode ficar atrasada. Esses podem driftar. Ninguém morre.

Os que importam são os que _governam comportamento_: validação, billing, capacidade, elegibilidade, locking. Quando dois serviços governam comportamento com base em "o mesmo número" e calculam diferente, você não tem um contador. Você tem um bug de contrato disfarçado de contador.

A pergunta diagnóstica é:

> Se o número do serviço A e o número do serviço B discordam, em qual o sistema vai agir, e o que acontece com o usuário?

Se a resposta é "depende de qual endpoint eles atingiram," você tem esse bug. Você só ainda não achou o formato de input que o dispara.

## Onde o mesmo formato se esconde

Isso surgiu com contagens de estoque. O mesmo formato aparece em vários outros lugares:

- **"Este usuário é membro deste grupo?"** Auth diz sim. Billing diz não. Discordam sobre se um período de trial conta.
- **"Quantos assentos estão disponíveis?"** A página de booking diz 4. O checkout diz 2. Discordam sobre se reservas seguradas-mas-não-pagas contam.
- **"Qual é o tier do usuário?"** Frontend diz Pro. Backend diz Free. Discordam sobre se uma falha de renovação automática já o rebaixou.
- **"Esta fatura foi paga?"** Webhook diz sim. Banco diz não. Discordam sobre o que "pago" significa numa janela de reembolso parcial.

Todos esses são o mesmo bug. Duas queries, um nome, duas definições, sem contrato.

## A regra

Se um número importa, ele tem exatamente uma definição. Se você não pode compartilhar a função entre serviços, escreva um contract test que os force a concordar em todo formato de input que importa. Qualquer coisa menos que isso, e você está agendando o bug — só não sabe qual input vai disparar, ou qual on-call vai receber a página.

O bug não está em nenhum dos serviços. Está no gap.
