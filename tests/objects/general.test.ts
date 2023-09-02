import { parse } from "../../src";

describe("general expression", () => {
  describe("space", () => {
    // TODO: can be parsed in the future
    test.each(["1 ", " 1", " 1 ", "AA A"])("considers invalid against '%s'", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });

  describe("parenthesis", () => {
    test.each([
      ["(1)", 1],
      ["((1))", 1],
    ])("can be parsed from %s", (literal, value) => {
      expect(parse(literal)).toMatchObject({ type: "Number", literal, value });
    });

    test.each(["(", ")", "()", "( )"])("considers invalid against %s", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });
  describe("named range", () => {
    test.each(["AAA"])("can be parsed from %s", (literal) => {
      expect(parse(literal)).toMatchObject({ type: "NamedRange", literal, value: literal });
    });
  });
});
