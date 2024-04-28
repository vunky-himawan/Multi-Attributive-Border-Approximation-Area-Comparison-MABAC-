import { Alternative } from "@classes/Alternative";

describe("Make Alternative Class", () => {
  it("should make a new alternative", () => {
    const alternative = new Alternative("Alternative 1", [100]);

    alternative.setRank(1);
    expect(alternative.getName()).toBe("Alternative 1");
    expect(alternative.getValue()).toEqual([100]);
    expect(alternative.getRank()).toBe(1);
    alternative.setValue(200);
    expect(alternative.getValue()).toEqual([100, 200]);
  });
});
