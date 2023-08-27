import { type UnaryExpression, parse, ParseResult } from "../../src";

export function buildUnAryExpressionMatcher({
  literal,
  left,
  operator,
  right,
  asString = false,
}: {
  literal: string;
  left: string | number;
  operator: string;
  right: string | number;
  asString?: boolean;
}) {
  const leftMatcher =
    typeof left === "number"
      ? { type: "Number" as const, literal: left.toString(), value: left }
      : asString
      ? parseAsString(left)
      : parse(left);
  const rightMatcher =
    typeof right === "number"
      ? { type: "Number" as const, literal: right.toString(), value: right }
      : asString
      ? parseAsString(right)
      : parse(right);

  return {
    type: "UnaryExpression",
    literal,
    left: eliminateLiteral(leftMatcher),
    operator,
    right: eliminateLiteral(rightMatcher),
  };
}

export function parseAsString(expr: string) {
  return expr.startsWith(`"`) && expr.endsWith(`"`) ? parse(expr) : parse(`"${expr}"`);
}

export function unaryExpressionWithoutLiteral(expr: string) {
  const result = parse(expr);

  if (result.type === "UnaryExpression") {
    const { type, operator, left, right } = result;

    return { type, operator, left, right };
  } else {
    return result;
  }
}

function eliminateLiteral(result: ParseResult) {
  if (result.type === "UnaryExpression") {
    const { type, operator, left, right } = result;

    return { type, operator, left, right };
  } else {
    return result;
  }
}
