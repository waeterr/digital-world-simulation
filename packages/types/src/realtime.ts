export type RealtimeMessage =
  | {
      type: "SIMULATION_TICK";
      tick: number;
      timestamp: number;
      weather: "SUNNY" | "CLOUDY" | "RAIN" | "STORM" | "SNOW" | "FOG" | "DROUGHT";
      population: number;
      foodPrice: number;
      events: string[];
    }
  | {
      type: "CLIENT_CONNECTED";
      clientId: string;
      timestamp: number;
    };
