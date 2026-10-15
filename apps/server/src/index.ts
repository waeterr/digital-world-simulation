import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import type { WebSocket } from "@fastify/websocket";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });
await fastify.register(websocket);

const clients = new Set<WebSocket>();

let tick = 0;
const simulationSpeed = 1;
const status: "IDLE" | "RUNNING" | "PAUSED" = "RUNNING";

const weatherTypes = ["SUNNY", "CLOUDY", "RAIN", "STORM", "SNOW", "FOG", "DROUGHT"] as const;
let currentWeather = "SUNNY";
const population = 3;
let foodPrice = 120;

function broadcast(message: unknown) {
  const payload = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(payload);
    }
  }
}

function simulationTick() {
  if (status !== "RUNNING") return;

  tick++;

  if (tick % 10 === 0) {
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    currentWeather = randomWeather;
  }

  if (tick % 5 === 0) {
    foodPrice = Math.max(50, foodPrice + Math.floor(Math.random() * 20 - 10));
  }

  const events: string[] = [];
  if (tick % 15 === 0) {
    events.push(`[${new Date().toLocaleTimeString()}] NPC moved to new region`);
  }
  if (tick % 20 === 0) {
    events.push(`[${new Date().toLocaleTimeString()}] Weather changed to ${currentWeather}`);
  }

  broadcast({
    type: "SIMULATION_TICK",
    tick,
    timestamp: Date.now(),
    weather: currentWeather,
    population,
    foodPrice,
    events,
  });
}

setInterval(simulationTick, 1000 / simulationSpeed);

fastify.get("/", async () => {
  return { status: "NEXUS Server Running", tick, weather: currentWeather };
});

fastify.register(async function (fastify) {
  fastify.get("/ws", { websocket: true }, (socket) => {
    clients.add(socket);
    
    socket.send(JSON.stringify({
      type: "CLIENT_CONNECTED",
      clientId: `client-${clients.size}`,
      timestamp: Date.now(),
    }));

    socket.on("close", () => {
      clients.delete(socket);
    });
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    console.log("🚀 NEXUS Server running on http://localhost:3001");
    console.log("🔌 WebSocket available at ws://localhost:3001/ws");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
