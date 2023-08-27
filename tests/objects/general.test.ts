import { parse } from "../../src";

describe("general expression", () => {
  describe("space", () => {
    // TODO: can be parsed in the future
    test.each(["1 ", " 1", " 1 "])("considers invalid against '%s'", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });

  describe("parenthesis", () => {
    test.each([1])("can be parsed from (%s)", (s) => {
      const literal = `(${s})`;
      expect(parse(literal)).toMatchObject({ type: "Number", literal, value: s });
    });

    test.each(["(", ")", "()", "( )"])("considers invalid against %s", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });
});
