export type Symbol = {
  type: "Symbol";
  literal: string;
  value: string;
};

export function Symbol(obj: { literal: string; value: string }): Symbol {
  return {
    type: "Symbol",
    ...obj,
  };
}
