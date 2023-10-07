import type { Boolean, Notation, Number, String, UnaryExpression, Function, Matrix, Symbol } from "./objects";
import { parse as _parse } from "./parser";

export * from "./objects";
export { parse as _parse } from "./parser";

export function parse(str: string) {
  const parsed = _parse(str);
  assertParsed(parsed);

  return parsed;
}

// TODO: I'd like to generate
export type ParseResult = UnaryExpression | Number | String | Boolean | Notation | Symbol | Function | Matrix;
function assertParsed(parsed: any): asserts parsed is ParseResult {
  const types = ["UnaryExpression", "Number", "String", "Boolean", "Notation", "Symbol", "Function", "Matrix"];

  if (!types.includes(parsed.type)) throw new Error(`parse result is not one of ${types} but ${parsed.type}`);
}

export function format(
  parsed: ParseResult,
  options?: {
    width?: number;
    insideMatrix?: boolean;
  }
): string {
  const { width, insideMatrix } = { width: 80, ...options };

  const remained = width - 2;
  const optionsForChildren = { ...options, width: remained };

  switch (parsed.type) {
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
    case "UnaryExpression":
      // no wrap here
      switch (parsed.operator) {
        case "=":
          const hasCalculativeOperatorOnLeft =
            parsed.left.type === "UnaryExpression" && ["+", "-", "*", "/"].includes(parsed.left.operator);
          const hasCalcurativeOperatorOnRight =
            parsed.right.type === "UnaryExpression" && ["+", "-", "*", "/"].includes(parsed.right.operator);
          return [
            hasCalculativeOperatorOnLeft ? `(${format(parsed.left)})` : format(parsed.left),
            parsed.operator,
            hasCalcurativeOperatorOnRight ? `(${format(parsed.right)})` : format(parsed.right),
          ].join(" ");

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
          return [
            format(parsed.left, optionsForChildren),
            parsed.operator,
            format(parsed.right, optionsForChildren),
          ].join(" ");
      }
    case "Function":
      const formattedArgs = parsed.args.map((arg) => (arg ? format(arg, optionsForChildren) : ""));

      const result = parsed.name.toUpperCase() + "(" + formattedArgs.join(", ") + ")";
      if (result.length <= width) return result;

      const lines: string[] = [formattedArgs[0]];
      formattedArgs.slice(1).forEach((arg) => {
        if (lines[lines.length - 1].length + arg.length < remained) {
          lines[lines.length - 1] = lines[lines.length - 1] + ", " + arg;
        } else {
          lines[lines.length - 1] = lines[lines.length - 1] + ",";
          lines.push(arg);
        }
      });

      return [parsed.name.toUpperCase() + "(", indent(lines), ")"].join("\n");
    case "Matrix":
      const rows = parsed.values.map((row) => row.map((e) => format(e, { ...optionsForChildren, insideMatrix: true })));

      if (insideMatrix) {
        if (rows.length === 0) return "";
        if (rows.length === 1) return rows[0].join(", ");
      }

      const totalLength = rows.reduce((acc, row) => acc + row.join(", ").length, 0);

      if (totalLength <= width) return "{" + rows.map((row) => row.join(", ")).join("; ") + "}";

      return "{\n  " + rows.map((row) => row.join(", ")).join("\n; ") + "\n}";
  }
}

function indent(lines: string[]): string {
  return lines
    .flatMap((line) => line.split("\n"))
    .filter((e) => e.trim().length)
    .map((line) => "  " + line)
    .join("\n");
}
