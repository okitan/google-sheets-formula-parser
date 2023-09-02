export type NamedRange = {
  type: "NamedRange";
  literal: string;
  value: string;
};

export function NamedRange(obj: { literal: string; value: string }): NamedRange {
  return {
    type: "NamedRange",
    ...obj,
  };
}
