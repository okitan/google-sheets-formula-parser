export type String = {
  type: "String";
  literal: string;
  value: string;
};

export function String(str: { literal: string; value: string }): String {
  return {
    type: "String",
    ...str,
  };
}
