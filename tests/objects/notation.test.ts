import { parse } from "../../src";
import { Notation, columnToIndex } from "../../src/objects";
describe(Notation, () => {
  test.each([
    ["A1", { startColumnIndex: 0, startRowIndex: 0 }],
    ["AB10", { startColumnIndex: 27, startRowIndex: 9 }],
    ["A1:B2", { startColumnIndex: 0, startRowIndex: 0, endColumnIndex: 1, endRowIndex: 1 }],
    ["A1:B", { startColumnIndex: 0, startRowIndex: 0, endColumnIndex: 1, endRowIndex: undefined }],
    ["A2:3", { startColumnIndex: 0, startRowIndex: 1, endColumnIndex: undefined, endRowIndex: 2 }],
    ["2:3", { startColumnIndex: undefined, startRowIndex: 1, endColumnIndex: undefined, endRowIndex: 2 }],
    ["'Sheet 1'!A1", { startColumnIndex: 0, startRowIndex: 0, sheetName: "Sheet 1" }],
    ["0!A1", { startColumnIndex: 0, startRowIndex: 0, sheetName: "0" }],
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
