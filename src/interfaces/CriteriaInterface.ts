import { CriteriaTypes } from "@enum/CriteriaTypes";

export interface CriteriaInterface {
  getName(): string;
  getWeight(): number;
  getType(): CriteriaTypes;
  setWeight(weight: number): void;
}
