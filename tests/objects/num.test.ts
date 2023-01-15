import { Number, parse } from "../../src/";

describe(Number, () => {
  test.each(["0", "1", "99"])("can be parsed from %s", (s) => {
    expect(parse(s)).toMatchObject({ type: "Number", value: parseInt(s, 10) });
  });
});
