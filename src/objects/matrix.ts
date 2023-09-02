import type { ParseResult } from "..";

export type Matrix = {
  type: "Matrix";
  literal: string;
  values: ParseResult[][];
};

export function Matrix(obj: Omit<Matrix, "type">): Matrix {
  return { type: "Matrix", ...obj };
}

export function buildRow({
  literal,
  head,
  tails,
}: {
  literal: string;
  head?: ParseResult;
  tails: Array<[string[] | null, string, string[] | null, ParseResult]>;
}): Matrix {
  const values = [head, ...tails.map((tail) => tail[3])].filter((e): e is ParseResult => Boolean(e));

  return Matrix({ literal, values: [values] });
}
