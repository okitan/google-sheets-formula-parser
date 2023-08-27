import { Number } from "./number";

export class UnaryExpression {
  type = "UnaryExpression" as const;

  readonly literal?: string;
  readonly operator: string;
  readonly left: Number | UnaryExpression;
  readonly right: Number | UnaryExpression;

  constructor({
    literal,
    left,
    operator,
    right,
  }: {
    literal?: string;
    operator: string;
    left: Number | UnaryExpression;
    right: Number | UnaryExpression;
  }) {
    this.literal = literal;

    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

export function buildUnaryExpression({
  literal,
  head,
  tails,
}: {
  literal?: string;
  head: Number;
  tails: Array<[string, string, string, Number]>;
}) {
  return tails.reduce<Number | UnaryExpression>(
    (left, [_, operator, __, right], i) =>
      i === tails.length - 1
        ? new UnaryExpression({ literal, left, operator, right })
        : new UnaryExpression({ left, operator, right }),
    head
  );
}
