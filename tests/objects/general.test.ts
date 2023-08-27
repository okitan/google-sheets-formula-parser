import { parse } from "../../src";

describe("general expression", () => {
  describe("parenthesis", () => {
    test.each([1])("can be parsed from (%s)", (s) => {
      const literal = `(${s})`;
      expect(parse(literal)).toMatchObject({ type: "Number", literal, value: s });
    });

    test.each(["(", ")", "()"])("considers invalid against %s", (s) => {
      expect(() => parse(s)).toThrowError();
    });
  });
});
