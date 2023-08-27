export type Notation = {
  type: "Notation";
  literal: string;
  startRowIndex?: number;
  endRowIndex?: number;
  startColumnIndex?: number;
  endColumnIndex?: number;
};

export function Notation(obj: Omit<Notation, "type">): Notation {
  return { type: "Notation", ...obj };
}

export function parseNotation(literal: string): Notation {
  const [start, end] = literal.split(":");

  const [startColumn, startRow] = start.split(/(\d+)/);
  const [endColumn, endRow] = end?.split(/(\d+)/) ?? [];

  return Notation({
    literal,
    startColumnIndex: startColumn ? columnToIndex(startColumn) : undefined,
    startRowIndex: startRow ? Number(startRow) - 1 : undefined,
    endColumnIndex: endColumn ? columnToIndex(endColumn) : undefined,
    endRowIndex: endRow ? Number(endRow) - 1 : undefined,
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
