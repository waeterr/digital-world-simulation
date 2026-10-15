export type RandomEventRarity = "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";

export type RandomEventType =
  | "BANDIT_ATTACK"
  | "MERCHANT_ARRIVES"
  | "RESOURCE_DISCOVERED"
  | "FESTIVAL"
  | "DISEASE_OUTBREAK"
  | "HEAVY_STORM"
  | "TREASURE_FOUND"
  | "NPC_MARRIAGE"
  | "FACTION_WAR"
  | "ECONOMIC_CRASH";

export type RandomEvent = {
  readonly id: string;
  type: RandomEventType;
  rarity: RandomEventRarity;
  regionId?: string;
  affectedNpcIds: string[];
  timestamp: number;
  tick: number;
};

export type WeightedEvent<T> = {
  value: T;
  weight: number;
};
