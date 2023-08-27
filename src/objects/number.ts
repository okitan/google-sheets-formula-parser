export type Number = {
  type: "Number";
  literal: string;
  value: number;
  negative?: boolean; // for -0.1 which parsed -0 / .1
};

export function Number(num: { literal: string; value: number; negative?: boolean }): Number {
  return {
    type: "Number",
    ...num,
  };
}

export function parseAsNumber(literal: string): Number {
  return {
    type: "Number",
    literal,
    value: parseFloat(literal),
  };
}
