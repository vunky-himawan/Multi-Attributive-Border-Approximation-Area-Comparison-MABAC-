export interface AlternativeInterface {
  getName(): string;
  getValue(): Array<number>;
  getCode(): string;
  setValue(value: number): void;
  setCode(code: string): void;
}
