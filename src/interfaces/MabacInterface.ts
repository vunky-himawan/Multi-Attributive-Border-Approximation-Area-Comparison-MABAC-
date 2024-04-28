import { Alternative } from "@classes/Alternative";
import { Criteria } from "@classes/Criteria";

export interface MabacInterface {
  initialDecisionMatrix(): Array<Array<number>>;
  normalizedDecisionMatrix(
    initialDecisionMatrix: Array<Array<number>>
  ): Array<Array<number>>;
  getWeightedMatrixElements(
    normalizedMatrix: Array<Array<number>>
  ): Array<Array<number>>;
  getBorderForecastAreaMatrix(
    weightedMatrix: Array<Array<number>>
  ): Array<Array<number>>;
  getAlternativeDistanceMatrix(
    borderForecastAreaMatrix: Array<Array<number>>,
    weightedMatrix: Array<Array<number>>
  ): Array<Array<number>>;
  getRankingMatrix(
    alternativeDistanceMatrix: Array<Array<number>>
  ): Array<Array<number>>;
  getCriterias(): Array<Criteria>;
  getAlternatives(): Array<Alternative>;
  generateTable(header: string, data: Array<Array<number>>): void;
}
