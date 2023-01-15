import { Number } from "./number";

export class Operator {
  type = "Operator" as const;

  constructor(public readonly left: Number, public readonly operator: string, public readonly right: Number) {}
}
