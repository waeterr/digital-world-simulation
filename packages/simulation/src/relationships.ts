import type { Relationship } from "@nexus/types";

export function changeRelationshipScore(
  relationship: Relationship,
  amount: number
): Relationship {
  return {
    ...relationship,
    score: Math.max(-100, Math.min(100, relationship.score + amount)),
  };
}
