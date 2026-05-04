---
title: 'Olá, blog'
summary: 'Por que este site finalmente tem um blog e como ele se conecta ao assistente de chat da página inicial.'
publishAt: 2026-05-01T09:00:00+02:00
tags: [meta, chat, claude]
---

Tem um blog aqui agora. O interessante não é o blog em si — arquivos
markdown numa pasta, renderizar, pronto — mas como ele conversa com o
assistente de chat da página inicial.

## Como ele conversa com o chat

O título, o resumo e as tags de cada post vão direto para o system
prompt do Claude. Pergunte ao assistente sobre um post pelo nome, ou
pelas tags ("tem algo sobre TypeScript?"), e ele sabe mencionar o post
e linkar.

Os posts também aparecem pelo nível de fallback por palavras-chave — o
fuzzy matcher em TypeScript puro que roda quando o Claude e o Ollama
estão desativados. Assim o chat funciona igual em testes e offline.

## Rascunhos e agendamento

Rascunhos e posts com `publishAt` no futuro são controlados por um único
helper. Escondidos em produção, visíveis em dev. Uma fonte da verdade —
a página índice, a página do post, o system prompt e o fallback por
palavras-chave concordam.

Quer um olhar mais profundo na arquitetura? O assistente da página
inicial te leva pelo caminho. É exatamente o tipo de pergunta para a
qual ele foi feito.
