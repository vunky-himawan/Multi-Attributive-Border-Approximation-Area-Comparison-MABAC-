import { Alternative } from "@classes/Alternative";
import { Criteria } from "@classes/Criteria";
import { MabacInterface } from "@interfaces/MabacInterface";
import { Rank } from "@interfaces/Rank";
import { table } from "table";

export class MabacService implements MabacInterface {
  private alternatives: Array<Alternative>;
  private criterias: Array<Criteria>;

  constructor(alternatives: Array<Alternative>, criterias: Array<Criteria>) {
    this.alternatives = alternatives;
    this.criterias = criterias;
  }

  initialDecisionMatrix(): Array<Array<number>> {
    const matrix: Array<Array<number>> = [];
    for (let i = 0; i < this.alternatives.length; i++) {
      const value = this.alternatives[i].getValue();
      matrix[i] = value;
    }

    return matrix;
  }

  normalizedDecisionMatrix(
    initialDecisionMatrix: Array<Array<number>>
  ): Array<Array<number>> {
    const matrix: Array<Array<number>> = initialDecisionMatrix;
    const normalizedMatrix: Array<Array<number>> = [];
    const transposeMatrix: Array<Array<number>> = [];

    for (let i = 0; i < matrix[0].length; i++) {
      transposeMatrix.push(this.getValuePerColumn(i));
    }

    for (let i = 0; i < matrix.length; i++) {
      const row: Array<number> = [];
      for (let j = 0; j < matrix[i].length; j++) {
        const min: number = this.getMinValuePerColumn(transposeMatrix[j]);
        const max: number = this.getMaxValuePerColumn(transposeMatrix[j]);
        const value =
          this.criterias[j].getType() === "benefit"
            ? (matrix[i][j] - min) / (max - min)
            : (matrix[i][j] - max) / (min - max);
        row.push(this.roundValue(value));
      }

      normalizedMatrix.push(row);
    }

    return normalizedMatrix;
  }

  getWeightedMatrixElements(
    normalizedMatrix: Array<Array<number>>
  ): Array<Array<number>> {
    const matrix: Array<Array<number>> = normalizedMatrix;
    const V: Array<Array<number>> = [];

    for (let i = 0; i < matrix.length; i++) {
      const row: Array<number> = [];
      for (let j = 0; j < matrix[i].length; j++) {
        const value =
          this.criterias[j].getWeight() * matrix[i][j] +
          this.criterias[j].getWeight();

        row.push(this.roundValue(value));
      }

      V.push(row);
    }

    return V;
  }

  getBorderForecastAreaMatrix(
    weightedMatrix: Array<Array<number>>
  ): Array<Array<number>> {
    const g: Array<Array<number>> = [];
    const v = weightedMatrix;
    const transposeMatrix: Array<Array<number>> = this.transposeMatrix(v);
    const power = 1 / this.alternatives.length;

    for (let i = 0; i < transposeMatrix.length; i++) {
      const row = [];
      row.push(
        this.roundValue(
          Math.pow(
            transposeMatrix[i].reduce((total, number) => total * number),
            power
          )
        )
      );
      g.push(row);
    }

    return g;
  }

  getAlternativeDistanceMatrix(
    borderForecastAreaMatrix: Array<Array<number>>,
    weightedMatrix: Array<Array<number>>
  ): Array<Array<number>> {
    const Q: Array<Array<number>> = [];
    const G: Array<Array<number>> = borderForecastAreaMatrix;
    const V: Array<Array<number>> = weightedMatrix;

    for (let i = 0; i < V.length; i++) {
      const row = [];
      for (let j = 0; j < V[i].length; j++) {
        row.push(this.roundValue(V[i][j] - G[j][0]));
      }
      Q.push(row);
    }

    return Q;
  }

  getRankingMatrix(
    alternativeDistanceMatrix: Array<Array<number>>
  ): Array<Array<number>> {
    const Q: Array<Array<number>> = alternativeDistanceMatrix;
    const finalResult: Array<Array<number>> = [];
    let scores: Array<number> = [];

    for (let i = 0; i < Q.length; i++) {
      scores.push(
        this.roundValue(Q[i].reduce((total, number) => total + number))
      );
    }

    for (let i = 0; i < scores.length; i++) {
      finalResult.push([scores[i], this.getRank(scores[i], scores)]);
    }

    return finalResult;
  }

  getAlternatives(): Array<Alternative> {
    return this.alternatives;
  }

  getCriterias(): Array<Criteria> {
    return this.criterias;
  }

  getValuePerColumn(column: number): Array<number> {
    return this.alternatives.map(
      (alternative) => alternative.getValue()[column]
    );
  }

  transposeMatrix(matrix: Array<Array<number>>): Array<Array<number>> {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++) {
      const row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i]);
      }
      result.push(row);
    }

    return result;
  }

  generateTable(
    header: string,
    data: Array<Array<number>>,
    step?: string
  ): void {
    const matrix: Array<Array<number | string>> =
      step !== "Ranking Matrix" ? [[""]] : [];

    if (step !== "Ranking Matrix") {
      for (let i = 0; i < this.criterias.length; i++) {
        matrix[0].push(`C${i + 1}`);
      }

      switch (step) {
        case "Weighted Matrix":
          matrix.push(["BOBOT"]);
          for (let i = 0; i < this.criterias.length; i++) {
            matrix[1].push(this.criterias[i].getWeight());
          }

          for (let i = 0; i < this.alternatives.length; i++) {
            matrix.push([this.alternatives[i].getName(), ...data[i]]);
          }

          break;

        case "Border Forecast Area Matrix":
          matrix.push(["G"]);
          for (let i = 0; i < data.length; i++) {
            matrix[1].push(...data[i]);
          }
          break;

        default:
          for (let i = 0; i < this.alternatives.length; i++) {
            matrix.push([this.alternatives[i].getName(), ...data[i]]);
          }
          break;
      }
    } else {
      matrix.push(["Kode", "Alternatif", "Skor", "Ranking"]);

      for (let i = 0; i < data.length; i++) {
        matrix.push([
          this.alternatives[i].getCode(),
          this.alternatives[i].getName(),
          ...data[i],
        ]);
      }
    }

    const config = {
      header: {
        alignment: "center",
        content: header,
      },
    };

    console.log(table(matrix, config));
  }

  getMaxValuePerColumn(row: Array<number>): number {
    return Math.max(...row);
  }

  getMinValuePerColumn(row: Array<number>): number {
    return Math.min(...row);
  }

  roundValue(value: number): number {
    return value % 1 === 0 ? value : parseFloat(value.toFixed(3));
  }

  getRank(data: number, dataArray: number[]): number {
    const sortedArray = dataArray.slice().sort((a, b) => b - a);
    const rank = sortedArray.findIndex((num) => num === data) + 1;
    return rank;
  }
}
