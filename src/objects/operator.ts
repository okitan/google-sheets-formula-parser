import type { Expression } from "../objects";

export type UnaryExpression = {
  type: "UnaryExpression";
  literal?: string;
  operator: string;
  left: Expression;
  right: Expression;
};

export function UnaryExpression(obj: Omit<UnaryExpression, "type">): UnaryExpression {
  return {
    type: "UnaryExpression",
    ...obj,
  };
}

export function buildUnaryExpression({
  literal,
  head,
  tails,
}: {
  literal?: string;
  head: Expression;
  tails: Array<[string, string, string, Expression]>;
}): Expression {
  return tails.reduce<Expression>(
    (left, [_, operator, __, right], i) =>
      i === tails.length - 1
        ? UnaryExpression({ literal, left, operator, right })
        : UnaryExpression({ left, operator, right }),
    head
  );
}
