import { Alternative } from "@classes/Alternative";
import { Criteria } from "@classes/Criteria";
import { CriteriaTypes } from "@enum/CriteriaTypes";
import { MabacService } from "@services/MabacService";
import { table } from "table";

describe("Make Table", () => {
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
  it("should make a new table", () => {
    const data = [
      ["Name", "Value"],
      ["Alternative 1", 100],
      ["Alternative 2", 50],
      ["Alternative 3", 75],
      ["Alternative 4", 25],
    ];

    const config = {
      header: {
        alignment: "center",
        content: "MATRIKS NORMALISASI",
      },
      columnDefault: {
        width: 20,
      },
    };

    console.log(table(data, config));
  });

  it("should make a initial decision matrix", () => {
    mabacService.generateTable(
      "Matriks Keputusan (X)",
      mabacService.initialDecisionMatrix()
    );
  });

  it("should make a normalized decision matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();

    mabacService.generateTable(
      "Matriks Normalisasi (X)",
      mabacService.normalizedDecisionMatrix(decisionMatrix)
    );
  });

  it("should make a weighted matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);

    mabacService.generateTable(
      "Matriks Tertimbang (V)",
      mabacService.getWeightedMatrixElements(normalizedDecisionMatrix),
      "Weighted Matrix"
    );
  });

  it("should make a border forecast area matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);
    const weightedMatrixElements = mabacService.getWeightedMatrixElements(
      normalizedDecisionMatrix
    );

    mabacService.generateTable(
      "Matriks Area Perkiraan Batas (G)",
      mabacService.getBorderForecastAreaMatrix(weightedMatrixElements),
      "Border Forecast Area Matrix"
    );
  });

  it("should make a alternative distance matrix", () => {
    const decisionMatrix = mabacService.initialDecisionMatrix();
    const normalizedDecisionMatrix =
      mabacService.normalizedDecisionMatrix(decisionMatrix);
    const weightedMatrixElements = mabacService.getWeightedMatrixElements(
      normalizedDecisionMatrix
    );
    const borderForecastAreaMatrix = mabacService.getBorderForecastAreaMatrix(
      weightedMatrixElements
    );

    mabacService.generateTable(
      "Matriks Jarak Alternatif dari Batas Perkiraan Daerah (Q)",
      mabacService.getAlternativeDistanceMatrix(
        borderForecastAreaMatrix,
        weightedMatrixElements
      )
    );
  });

  it("should make a ranking matrix", () => {
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

    mabacService.generateTable(
      "Matriks Perankingan",
      mabacService.getRankingMatrix(alternativeDistanceMatrix),
      "Ranking Matrix"
    );
  });
});
