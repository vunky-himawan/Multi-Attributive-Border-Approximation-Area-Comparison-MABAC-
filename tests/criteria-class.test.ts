import { Criteria } from "@classes/Criteria";
import { CriteriaTypes } from "@enum/CriteriaTypes";

describe("Make Criteria Class", () => {
  it("should make a new criteria", () => {
    const criteria = new Criteria("Criteria 1", 100, CriteriaTypes.Benefit);
    expect(criteria.getName()).toBe("Criteria 1");
    expect(criteria.getWeight()).toBe(100);
    expect(criteria.getType()).toBe("benefit");

    const criteria2 = new Criteria("Criteria 2", 50, CriteriaTypes.Cost);
    expect(criteria2.getName()).toBe("Criteria 2");
    expect(criteria2.getWeight()).toBe(50);
    expect(criteria2.getType()).toBe("cost");
  });
});
