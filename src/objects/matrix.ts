import type { ParseResult } from "..";

export type Matrix = {
  type: "Matrix";
  literal: string;
  values: ParseResult[][];
};

export function Matrix(obj: Omit<Matrix, "type">): Matrix {
  return { type: "Matrix", ...obj };
}

export function buildMatrix({
  literal,
  head,
  tails,
}: {
  literal: string;
  head?: ParseResult | ParseResult[];
  tails: Array<[string[] | null, string, string[] | null, ParseResult | ParseResult[]]>;
}): Matrix {
  const values = [
    head ? (Array.isArray(head) ? head : [head]) : [],
    ...tails.map((tail) => (Array.isArray(tail[3]) ? tail[3] : [tail[3]])),
  ].filter((e): e is ParseResult[] => Boolean(e));

  return Matrix({ literal, values: values });
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

export function buildArray({
  head,
  tails,
}: {
  head: ParseResult;
  tails: Array<[string[] | null, string, string[] | null, ParseResult]>;
}): ParseResult | ParseResult[] {
  const items = [head, ...tails.map((tail) => tail[3])].filter((e): e is ParseResult => Boolean(e));

  return items;
}
