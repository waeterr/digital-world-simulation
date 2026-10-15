export type QuestState = "AVAILABLE" | "ACTIVE" | "COMPLETED" | "FAILED" | "EXPIRED";

export type QuestReward = {
  itemIds: string[];
  money: number;
};

export type DeliveryQuest = {
  type: "DELIVERY";
  id: string;
  title: string;
  state: QuestState;
  fromRegionId: string;
  toRegionId: string;
  itemId: string;
  reward: QuestReward;
};

export type CollectQuest = {
  type: "COLLECT";
  id: string;
  title: string;
  state: QuestState;
  itemId: string;
  requiredAmount: number;
  reward: QuestReward;
};

export type Quest = DeliveryQuest | CollectQuest;