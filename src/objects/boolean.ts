export type Boolean = {
  type: "Boolean";
  literal: string;
  value: boolean;
};

export function Boolean(obj: Omit<Boolean, "type">): Boolean {
  return { type: "Boolean", ...obj };
}
