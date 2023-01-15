import { Number } from "./number";

export class UnaryExpression {
  type = "UnaryExpression" as const;

  readonly literal: string;
  readonly left: Number;
  readonly operator: string;
  readonly right: Number;

  constructor({ literal, left, operator, right }: { literal: string; left: Number; operator: string; right: Number }) {
    this.literal = literal;

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
