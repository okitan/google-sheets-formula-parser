import { parse } from "../../src";

describe("named range", () => {
  test.each(["AAA"])("can be parsed from %s", (literal) => {
    expect(parse(literal)).toMatchObject({ type: "Symbol", literal, value: literal });
  });
});
