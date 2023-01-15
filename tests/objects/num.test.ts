import { Number, parse } from "../../src/";

function unaryExpressionWithoutLiteral(expr: string) {
  const result = parse(expr);

  if (result.type === "UnaryExpression") {
    const { type, operator, left, right } = result;

    return { type, operator, left, right };
  } else {
    return result;
  }
}

describe(Number, () => {
  describe("integer", () => {
    test.each(["-99", "-1", "-0", "0", "+0", "1", "99"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", literal: s, value: parseInt(s, 10) });
    });
  });

  describe("float", () => {
    test.each(["-10.01", "-0.01", "-0.0", "0.0", "+0.0", "0.01", "10.01"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", value: parseFloat(s) });
    });
  });

  describe("invalid case", () => {
    // FIXME: --0, ++0 is actually valid
    test.each(["--0", "++0", "-00", "00", "00.0"])("considers invalid against %s", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });

  describe("with operator", () => {
    test.each([
      ["1+2", "+", 1, 2],
      ["1 +  2", "+", 1, 2],
      ["1+-1", "+", 1, -1],
      ["1++2", "+", 1, 2],
      ["-1+-2", "+", -1, -2],
      ["1-2", "-", 1, 2],
      ["1--1", "-", 1, -1],
      ["1-+2", "-", 1, 2],
      ["-1--2", "-", -1, -2],
    ])("can be prased from %s", (s, operator, left, right) => {
      expect(parse(s)).toMatchObject({
        type: "UnaryExpression",
        literal: s,
        left: { type: "Number", value: left },
        operator,
        right: { type: "Number", value: right },
      });
    });

    describe("with operators", () => {
      test.each([
        ["1+2+3", "+", "1+2", "3"],
        ["1+2+3+4", "+", "1+2+3", "4"],
        ["1-2+3", "+", "1-2", "3"],
      ])("can be prased from %s", (s, operator, left, right) => {
        expect(parse(s)).toMatchObject({
          type: "UnaryExpression",
          literal: s,
          left: unaryExpressionWithoutLiteral(left),
          operator,
          right: unaryExpressionWithoutLiteral(right),
        });
      });
    });
  });
});
