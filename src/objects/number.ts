export class Number {
  type = "Number" as const;

  readonly literal: string;
  readonly value: number;

  constructor(literal: string) {
    this.literal = literal;

    this.value = parseFloat(literal);
  }
}
