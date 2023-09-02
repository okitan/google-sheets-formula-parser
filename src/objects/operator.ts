import type { ParseResult } from "../";

export type UnaryExpression = {
  type: "UnaryExpression";
  literal: string;
  operator: string;
  left: ParseResult;
  right: ParseResult;
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
  literal: string;
  head: ParseResult;
  tails: Array<[string[] | null, string, string[] | null, ParseResult]>;
}): ParseResult {
  return tails.reduce<ParseResult>((left, tail, i) => {
    const [leftSpace, operator, rightSpace, right] = tail;
    return i === tails.length - 1
      ? UnaryExpression({ literal, left, operator, right })
      : UnaryExpression({
          literal: [left.literal, leftSpace, operator, rightSpace, right.literal].join(""),
          left,
          operator,
          right,
        });
  }, head);
}
