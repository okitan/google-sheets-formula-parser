import { parse } from "../../src";

describe("boolean", () => {
  test.each([
    ["TRUE", true],
    ["FALSE", false],
  ])("can be parsed from %s", (literal, value) => {
    expect(parse(literal)).toMatchObject({ type: "Boolean", literal, value });
  });
});
