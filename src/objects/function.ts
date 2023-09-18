import type { ParseResult } from "..";

export type Function = {
  type: "Function";
  literal: string;
  name: string;
  args: Array<ParseResult | null>;
};

export function Function({ literal, name, args }: Omit<Function, "type">): Function {
  return { type: "Function", literal, name, args: args };
}

export function buildFunction({
  literal,
  name,
  head,
  tails,
}: {
  literal: string;
  name: string;
  head?: ParseResult;
  tails: Array<[string[] | null, ",", string[] | null, ParseResult | null]>;
}): Function {
  const args = typeof head === "undefined" ? tails.map((tail) => tail[3]) : [head, ...tails.map((tail) => tail[3])];

  return Function({
    literal,
    name,
    args: args.some((e) => Boolean(e)) ? args : [],
  });
}
