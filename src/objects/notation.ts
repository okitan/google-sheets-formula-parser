export type Notation = {
  type: "Notation";
  literal: string;
  sheetName?: string;
  startRowIndex?: number;
  endRowIndex?: number;
  startColumnIndex?: number;
  endColumnIndex?: number;
};

export function Notation(obj: Omit<Notation, "type">): Notation {
  return { type: "Notation", ...obj };
}

export function buildNotation({
  literal,
  sheetName,
  startColumn,
  startRow,
  endColumn,
  endRow,
}: {
  literal: string;
  sheetName?: string;
  startColumn?: number;
  startRow?: number;
  endColumn?: number;
  endRow: number;
}): Notation {
  return Notation({
    literal,
    sheetName,
    startColumnIndex: startColumn,
    startRowIndex: startRow,
    endColumnIndex: endColumn,
    endRowIndex: endRow,
  });
}

export function columnToIndex(column: string): number {
  return (
    column
      .toUpperCase()
      .split("")
      .reduce((acc, c) => acc * 26 + c.charCodeAt(0) - 64, 0) - 1
  );
}
