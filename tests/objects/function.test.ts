import { parse } from "../../src";

describe("function expression", () => {
  test.each([
    ["N()", "N", []],
    ["N( )", "N", []],
    ["N(0)", "N", ["0"]],
    ["N(1 + 2)", "N", ["1 + 2"]],
    ["SUM(1, 2)", "SUM", ["1", "2"]],
    ["SUM(0, 1, 2)", "SUM", ["0", "1", "2"]],
    ["SUM((1+2), 3*4, SUM(5))", "SUM", ["(1+2)", "3*4", "SUM(5)"]],
  ])("can be parsed from %s", (literal, name, args) => {
    const parsedArgs = args.map((arg) => parse(arg));

    expect(parse(literal)).toMatchObject({ type: "Function", literal, name, args: parsedArgs });
  });
});
