import { String, parse } from "../../src/";
import { buildUnAryExpressionMatcher } from "../helpers/parser";

describe(String, () => {
  test.each(["", "abc", " ", " a b\tc\n", "0", "1", "@", "_!@#$%^&*()-+=[]{};:',.<>/?\\", "𩸽", `""`])(
    "can be parsed from '%s'",
    (s) => {
      const literal = `"${s}"`;
      expect(parse(literal)).toMatchObject({ type: "String", literal, value: s });
    }
  );

  test.each([
    [`"a" & "b"`, "a", "&", "b"],
    [`("a" & "b")`, "a", "&", "b"],
    [`"a" & "b" & "c"`, `"a" & "b"`, "&", "c"],
  ])("can be parsed from '%s'", (s, left, operator, right) => {
    expect(parse(s)).toMatchObject(buildUnAryExpressionMatcher({ literal: s, left, operator, right, asString: true }));
  });

  test.each([`"`])(`considers invalid against '%s'`, (s) => {
    expect(() => parse(s)).toThrowError();
  });
});
