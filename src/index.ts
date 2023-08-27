import { Number, UnaryExpression } from "./objects";
import { parse as _parse } from "./parser";

export * from "./objects";
export { parse as _parse } from "./parser";

export function parse(str: string) {
  const parsed = _parse(str);
  assertParsed(parsed);

  return parsed;
}

// TODO: I'd like to generate
export type ParseResult = Number | UnaryExpression;
function assertParsed(parsed: any): asserts parsed is ParseResult {
  const types = ["Number", "String", "UnaryExpression"];

  if (!types.includes(parsed.type)) throw new Error(`parse result is not one of ${types}`);
}
