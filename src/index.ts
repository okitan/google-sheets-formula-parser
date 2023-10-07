import type { Boolean, Notation, Number, String, UnaryExpression, Function, Matrix, Symbol } from "./objects";
import { parse as _parse } from "./parser";

export * from "./objects";
export { parse as _parse } from "./parser";

export function parse(str: string) {
  const parsed = _parse(str);
  assertParsed(parsed);

  return parsed;
}

export function format(parsed: ParseResult): string {
  switch (parsed.type) {
    case "UnaryExpression":
      switch (parsed.operator) {
        case "*":
        case "/":
          const hasAdditiveOperatorOnLeft =
            parsed.left.type === "UnaryExpression" && ["+", "-"].includes(parsed.left.operator);
          const hasAdditiveOperatorOnRight =
            parsed.right.type === "UnaryExpression" && ["+", "-"].includes(parsed.right.operator);
          return [
            hasAdditiveOperatorOnLeft ? `(${format(parsed.left)})` : format(parsed.left),
            parsed.operator,
            hasAdditiveOperatorOnRight ? `(${format(parsed.right)})` : format(parsed.right),
          ].join(" ");
        default:
          return [format(parsed.left), parsed.operator, format(parsed.right)].join(" ");
      }
    case "Number":
      return parsed.value.toString();
    case "String":
      return `"${parsed.value}"`;
    case "Boolean":
      return parsed.value ? "TRUE" : "FALSE";
    case "Notation":
      // TODO:
      return parsed.literal;
    case "Symbol":
      return parsed.value;
    case "Function":
      return [parsed.name.toUpperCase(), "(", parsed.args.map((arg) => (arg ? format(arg) : "")).join(", "), ")"].join(
        ""
      );
    case "Matrix":
      return ["{", parsed.values.map((row) => row.map((e) => format(e)).join(", ")).join("; "), "}"].join("");
  }
}

// TODO: I'd like to generate
export type ParseResult = UnaryExpression | Number | String | Boolean | Notation | Symbol | Function | Matrix;
function assertParsed(parsed: any): asserts parsed is ParseResult {
  const types = ["UnaryExpression", "Number", "String", "Boolean", "Notation", "Symbol", "Function", "Matrix"];

  if (!types.includes(parsed.type)) throw new Error(`parse result is not one of ${types} but ${parsed.type}`);
}
