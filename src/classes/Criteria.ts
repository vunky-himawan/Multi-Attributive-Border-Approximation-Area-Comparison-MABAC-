import { CriteriaInterface } from "@interfaces/CriteriaInterface";
import { CriteriaTypes } from "@enum/CriteriaTypes";

export class Criteria implements CriteriaInterface {
  private name: string;
  private weight: number;
  private type: CriteriaTypes;

  public constructor(name: string, weight: number, type: CriteriaTypes) {
    this.name = name;
    this.weight = weight / 100;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }
  getWeight(): number {
    return this.weight;
  }
  getType(): CriteriaTypes {
    return this.type;
  }

  setWeight(weight: number): void {
    this.weight = weight;
  }
}
