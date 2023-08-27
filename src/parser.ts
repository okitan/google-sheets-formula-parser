import * as objects from "./objects";

// Generated by peggy v. 2.0.1 (ts-pegjs plugin v. 3.0.0 )
//
// https://peggyjs.org/   https://github.com/metadevpro/ts-pegjs

"use strict";

export interface FilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface FileRange {
  start: FilePosition;
  end: FilePosition;
  source: string;
}

export interface LiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface ClassParts extends Array<string | ClassParts> {}

export interface ClassExpectation {
  type: "class";
  parts: ClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface AnyExpectation {
  type: "any";
}

export interface EndExpectation {
  type: "end";
}

export interface OtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = LiteralExpectation | ClassExpectation | AnyExpectation | EndExpectation | OtherExpectation;

function peg$padEnd(str: string, targetLength: number, padString: string) {
  padString = padString || ' ';
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

export class PeggySyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";
        case "class":
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) + "-" + classEscape(part[1] as string)
              : classEscape(part);
          });

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i: number;
      let j: number;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: FileRange;
  public name: string;

  constructor(message: string, expected: Expectation[], found: string | null, location: FileRange) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "PeggySyntaxError";

    if (typeof (Object as any).setPrototypeOf === "function") {
      (Object as any).setPrototypeOf(this, PeggySyntaxError.prototype);
    } else {
      (this as any).__proto__ = PeggySyntaxError.prototype;
    }
    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, PeggySyntaxError);
    }
  }

  format(sources: { grammarSource?: string; text: string }[]): string {
    let str = 'Error: ' + this.message;
    if (this.location) {
      let src: string[] | null = null;
      let k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].grammarSource === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      let s = this.location.start;
      let loc = this.location.source + ':' + s.line + ':' + s.column;
      if (src) {
        let e = this.location.end;
        let filler = peg$padEnd('', s.line.toString().length, ' ');
        let line = src[s.line - 1];
        let last = s.line === e.line ? e.column : line.length + 1;
        str += '\n --> ' + loc + '\n' + filler + ' |\n' + s.line + ' | ' + line + '\n' + filler + ' | ' +
          peg$padEnd('', s.column - 1, ' ') +
          peg$padEnd('', last - s.column, '^');
      } else {
        str += '\n at ' + loc;
      }
    }
    return str;
  }
}

