import type { WeightedEvent } from "@nexus/types";

export function pickWeightedRandom<T>(items: WeightedEvent<T>[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (items.length === 0 || totalWeight <= 0) {
    throw new RangeError("items must contain a positive total weight");
  }

  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item.value;
    }
  }

  return items[items.length - 1].value;
}
