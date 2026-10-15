  import type { NPC, NPCAction, PersonalityTrait } from "@nexus/types";

export function decideAction(npc: NPC): NPCAction {
  if (npc.hunger > 70) {
    return { type: "EAT" };
  }

  if (npc.health < npc.maxHealth * 0.3) {
    return { type: "SEEK_HEALER" };
  }

  if (npc.energy < npc.maxEnergy * 0.2) {
    return { type: "REST" };
  }

  if (npc.money < 10) {
    return { type: "WORK" };
  }

  return { type: "EXPLORE" };
}

export function getPersonalityScore(npc: NPC, trait: PersonalityTrait): number {
  return npc.personality.includes(trait) ? 1 : 0;
}
