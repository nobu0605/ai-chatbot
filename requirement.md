📄 AI Chatbot Monorepo Project — Codex Implementation Document (Full Spec)

※本ドキュメントは Codex に実装を行わせるための技術仕様書です。

1. Project Overview

We are building a full-stack AI chatbot using a monorepo structure.
The project progresses in phases:

MVP (OpenAI API only)

RAG integration (Graphiti + Neo4j)

LangGraph orchestration integration

Deployment targets:

Frontend (React + Vite) → Vercel

Backend (Express.js + OpenAI API + Docker) → Render.com

Primary DB: PostgreSQL + prisma + Docker → Render.com

RAG DB: Neo4j Aura Free

The monorepo allows shared types, consistent project-wide conventions, and simplified Codex execution.

2. Monorepo Structure

The project root contains three workspaces:

ai-chatbot/
/apps
/frontend # React + Vite
/backend # Express + OpenAI, later LangGraph + Graphiti
/packages
/shared # Shared types, utils
/scripts # Ingestion scripts, DB migrations
package.json # Workspaces root
tsconfig.json # Base configs

3. Root Configuration
   /package.json

Use pnpm to manage dependencies.

{
"name": "ai-chatbot",
"private": true,
"workspaces": [
"apps/frontend",
"apps/backend",
"packages/shared"
]
}

/tsconfig.json

Base TypeScript config:

{
"compilerOptions": {
"target": "ES2020",
"module": "ESNext",
"moduleResolution": "Node",
"baseUrl": ".",
"paths": {
"@shared/_": ["packages/shared/src/_"]
}
}
}

4. Development Roadmap (Phased Approach)
   🟦 Phase 1 — MVP
   Backend MVP (Express + OpenAI API)

Implement Express server in /apps/backend

Endpoint: POST /api/chat

Input: { message: string }

Output: { answer: string }

Uses OpenAI Chat Completion API

No RAG, no LangGraph yet

Frontend MVP (React + Vite)

Chat UI with:

Message input

Message history

Loading state

Calls backend API (VITE_API_BASE_URL)

Deployment to Vercel

Deployment

Backend → Render Web Service

Frontend → Vercel Static Site

🟩 Phase 2 — RAG Integration (Graphiti + Neo4j)
Add Neo4j Database

Use Neo4j Aura Free

Connect via Neo4j driver

Add Graphiti library

Create RAG modules in backend
apps/backend/src/rag/
graphitiClient.ts
ragService.ts

Required Functions

ingestDocuments() — used by ingestion script

retrieveRelevantChunks(query, topK) — used by chat endpoint

Ingestion Script

Add script under /scripts:

scripts/ingest.ts

Behavior:

Reads files from /data/docs

Splits into chunks

Embeddings using OpenAI embeddings API

Inserts documents + chunks into Neo4j via Graphiti

API Behavior Modification

POST /api/chat becomes:

User message
→ retrieveRelevantChunks()
→ build context prompt
→ call OpenAI
→ return answer + sources

API schema remains unchanged (backward compatible).

🟧 Phase 3 — LangGraph Integration

Add LangGraph workflow under:

apps/backend/src/workflow/
graph.ts
nodes/
routerNode.ts
retrieverNode.ts
llmNode.ts

Required Features

Route between:

generic LLM response

RAG-enhanced response

Conversation memory (LangGraph state)

Tool calling structure

API remains the same:
POST /api/chat

Backend simply delegates:

const answer = await workflow.run({ message });

5. Backend Specification
   Directory Structure
   apps/backend/
   src/
   index.ts
   routes/
   chat.ts
   services/
   openaiService.ts
   ragService.ts
   workflowService.ts
   rag/
   graphitiClient.ts
   db/
   pgClient.ts
   config/
   env.ts
   types/
   chat.ts
   package.json
   tsconfig.json

Backend Requirements

Environment variables:

OPENAI_API_KEY

DATABASE_URL (Postgres)

NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD (Phase 2)

CORS enabled

JSON body parser

Error handling middleware

Logging for debugging

6. Frontend Specification
   Directory Structure
   apps/frontend/
   src/
   main.tsx
   App.tsx
   components/
   ChatWindow.tsx
   MessageBubble.tsx
   MessageInput.tsx
   hooks/
   useChat.ts
   package.json
   vite.config.ts
   index.html

Frontend Requirements

Chat UI with:

History

Input

Loading state

Uses import.meta.env.VITE_API_BASE_URL

Calls /api/chat

Deployment:

Vercel → root set to apps/frontend

7. Shared Package
   packages/shared/
   src/
   types/
   chat.ts
   utils/
   text.ts
   package.json

Shared types must include:
export interface ChatRequest {
message: string;
}

export interface ChatResponse {
answer: string;
sources?: Array<{ id: string; title: string }>;
}

These are imported into both frontend and backend.

8. Database Specification
   PostgreSQL (Render)

Used for:

Chat logs

User sessions (future)

RAG ingestion logs

Prompt settings

Neo4j (Phase 2+)

Nodes:

(:Document {id, title, source})
(:Chunk {id, content, embedding})
(Document)-[:HAS_CHUNK]->(Chunk)

9. Deployment Specification
   Backend — Render

Build: pnpm install && pnpm run build

Start: node dist/index.js

Root: /apps/backend

Frontend — Vercel

Build: pnpm run build

Output: /dist

Root: /apps/frontend

10. Codex Implementation Tasks (Step-by-Step)
    🔵 Phase 1 Tasks (MVP)

Create monorepo structure (apps/, packages/, scripts/)

Scaffold backend Express project

Implement MVP chat endpoint (/api/chat)

Scaffold React + Vite frontend

Implement basic chat UI

Connect frontend to backend

Deploy backend to Render

Deploy frontend to Vercel

🟢 Phase 2 Tasks (RAG)

Add Neo4j + Graphiti dependencies

Implement Graphiti client & ragService

Create ingestion script

Modify /api/chat to include RAG context

Add “sources” return value

🟠 Phase 3 Tasks (LangGraph)

Add LangGraph

Define nodes & workflow

Replace backend chat logic with workflow runner

Improve logging & debugging

✔ Final Summary for Codex

Use monorepo workspaces with apps/frontend, apps/backend, packages/shared.

Implement Step1 → Step2 → Step3 in order.

Maintain /api/chat API compatibility throughout.

Keep the frontend unchanged while backend evolves.
