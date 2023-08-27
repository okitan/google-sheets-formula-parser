export class String {
  type = "String" as const;

  readonly literal: string;
  readonly value: string;

  constructor({ literal, value }: { literal: string; value: string }) {
    this.literal = literal;
    this.value = value;
  }
}
