import type { Quest } from "@nexus/types";

export function startQuest(quest: Quest): Quest {
  return {
    ...quest,
    state: "ACTIVE",
  };
}

export function completeQuest(quest: Quest): Quest {
  return {
    ...quest,
    state: "COMPLETED",
  };
}

export function failQuest(quest: Quest): Quest {
  return {
    ...quest,
    state: "FAILED",
  };
}