import { Number, parse } from "../../src/";

describe(Number, () => {
  describe("integer", () => {
    test.each(["-99", "-1", "-0", "0", "1", "99"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", value: parseInt(s, 10) });
    });
  });

  describe("float", () => {
    test.each(["-10.01", "-0.01", "-0.0", "0.0", "0.01", "10.01"])("can be parsed from %s", (s) => {
      expect(parse(s)).toMatchObject({ type: "Number", value: parseFloat(s) });
    });
  });
});
