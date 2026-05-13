---
title: 'Um chat com IA que não quebra quando a chave de API expira'
summary: 'Três níveis de degradação suave — Claude, Ollama e um keyword matcher em TypeScript puro — mantêm o chat funcionando mesmo se a chave da API acabar ou o servidor de LLM cair.'
publishAt: 2026-05-03T09:00:00+02:00
tags: [chat, claude, ollama, typescript, nextjs]
---

A maioria dos sites de portfólio com chat de IA quebra no momento em que a chave da API expira. O meu não.

Construí furevikstrand.cloud com três níveis de degradação suave:

1. **Claude (Haiku)** — primário, em streaming.
2. **Ollama local** — secundário, também em streaming, quando self-hosted.
3. **Keyword matcher em TypeScript puro** — sempre disponível. Levenshtein + chaves ponderadas sobre uma base de conhecimento feita à mão. Sem rede, sem chaves de API.

![Diagrama de três níveis: Claude (Haiku) cai para o Ollama local, que cai para um keyword matcher em TypeScript. O header X-Reply-Source indica qual nível respondeu.](/blog/graceful-degradation/pt.png)

Cada nível define um header `X-Reply-Source` na resposta, para o cliente saber se deve ler um stream ou uma string única.

## Por que isso importa

O modo de falha comum para um chat de IA é "o site parece quebrado". Cair para um matcher determinístico significa que a conversa continua funcionando — mesmo que meu saldo da Anthropic zere ou meu servidor de LLM caia.

Bônus: o mesmo matcher alimenta os slash commands (`/about`, `/stack`, `/projects`), então o caminho offline é o mesmo código que o online — não uma cópia degradada.

Feito com Next.js 16 + React 19 + TypeScript, em deploy via Docker.
