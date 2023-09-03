import { parse } from "../../src";
import { Notation, columnToIndex } from "../../src/objects";
describe(Notation, () => {
  test.each([
    ["A1", { start: { column: { index: 0 }, row: { index: 0 } } }],
    ["AB10", { start: { column: { index: 27 }, row: { index: 9 } } }],
    ["A1:B2", { start: { column: { index: 0 }, row: { index: 0 } }, end: { column: { index: 1 }, row: { index: 1 } } }],
    ["A1:B", { start: { column: { index: 0 }, row: { index: 0 } }, end: { column: { index: 1 }, row: undefined } }],
    ["A2:3", { start: { column: { index: 0 }, row: { index: 1 } }, end: { column: undefined, row: { index: 2 } } }],
    ["2:3", { start: { column: undefined, row: { index: 1 } }, end: { column: undefined, row: { index: 2 } } }],
    ["'Sheet 1'!A1", { sheetName: "Sheet 1", start: { column: { index: 0 }, row: { index: 0 } } }],
    ["0!A1", { sheetName: "0", start: { column: { index: 0 }, row: { index: 0 } } }],
    [
      "'Sheet 1'!A1:B2",
      { start: { column: { index: 0 }, row: { index: 0 } }, end: { column: { index: 1 }, row: { index: 1 } } },
    ],
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
