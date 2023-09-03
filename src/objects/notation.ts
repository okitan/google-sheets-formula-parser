type RowOrColumn = {
  index: number;
  fixed: boolean;
};

export type Notation = {
  type: "Notation";
  literal: string;
  sheetName?: string;
  start: { row?: RowOrColumn; column?: RowOrColumn };
  end?: { row?: RowOrColumn; column?: RowOrColumn };
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
  startColumn?: RowOrColumn;
  startRow?: RowOrColumn;
  endColumn?: RowOrColumn;
  endRow?: RowOrColumn;
}): Notation {
  return Notation({
    literal,
    sheetName,
    start: {
      row: startRow ?? undefined,
      column: startColumn ?? undefined,
    },
    end: {
      row: endRow ?? undefined,
      column: endColumn ?? undefined,
    },
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
