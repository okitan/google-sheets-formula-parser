import { format, parse } from "../src";

describe(format, () => {
  test.each([
    // Number
    ["--1", "1"],
    // Number Operator
    ["1+2", "1 + 2"],
    ["(1+2)", "1 + 2"],
    ["(1+2)*3", "(1 + 2) * 3"],
    ["(1*2)*3", "1 * 2 * 3"],
    ["(1*2+3)*4", "(1 * 2 + 3) * 4"],
    ["-1--2", "-1 - -2"],
    // String Operator
    [`"hoge"&"fuga"`, `"hoge" & "fuga"`],
    // Boolean
    ["true", "TRUE"],
    ["false", "FALSE"],
    // Notation is as is
    ["A1:B$2", "A1:B$2"],
    // Symbol
    ["名前付き範囲", "名前付き範囲"],
    // Function
    ["sum(1,2)", "SUM(1, 2)"],
    // Matrix
    ["{1,2;3,4}", "{1, 2; 3, 4}"],
  ])(`should format %s to %s`, (input, expected) => {
    expect(format(parse(input))).toBe(expected);
  });
});
