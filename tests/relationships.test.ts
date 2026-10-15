import { describe, expect, it } from "vitest";
import { changeRelationshipScore } from "../packages/simulation/src/relationships";
import type { Relationship } from "../packages/types/src";

describe("Relationship System", () => {
  const baseRelationship: Relationship = {
    npcId1: "npc-1",
    npcId2: "npc-2",
    type: "FRIEND",
    score: 50,
  };

  it("increases relationship score", () => {
    const updated = changeRelationshipScore(baseRelationship, 20);
    expect(updated.score).toBe(70);
  });

  it("decreases relationship score", () => {
    const updated = changeRelationshipScore(baseRelationship, -30);
    expect(updated.score).toBe(20);
  });

  it("caps score at 100", () => {
    const updated = changeRelationshipScore(baseRelationship, 100);
    expect(updated.score).toBe(100);
  });

  it("caps score at -100", () => {
    const updated = changeRelationshipScore(baseRelationship, -200);
    expect(updated.score).toBe(-100);
  });
});
