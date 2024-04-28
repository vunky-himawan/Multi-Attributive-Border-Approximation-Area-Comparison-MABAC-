import { Alternative } from "@classes/Alternative";
import { Criteria } from "@classes/Criteria";
import { CriteriaTypes } from "@enum/CriteriaTypes";
import { MabacService } from "@services/MabacService";

describe("Mabac Test", () => {
  const criterias: Array<Criteria> = [
    new Criteria("Pendidikan Masyarakat", 25, CriteriaTypes.Benefit),
    new Criteria("Kesehatan Masyarakat", 30, CriteriaTypes.Benefit),
    new Criteria("Ekonomi Masyarakat", 25, CriteriaTypes.Benefit),
    new Criteria("Pemberdayaan Masyarakat", 20, CriteriaTypes.Benefit),
  ];

  const alternatives: Array<Alternative> = [
    new Alternative("Nangkaan", [90, 81, 89, 77], "D1"),
    new Alternative("Sukowiryo", [70, 80, 80, 85], "D2"),
    new Alternative("Kembang", [85, 69, 78, 80], "D3"),
    new Alternative("Tamansari", [95, 80, 83, 80], "D4"),
    new Alternative("Kademangan", [82, 75, 85, 82], "D5"),
    new Alternative("Pejaten", [76, 85, 80, 87], "D6"),
    new Alternative("Badean", [72, 80, 75, 78], "D7"),
    new Alternative("Blidungan", [68, 72, 79, 86], "D8"),
  ];

  const mabacService = new MabacService(alternatives, criterias);

  it("should be make a new mabac service", () => {
    expect(mabacService).toBeTruthy();
    expect(mabacService.getAlternatives()).toEqual(alternatives);
    expect(mabacService.getCriterias()).toEqual(criterias);
  });

  it("should be initial decision matrix", () => {
    console.table(mabacService.initialDecisionMatrix());
  });

  it("should be normalized decision matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();

    console.table(mabacService.normalizedDecisionMatrix(decisionMatrix));
  });

  it("should be get weighted matrix elements", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);

    console.table(
      mabacService.getWeightedMatrixElements(normalizedDecisionMatrix)
    );
  });

  it("should be get border forecast area matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);
    const weightedMatrixElements = mabacService.getWeightedMatrixElements(
      normalizedDecisionMatrix
    );

    console.table(
      mabacService.getBorderForecastAreaMatrix(weightedMatrixElements)
    );
  });

  it("should be get alternative distance matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);
    const weightedMatrixElements = mabacService.getWeightedMatrixElements(
      normalizedDecisionMatrix
    );
    const borderForecastAreaMatrix = mabacService.getBorderForecastAreaMatrix(
      weightedMatrixElements
    );

    console.table(
      mabacService.getAlternativeDistanceMatrix(
        borderForecastAreaMatrix,
        weightedMatrixElements
      )
    );
  });

  it("should be get ranking matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);
    const weightedMatrixElements = mabacService.getWeightedMatrixElements(
      normalizedDecisionMatrix
    );
    const borderForecastAreaMatrix = mabacService.getBorderForecastAreaMatrix(
      weightedMatrixElements
    );
    const alternativeDistanceMatrix = mabacService.getAlternativeDistanceMatrix(
      borderForecastAreaMatrix,
      weightedMatrixElements
    );

    console.table(mabacService.getRankingMatrix(alternativeDistanceMatrix));
  });
});
