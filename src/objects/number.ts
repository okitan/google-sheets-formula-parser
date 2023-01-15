export class Number {
  type = "Number" as const;

  constructor(public readonly value: number) {}
}
