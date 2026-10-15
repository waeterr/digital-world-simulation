import { useState, useEffect } from "react";
import "./App.css";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const { isConnected, lastMessage } = useWebSocket("ws://localhost:3001/ws");
  
  const [tick, setTick] = useState(0);
  const [speed] = useState(1);
  const [status, setStatus] = useState("IDLE");
  const [weather, setWeather] = useState("SUNNY");
  const [population, setPopulation] = useState(3);
  const [foodPrice, setFoodPrice] = useState(120);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage) {
      setTick(lastMessage.tick);
      setStatus("RUNNING");
      setWeather(lastMessage.weather);
      setPopulation(lastMessage.population);
      setFoodPrice(lastMessage.foodPrice);
      
      if (lastMessage.events.length > 0) {
        setEvents((prev) => [...lastMessage.events, ...prev].slice(0, 20));
      }
    }
  }, [lastMessage]);

  const mockNPCs = [
    { id: "1", name: "Arin", health: 85, maxHealth: 100, hunger: 30, energy: 60, location: "Forest" },
    { id: "2", name: "Borin", health: 100, maxHealth: 100, hunger: 10, energy: 80, location: "Village" },
    { id: "3", name: "Cira", health: 45, maxHealth: 100, hunger: 70, energy: 20, location: "Mountain" },
  ];


  return (
    <div className="app">
      <header className="header">
        <h1> Digital World Simulation</h1>
        <p>Real-time simulation engine monitoring</p>
      </header>

      <main className="main">
        <div className="grid">
          <div className="card">
            <h2>World Status</h2>
            <div className="stat">
              <span className="stat-label">Current Tick</span>
              <span className="stat-value">{tick}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Speed</span>
              <span className="stat-value">{speed}x</span>
            </div>
            <div className="stat">
              <span className="stat-label">Status</span>
              <span className="badge badge-green">{status}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Connection</span>
              <span className={`badge ${isConnected ? "badge-green" : "badge-red"}`}>
                {isConnected ? "LIVE" : "OFFLINE"}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Weather</span>
              <span className="badge badge-blue">{weather}</span>
            </div>
          </div>

          <div className="card">
            <h2>Population</h2>
            <div className="stat">
              <span className="stat-label">Total NPCs</span>
              <span className="stat-value">{population}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Active Quests</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat">
              <span className="stat-label">Regions</span>
              <span className="stat-value">5</span>
            </div>
            <div className="stat">
              <span className="stat-label">Factions</span>
              <span className="stat-value">3</span>
            </div>
          </div>

          <div className="card">
            <h2>Economy</h2>
            <div className="stat">
              <span className="stat-label">Food Price</span>
              <span className="stat-value">{foodPrice} gold</span>
            </div>
            <div className="stat">
              <span className="stat-label">Supply</span>
              <span className="stat-value">45</span>
            </div>
            <div className="stat">
              <span className="stat-label">Demand</span>
              <span className="stat-value">78</span>
            </div>
            <div className="stat">
              <span className="stat-label">Trend</span>
              <span className="badge badge-yellow">Rising</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <h2>NPCs</h2>
            <div className="npc-list">
              {mockNPCs.map((npc) => (
                <div key={npc.id} className="npc-card">
                  <div className="npc-header">
                    <span className="npc-name">{npc.name}</span>
                    <span className="badge badge-purple">{npc.location}</span>
                  </div>
                  <div className="npc-stats">
                    <div>Health: {npc.health}/{npc.maxHealth}</div>
                    <div>Hunger: {npc.hunger}</div>
                    <div>Energy: {npc.energy}</div>
                  </div>
                  <div className="health-bar">
                    <div
                      className="health-fill"
                      style={{ width: `${(npc.health / npc.maxHealth) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>Event Log</h2>
            <div className="event-log">
              {events.length === 0 && (
                <div className="event-item">Waiting for events...</div>
              )}
              {events.map((event, idx) => (
                <div key={idx} className="event-item">
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
