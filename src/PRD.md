# Mini PRD — StudyDoubt

## 1. Problema
Durante os estudos, é comum surgirem dúvidas sobre conteúdos, exercícios ou conceitos. Muitas vezes essas dúvidas não são registradas e acabam sendo esquecidas, o que prejudica a revisão e o aprendizado.

## 2. Usuário
O sistema é voltado para estudantes de cursos, faculdade, concursos e áreas técnicas que precisam registrar e acompanhar dúvidas de forma prática durante sua rotina de estudos.

## 3. Solução
A solução proposta é uma aplicação chamada StudyDoubt, que permite cadastrar dúvidas, classificá-las por matéria e prioridade, registrar uma descrição complementar, marcar dúvidas como resolvidas e excluir registros que não sejam mais necessários.

## 4. Funcionalidades essenciais
- Listar dúvidas cadastradas
- Criar uma nova dúvida
- Atualizar o status de uma dúvida para resolvida
- Excluir uma dúvida
- Filtrar dúvidas por status
- Visualizar resumo com total, pendentes e resolvidas

## 5. Justificativa das funcionalidades
Cada funcionalidade foi escolhida porque é essencial para resolver o problema de organização de dúvidas:
- Sem listagem, o usuário não consegue visualizar as dúvidas registradas.
- Sem criação, o usuário não consegue salvar novas dúvidas.
- Sem atualização de status, o usuário não consegue acompanhar o que já foi resolvido.
- Sem exclusão, o sistema acumula registros desnecessários.
- Sem filtro, a consulta de dúvidas fica menos prática.
- Sem resumo, o usuário perde visão geral do progresso.

## 6. Decisões técnicas
A aplicação foi desenvolvida com React e TypeScript no front-end. A API REST foi simulada com json-server para permitir operações completas de CRUD.

### Entidade principal
Doubt
- id
- title
- subject
- priority
- description
- createdAt
- resolved

### Operações da API
- GET /doubts: buscar dúvidas
- POST /doubts: criar nova dúvida
- PATCH /doubts/:id: atualizar status
- DELETE /doubts/:id: remover dúvida

## 7. Objetivo do produto
Ajudar estudantes a registrarem, organizarem e revisarem suas dúvidas de forma simples, funcional e visualmente clara.