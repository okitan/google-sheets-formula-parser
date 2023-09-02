import { parse } from "../../src";

describe("matrix", () => {
  test.each([
    ["{}", [[]]],
    ["{ 0 }", [["0"]]],
    ["{ 0, 1 }", [["0", "1"]]],
    ["{ 1+2, 3 * 4 }", [["1+2", "3 * 4"]]],
  ])("can be parsed from %s", (literal, expected) => {
    const values = expected.map((row) => row.map((value) => parse(value)));

    expect(parse(literal)).toMatchObject({ type: "Matrix", literal, values });
  });
});