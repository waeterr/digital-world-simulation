export type FactionRelation = "ALLY" | "NEUTRAL" | "RIVAL" | "ENEMY";

export type Faction = {
  readonly id: string;
  name: string;
  wealth: number;
  reputation: number;
  memberIds: string[];
  territoryRegionIds: string[];
};

export type RelationshipType = "FRIEND" | "FAMILY" | "ENEMY" | "LOVER" | "RIVAL" | "ACQUAINTANCE";

export type Relationship = {
  npcId1: string;
  npcId2: string;
  type: RelationshipType;
  score: number;
};
