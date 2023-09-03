import { parse } from "../../src";
import { buildUnAryExpressionMatcher } from "../helpers/parser";

describe("operator", () => {
  describe("of additive", () => {
    test.each([
      ["1+2", 1, "+", 2],
      ["1-2", 1, "-", 2],
      ["1 + 2 + 3", "1 + 2", "+", 3],
      ["1+2+3+4", "1+2+3", "+", 4],
      ["1-2+3", "1-2", "+", 3],
    ])("can be parsed from %s", (literal, left, operator, right) => {
      expect(parse(literal)).toMatchObject(buildUnAryExpressionMatcher({ literal, left, operator, right }));
    });
  });

  describe("of multiplicative", () => {
    test.each([
      ["1*2", 1, "*", 2],
      ["1/2", 1, "/", 2],
      ["1/2*3", "1/2", "*", 3],
    ])("can be parsed from %s", (literal, left, operator, right) => {
      expect(parse(literal)).toMatchObject(buildUnAryExpressionMatcher({ literal, left, operator, right }));
    });
  });

  describe("of comparison", () => {
    test.each([["1>2", 1, ">", 2]])(`can be parsed from %s`, (literal, left, operator, right) => {
      expect(parse(literal)).toMatchObject(buildUnAryExpressionMatcher({ literal, left, operator, right }));
    });
  });

  describe("of join order", () => {
    test.each([
      ["1+2*3", 1, "+", "2*3"],
      ["1*2+3", "1*2", "+", 3],
      ["1*2+3*4", "1*2", "+", "3*4"],
      ["1-2/3+4", "1-2/3", "+", 4],
      ["1+2*3+4", "1+2*3", "+", 4],
      ["1+2*3>4+5*6", "1+2*3", ">", "4+5*6"],
    ])("can be parsed from %s", (literal, left, operator, right) => {
      expect(parse(literal)).toMatchObject(buildUnAryExpressionMatcher({ literal, left, operator, right }));
    });
  });
});
