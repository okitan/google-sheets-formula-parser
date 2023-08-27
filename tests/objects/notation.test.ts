import { parse } from "../../src";
import { Notation, columnToIndex } from "../../src/objects";
describe(Notation, () => {
  test.each([
    ["A1", { startRowIndex: 0, startColumnIndex: 0 }],
    ["AB10", {}],
    ["A1:B2", {}],
    ["A1:B", {}],
    ["A2:3", {}],
    ["2:3", {}],
  ])("can be parsed from %s", (s, info) => {
    expect(parse(s)).toMatchObject({
      type: "Notation",
      literal: s,
      ...info,
    });
  });
});

describe(columnToIndex, () => {
  test.each([
    ["A", 0],
    ["Z", 25],
    ["AA", 26],
    ["BZ", 77],
  ])("can be parsed from %s", (s, index) => {
    expect(columnToIndex(s)).toBe(index);
  });
});
