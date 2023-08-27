import { String, parse } from "../../src/";

describe(String, () => {
  test.each(["", "abc", " ", " a b\tc\n", "0", "1", "@", "_!@#$%^&*()-+=[]{};:',.<>/?\\", "𩸽", `""`])(
    "can be parsed from '%s'",
    (s) => {
      const literal = `"${s}"`;
      expect(parse(literal)).toMatchObject({ type: "String", literal, value: s });
    }
  );

  test.each([`"`])(`considers invalid against '%s'`, (s) => {
    expect(() => parse(s)).toThrowError();
  });
});
