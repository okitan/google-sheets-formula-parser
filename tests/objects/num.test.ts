import { Number, parse } from "../../src/";

describe(Number, () => {
  describe("integer", () => {
    test.each(["-99", "-1", "-0", "0", "1", "99"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", value: parseInt(s, 10) });
    });
  });

  describe("float", () => {
    test.each(["-10.01", "-0.01", "-0.0", "0.0", "0.01", "10.01"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", value: parseFloat(s) });
    });
  });

  describe("invalid case", () => {
    test.each(["--0", "-00", "00", "00.0"])("considers invalid against %s", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });

  describe("with operator", () => {
    test.each([["1+2", 1, "+", 2]])("can be prased from %s", (s, left, operator, right) => {
      expect(parse(s)).toMatchObject({
        type: "Operator",
        left: { type: "Number", value: left },
        operator,
        right: { type: "Number", value: right },
      });
    });
  });
});
