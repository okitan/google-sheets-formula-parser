import type { ParseResult } from "..";

export type Function = {
  type: "Function";
  literal: string;
  name: string;
  args: ParseResult[];
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
  tails: Array<[string[] | null, ",", string[] | null, ParseResult]>;
}): Function {
  const args = [head, ...tails.map((tail) => tail[3])].filter((e): e is ParseResult => Boolean(e));

  return Function({
    literal,
    name,
    args,
  });
}