function peg$parse(input: string, options?: ParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED: Readonly<any> = {};
  const peg$source = options.grammarSource;

  const peg$startRuleFunctions: {[id: string]: any} = { start: peg$parsestart };
  let peg$startRuleFunction: () => any = peg$parsestart;

  const peg$c0 = function(head: any, tails: any): any {
        return objects.buildUnaryExpression({ literal: text(), head, tails })
      };
  const peg$c1 = function(e: any): any { 
      return { ...e, literal: text() };
    };
  const peg$c2 = /^[' '\t\r\n]/;
  const peg$c3 = peg$classExpectation(["'", " ", "'", "\t", "\r", "\n"], false, false);
  const peg$c4 = "(";
  const peg$c5 = peg$literalExpectation("(", false);
  const peg$c6 = ")";
  const peg$c7 = peg$literalExpectation(")", false);
  const peg$c8 = "0";
  const peg$c9 = peg$literalExpectation("0", false);
  const peg$c10 = /^[1-9]/;
  const peg$c11 = peg$classExpectation([["1", "9"]], false, false);
  const peg$c12 = "+";
  const peg$c13 = peg$literalExpectation("+", false);
  const peg$c14 = "-";
  const peg$c15 = peg$literalExpectation("-", false);
  const peg$c16 = ".";
  const peg$c17 = peg$literalExpectation(".", false);
  const peg$c18 = function(s: any, i: any): any {
      const negative = s.filter((e) => e === "-").length % 2 === 1;
      return objects.Number({ 
        literal: text(),
        value: i.value * (negative ? -1 : 1),
        negative
      })
    };
  const peg$c19 = function(): any { return new objects.parseAsNumber(text()) };
  const peg$c20 = function(i: any, f: any): any {
      return objects.Number({
        literal: text(),
        value: i.value + f.value * (i.negative ? -1 : 1)
      });
    };
  const peg$c21 = function(): any { return new objects.parseAsNumber(`0${text()}`) };
  const peg$c22 = /^[a-z]/;
  const peg$c23 = peg$classExpectation([["a", "z"]], false, false);
  const peg$c24 = /^[A-Z]/;
  const peg$c25 = peg$classExpectation([["A", "Z"]], false, false);
  const peg$c26 = /^[_!@#$%\^&*()\-+=[\]{};:',.<>\/?\\' '\t\r\n\x80-\uFFFF]/;
  const peg$c27 = peg$classExpectation(["_", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "[", "]", "{", "}", ";", ":", "'", ",", ".", "<", ">", "/", "?", "\\", "'", " ", "'", "\t", "\r", "\n", ["\x80", "\uFFFF"]], false, false);
  const peg$c28 = "\"\"";
  const peg$c29 = peg$literalExpectation("\"\"", false);
  const peg$c30 = "\"";
  const peg$c31 = peg$literalExpectation("\"", false);
  const peg$c32 = function(s: any): any { return objects.String({ literal: text(), value: s.join("") }) };
  const peg$c33 = ":";
  const peg$c34 = peg$literalExpectation(":", false);
  const peg$c35 = function(): any { return objects.parseNotation(text()) };
  const peg$c36 = "*";
  const peg$c37 = peg$literalExpectation("*", false);
  const peg$c38 = "/";
  const peg$c39 = peg$literalExpectation("/", false);
  const peg$c40 = "&";
  const peg$c41 = peg$literalExpectation("&", false);

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: Expectation[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): FileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: FileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1
    );
  }

  function error(message: string, location1?: FileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1: string, ignoreCase: boolean): LiteralExpectation {
    return { type: "literal", text: text1, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts: ClassParts, inverted: boolean, ignoreCase: boolean): ClassExpectation {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation(): AnyExpectation {
    return { type: "any" };
  }

  function peg$endExpectation(): EndExpectation {
    return { type: "end" };
  }

  function peg$otherExpectation(description: string): OtherExpectation {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): FileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: FileRange) {
    return new PeggySyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: FileRange) {
    return new PeggySyntaxError(
      PeggySyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1
    );
  }

  function peg$parsestart(): any {
    let s0;

    s0 = peg$parseadditive_expr();

    return s0;
  }

  function peg$parseadditive_expr(): any {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsemultiplicative_expr();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parseSP();
      if (s4 as any === peg$FAILED) {
        s4 = null;
      }
      if (s4 as any !== peg$FAILED) {
        s5 = peg$parseADDITIVE_OPERATOR();
        if (s5 as any !== peg$FAILED) {
          s6 = peg$parseSP();
          if (s6 as any === peg$FAILED) {
            s6 = null;
          }
          if (s6 as any !== peg$FAILED) {
            s7 = peg$parsemultiplicative_expr();
            if (s7 as any !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parseSP();
        if (s4 as any === peg$FAILED) {
          s4 = null;
        }
        if (s4 as any !== peg$FAILED) {
          s5 = peg$parseADDITIVE_OPERATOR();
          if (s5 as any !== peg$FAILED) {
            s6 = peg$parseSP();
            if (s6 as any === peg$FAILED) {
              s6 = null;
            }
            if (s6 as any !== peg$FAILED) {
              s7 = peg$parsemultiplicative_expr();
              if (s7 as any !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemultiplicative_expr(): any {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseprimary_expr();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parseSP();
      if (s4 as any === peg$FAILED) {
        s4 = null;
      }
      if (s4 as any !== peg$FAILED) {
        s5 = peg$parseMULTIPLICATIVE_OPERATOR();
        if (s5 as any !== peg$FAILED) {
          s6 = peg$parseSP();
          if (s6 as any === peg$FAILED) {
            s6 = null;
          }
          if (s6 as any !== peg$FAILED) {
            s7 = peg$parseprimary_expr();
            if (s7 as any !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parseSP();
        if (s4 as any === peg$FAILED) {
          s4 = null;
        }
        if (s4 as any !== peg$FAILED) {
          s5 = peg$parseMULTIPLICATIVE_OPERATOR();
          if (s5 as any !== peg$FAILED) {
            s6 = peg$parseSP();
            if (s6 as any === peg$FAILED) {
              s6 = null;
            }
            if (s6 as any !== peg$FAILED) {
              s7 = peg$parseprimary_expr();
              if (s7 as any !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseprimary_expr(): any {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$parseelem();
    if (s0 as any === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseLPAREN();
      if (s1 as any !== peg$FAILED) {
        s2 = peg$parseSP();
        if (s2 as any === peg$FAILED) {
          s2 = null;
        }
        if (s2 as any !== peg$FAILED) {
          s3 = peg$parseadditive_expr();
          if (s3 as any !== peg$FAILED) {
            s4 = peg$parseSP();
            if (s4 as any === peg$FAILED) {
              s4 = null;
            }
            if (s4 as any !== peg$FAILED) {
              s5 = peg$parseRPAREN();
              if (s5 as any !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c1(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseelem(): any {
    let s0;

    s0 = peg$parsea1_notation();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parsenumber();
      if (s0 as any === peg$FAILED) {
        s0 = peg$parsestring();
      }
    }

    return s0;
  }

  function peg$parseSP(): any {
    let s0, s1;

    s0 = [];
    if (peg$c2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c3); }
    }
    if (s1 as any !== peg$FAILED) {
      while (s1 as any !== peg$FAILED) {
        s0.push(s1);
        if (peg$c2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c3); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseLPAREN(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 40) {
      s0 = peg$c4;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c5); }
    }

    return s0;
  }

  function peg$parseRPAREN(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 41) {
      s0 = peg$c6;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }

    return s0;
  }

  function peg$parsenumber(): any {
    let s0;

    s0 = peg$parsefloat();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseinteger();
    }

    return s0;
  }

  function peg$parseDIGIT(): any {
    let s0;

    s0 = peg$parseZERO();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseNONZERO_DIGIT();
    }

    return s0;
  }

  function peg$parseZERO(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 48) {
      s0 = peg$c8;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c9); }
    }

    return s0;
  }

  function peg$parseNONZERO_DIGIT(): any {
    let s0;

    if (peg$c10.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c11); }
    }

    return s0;
  }

  function peg$parsePLUS(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 43) {
      s0 = peg$c12;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }

    return s0;
  }

  function peg$parseMINUS(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 45) {
      s0 = peg$c14;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }

    return s0;
  }

  function peg$parseDECIMAL_POINT(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 46) {
      s0 = peg$c16;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c17); }
    }

    return s0;
  }

  function peg$parseinteger(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseSIGN();
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parsesigned_integer();
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c18(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSIGN(): any {
    let s0, s1;

    s0 = [];
    s1 = peg$parsePLUS();
    if (s1 as any === peg$FAILED) {
      s1 = peg$parseMINUS();
    }
    while (s1 as any !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsePLUS();
      if (s1 as any === peg$FAILED) {
        s1 = peg$parseMINUS();
      }
    }

    return s0;
  }

  function peg$parsesigned_integer(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseZERO();
    if (s1 as any === peg$FAILED) {
      s1 = peg$currPos;
      s2 = peg$parseNONZERO_DIGIT();
      if (s2 as any !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseDIGIT();
        while (s4 as any !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseDIGIT();
        }
        if (s3 as any !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c19();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsefloat(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseinteger();
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parsefrac();
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c20(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefrac(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseDECIMAL_POINT();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseDIGIT();
      if (s3 as any !== peg$FAILED) {
        while (s3 as any !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseDIGIT();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c21();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseALPHA(): any {
    let s0;

    s0 = peg$parseLOWER_ALPHA();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseUPPER_ALPHA();
    }

    return s0;
  }

  function peg$parseLOWER_ALPHA(): any {
    let s0;

    if (peg$c22.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }

    return s0;
  }

  function peg$parseUPPER_ALPHA(): any {
    let s0;

    if (peg$c24.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }

    return s0;
  }

  function peg$parseALNUM(): any {
    let s0;

    s0 = peg$parseALPHA();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseDIGIT();
    }

    return s0;
  }

  function peg$parseCHAR(): any {
    let s0;

    s0 = peg$parseALNUM();
    if (s0 as any === peg$FAILED) {
      if (peg$c26.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
    }

    return s0;
  }

  function peg$parseESCAPED_CHAR(): any {
    let s0;

    if (input.substr(peg$currPos, 2) === peg$c28) {
      s0 = peg$c28;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }

    return s0;
  }

  function peg$parseDOUBLE_QUOTE(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c30;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }

    return s0;
  }

  function peg$parsestring(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseDOUBLE_QUOTE();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseCHAR();
      if (s3 as any === peg$FAILED) {
        s3 = peg$parseESCAPED_CHAR();
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseCHAR();
        if (s3 as any === peg$FAILED) {
          s3 = peg$parseESCAPED_CHAR();
        }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseDOUBLE_QUOTE();
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsea1_notation(): any {
    let s0;

    s0 = peg$parserange();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parsecell();
    }

    return s0;
  }

  function peg$parseDELIMITER(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 58) {
      s0 = peg$c33;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c34); }
    }

    return s0;
  }

  function peg$parseCOLUMN(): any {
    let s0, s1;

    s0 = [];
    if (peg$c24.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }
    if (s1 as any !== peg$FAILED) {
      while (s1 as any !== peg$FAILED) {
        s0.push(s1);
        if (peg$c24.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c25); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseROW(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseNONZERO_DIGIT();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseDIGIT();
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseDIGIT();
      }
      if (s2 as any !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecell(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseCOLUMN();
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseROW();
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c35();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parserange(): any {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseCOLUMN();
    if (s2 as any !== peg$FAILED) {
      s3 = peg$parseROW();
      if (s3 as any === peg$FAILED) {
        s3 = null;
      }
      if (s3 as any !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseDELIMITER();
      if (s2 as any !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parseCOLUMN();
        if (s4 as any !== peg$FAILED) {
          s5 = peg$parseROW();
          if (s5 as any === peg$FAILED) {
            s5 = null;
          }
          if (s5 as any !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c35();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 as any === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseCOLUMN();
      if (s2 as any === peg$FAILED) {
        s2 = null;
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseROW();
        if (s3 as any !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 as any !== peg$FAILED) {
        s2 = peg$parseDELIMITER();
        if (s2 as any !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseCOLUMN();
          if (s4 as any === peg$FAILED) {
            s4 = null;
          }
          if (s4 as any !== peg$FAILED) {
            s5 = peg$parseROW();
            if (s5 as any !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 as any !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c35();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseADDITIVE_OPERATOR(): any {
    let s0;

    s0 = peg$parsePLUS();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseMINUS();
      if (s0 as any === peg$FAILED) {
        s0 = peg$parseAMBASSADOR();
      }
    }

    return s0;
  }

  function peg$parseMULTIPLICATIVE_OPERATOR(): any {
    let s0;

    s0 = peg$parseMULTIPLY();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseDIVIDE();
    }

    return s0;
  }

  function peg$parseMULTIPLY(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 42) {
      s0 = peg$c36;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c37); }
    }

    return s0;
  }

  function peg$parseDIVIDE(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 47) {
      s0 = peg$c38;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c39); }
    }

    return s0;
  }

  function peg$parseAMBASSADOR(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 38) {
      s0 = peg$c40;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c41); }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export interface ParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = (input: string, options?: ParseOptions) => any;
export const parse: ParseFunction = peg$parse;

