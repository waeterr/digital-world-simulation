import { useEffect, useState } from "react";

type SimulationMessage = {
  type: "SIMULATION_TICK";
  tick: number;
  timestamp: number;
  weather: string;
  population: number;
  foodPrice: number;
  events: string[];
};

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<SimulationMessage | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "SIMULATION_TICK") {
        setLastMessage(message);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { isConnected, lastMessage };
}
