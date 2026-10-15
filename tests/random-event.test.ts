import { describe, expect, it, vi } from "vitest";
import { pickWeightedRandom } from "../packages/simulation/src/random-event";

describe("Random Event System", () => {
  it("picks item based on weighted range", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);

    const result = pickWeightedRandom([
      { value: "COMMON", weight: 60 },
      { value: "RARE", weight: 40 },
    ]);

    expect(result).toBe("COMMON");
    vi.restoreAllMocks();
  });

  it("can pick later weighted item", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const result = pickWeightedRandom([
      { value: "COMMON", weight: 60 },
      { value: "RARE", weight: 40 },
    ]);

    expect(result).toBe("RARE");
    vi.restoreAllMocks();
  });
});
