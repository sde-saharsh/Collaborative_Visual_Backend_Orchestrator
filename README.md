🧠 Nexus-Flow
Collaborative Visual Backend Orchestrator (DAG-Based Workflow Engine)

Turn visual workflows into executable, durable, real-time backend logic

🚀 Features

🎨 Visual drag-and-drop workflow builder (React Flow)

🔄 DAG-based execution engine (Graphology)

⚡ Parallel node execution (BullMQ + Redis)

🧠 Durable workflows (resume on crash)

👥 Real-time collaboration (Yjs + WebSockets)

🔍 Live visual observability (node glow + logs)

🔐 Docker sandbox for custom code nodes

🔁 Retry, backoff, idempotent jobs

🏗️ System Architecture
User (Browser)
   │
   ▼
React Flow Canvas ── WebSocket ── Realtime Server (Yjs + Redis Pub/Sub)
   │
   └── REST API ──► Node.js API Gateway
                        │
                        ├─ PostgreSQL (workflows, logs)
                        ├─ Redis (state, queues)
                        └─ DAG Compiler (Graphology)
                                │
                                ▼
                           BullMQ Queue
                                │
                                ▼
                             Workers
                                │
        ┌───────────────┬───────────────┬───────────────┐
        ▼               ▼               ▼
     HTTP Node      DB Node       Docker Sandbox
        │               │               │
        └───────────────┴───────────────┘
                                │
                                ▼
                         Redis (live state)
                                │
                                ▼
                        WebSocket → UI Glow

🔄 Execution Flow

User designs workflow in React Flow

Graph JSON saved to PostgreSQL

User clicks Run

Backend:

Fetch graph

Compile → DAG

Validate (no cycles)

Create execution record

Push root nodes → BullMQ

Workers:

Execute node

Store output → Redis

Store logs → PostgreSQL

Emit status → WebSocket

UI updates in real-time:

🟡 Running

🟢 Success

🔴 Failed

On crash:

Resume from Redis snapshot (durable execution)

⚡ Parallel DAG Example
      A
    /   \
   B     C
    \   /
      D


Execution order:

A → (B & C in parallel) → D

🧱 Tech Stack
Layer	Tech
Frontend	React + React Flow + Yjs
Backend	Node.js (TypeScript) + Fastify
Realtime	Socket.io + Protobuf
Graph Engine	Graphology
Queue	BullMQ + Redis
Database	PostgreSQL
Durability	Redis snapshots
Sandbox	Docker
📂 Monorepo Structure
.
├─ apps/
│  ├─ client/        # React Flow UI
│  ├─ server/        # API Gateway
│  └─ worker/        # BullMQ processors
│
├─ packages/
│  ├─ engine/        # DAG compiler
│  ├─ nodes/         # Node definitions
│  └─ shared/        # types & utils
│
├─ docker/
│  └─ sandbox-runner
│
├─ docker-compose.yml
└─ README.md

🧪 Data Models
workflows
id | name | version | graph_json | created_at

executions
id | workflow_id | status | started_at | ended_at

node_logs
execution_id | node_id | status | input | output | error | duration

🔌 Node Types
Core

HTTP Request

Condition (if/else)

Transform (JS)

Delay/Timer

Database Query

Advanced

Webhook trigger

Queue trigger

AI node (planned)

Custom Docker script

🛠️ Local Development
1️⃣ Start Infra
docker-compose up -d

2️⃣ Install Dependencies
npm install

3️⃣ Run Services
# API
npm run dev:server

# Worker
npm run dev:worker

# Client
npm run dev:client

🔐 Security

JWT authentication

Role-based access control

Docker sandbox isolation

Rate limiting

Secrets via env vault

🧪 MVP Build Checklist

 React Flow canvas

 Save graph JSON

 Graph → DAG compiler

 BullMQ queue

 Worker execution

 WebSocket node status

 Durable resume

 Collaboration (Yjs)

 Docker sandbox

📈 Roadmap
V1

Visual builder

DAG execution

Live logs

V2

Versioning

Rollback

Execution replay

Multi-env

V3

AI: text → flow

Node marketplace

Open-source core engine

🎯 One-Line Flow

Visual Graph → DAG → Queue → Workers → Redis State → PostgreSQL Logs → WebSocket → Live UI

🤝 Contributing

PRs are welcome.
Please open an issue first for major changes.

📜 License

MIT
