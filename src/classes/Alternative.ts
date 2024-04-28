import { AlternativeInterface } from "@interfaces/AlternativeInterface";
export class Alternative implements AlternativeInterface {
  private name: string;
  private value: Array<number>;
  private code: string;

  constructor(name: string, value: Array<number>, code: string) {
    this.name = name;
    this.value = value;
    this.code = code;
  }

  getName(): string {
    return this.name;
  }

  getValue(): Array<number> {
    return this.value;
  }

  getCode(): string {
    return this.code;
  }

  setValue(value: number): void {
    this.value.push(value);
  }

  setCode(code: string): void {
    this.code = code;
  }
}
