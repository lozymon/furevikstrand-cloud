---
title: 'Construí meu próprio dashboard para ver o que os visitantes perguntam ao chat'
summary: '/admin é uma página Next.js server-rendered, com basic-auth, que lê eventos de chat do MySQL — 13 painéis cobrindo tráfego e chat, incluindo uma fila de misses que transforma falhas detectadas em respostas em uns 30 segundos.'
publishAt: 2026-05-05T09:00:00+02:00
tags: [admin, analytics, selfhosted, privacy, mysql, nextjs]
---

Eu queria saber o que os visitantes realmente perguntam ao chat do meu portfólio — sem mandar as mensagens deles para o Google ou para o Plausible.

Então construí meu próprio dashboard.

`/admin` no furevikstrand.cloud é uma página Next.js server-rendered, protegida por basic-auth, que retorna 404 quando as env vars não estão setadas, então não é descobrível. Ela lê de uma tabela MySQL onde eu logo cada evento de chat e cada visita (best-effort — se o banco estiver fora, a requisição ainda passa).

13 painéis, duas seções.

**Tráfego:** conversão (visitas → sessões de chat), top referrers, países (resolvidos localmente via `geoip-lite`, sem API externa), páginas, divisão por dispositivo, fontes de UTM.

**Chat:** taxa de fallback nos últimos 30 dias, divisão por fonte de resposta (Claude / Ollama / fallback), divisão por idioma, top tópicos, distribuição da profundidade das sessões, sessões por dia, e o mais útil — **misses recentes do fallback**: cada pergunta que meu keyword matcher não conseguiu responder.

Esse painel de misses é a fila de trabalho. Cada linha tem um botão «copy ts» que gera um stub pronto para colar de `KnowledgeEntry` — chaves derivadas da mensagem, comentário com idioma + timestamp, TODOs de respostas em en/no/pt. Fecha o ciclo de «vi um buraco» a «entreguei uma resposta» em uns 30 segundos.

Qual é a menor parte da sua stack que você trouxe in-house em vez de pagar um SaaS?
