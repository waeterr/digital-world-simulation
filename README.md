# NEXUS // Digital World Simulation

A real-time digital world simulation built to learn TypeScript through a practical, event-driven application.

NEXUS creates a world where NPCs act on their needs, weather changes, prices respond to supply and demand, quests progress, and events are broadcast live to a web dashboard.

## Screenshot

_Add a dashboard screenshot here._

```md
![NEXUS dashboard](./docs/images/dashboard.png)
```

## Features

- World, region, NPC, and item domain models
- NPC decisions based on hunger, health, energy, and money
- Personality traits and NPC relationships
- Dynamic economy with supply, demand, price modifiers, and price floors
- Delivery and collection quests
- Factions and relationship scores between NPCs
- Weighted random event selection
- Strongly typed event bus
- Real-time simulation ticks through WebSocket
- React dashboard showing world status, NPCs, economy, and live events

## Tech Stack

| Area         | Technology                         |
| ------------ | ---------------------------------- |
| Language     | TypeScript                         |
| Runtime      | Node.js                            |
| Backend      | Fastify                            |
| Realtime     | WebSocket via `@fastify/websocket` |
| Frontend     | React + Vite                       |
| Testing      | Vitest                             |
| Linting      | ESLint                             |
| Formatting   | Prettier                           |
| Architecture | npm workspaces monorepo            |

## Project Structure

```text
.
├── apps/
│   ├── server/             # Fastify + WebSocket server
│   └── web/                # React dashboard
├── packages/
│   ├── core/               # World, region, NPC, item factories
│   ├── events/             # Strongly typed EventBus
│   ├── simulation/         # Simulation rules and calculations
│   ├── types/              # Shared domain and realtime types
│   └── shared/             # Shared utilities
├── tests/                  # Vitest unit tests
└── docs/                   # Product requirements and learning notes
```

## TypeScript Concepts Practiced

- Primitive types, arrays, tuples, objects, functions
- `type` aliases, optional properties, `readonly` fields
- Literal unions for finite states such as weather and quest status
- Discriminated unions for events, quests, NPC actions, and WebSocket messages
- Type narrowing with event and action discriminants
- Generics and constraints in the strongly typed `EventBus`
- Utility types such as `Extract` to map event names to event payloads
- Immutable state updates with object spread
- Strict compiler configuration without `any`

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run the Real-Time Simulation

Start the server in one terminal:

```bash
npm run dev:server
```

Start the dashboard in another terminal:

```bash
npm run dev:web
```

Open the URL displayed by Vite, usually `http://localhost:5173`.

The dashboard connects to `ws://localhost:3001/ws` and receives simulation ticks every second.

## Available Commands

```bash
npm run typecheck            # Check TypeScript types
npm run lint                 # Run ESLint
npm test                     # Run unit tests
npm run dev:server           # Start Fastify WebSocket server
npm run dev:web              # Start React dashboard
npm run build -w @nexus/web  # Production-build the dashboard
npm run build -w @nexus/server # Validate server build
```
