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
    // Comparison
    ["(1+2)=(3*1)", "(1 + 2) = (3 * 1)"],
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
    ["{}", "{}"],
    ["{{}}", "{}"],
    ["{1,2}", "{1, 2}"],
    ["{{1,2}}", "{1, 2}"],
    ["{1;2}", "{1; 2}"],
    ["{1,2;3,4}", "{1, 2; 3, 4}"],
    ["{{1,2};{3,4}}", "{1, 2; 3, 4}"],
  ])(`should format %s to %s`, (input, expected) => {
    expect(format(parse(input))).toBe(expected);
  });

  test.each([
    [
      "first line is 9 chars",
      "SUM(1,2,3,4,5)",
      9,
      `SUM(1, 2,
  3, 4, 5
)`,
    ],
    [
      "`SUM(1, 2)` is 9 chars, 9 < 11 - 2 measn it can be in one line",
      "IF(SUM(1,2), SUM(1,2),)",
      11,
      `IF(
  SUM(1, 2),
  SUM(1, 2),
)`,
    ],
    [
      "multiple if",
      "IF(IF(IF(1=1, TRUE, FALSE),),)",
      10,
      `IF(
  IF(
    IF(
      1 = 1,
      TRUE,
      FALSE
    ),
  ),
)`,
    ],
    [
      "matrix should be wrapped",
      "{ 1, 2, 3; 4, 5, 6}",
      10,
      `{
  1, 2, 3
; 4, 5, 6
}`,
    ],
  ])("in case of %s, should wrap %s into %i chars", (_name, input, width, expected) => {
    expect(format(parse(input), { width })).toBe(expected);

    // property based test
    const lines = format(parse(input)).split("\n");
    expect(Math.max(...lines.map((e) => e.length))).toBeLessThanOrEqual(80);
  });
});
