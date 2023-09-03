import { parse } from "../src";

describe("complex formula", () => {
  test("can be parsed", () => {
    const formula = `BYROW({
        { "駅", "地区", "メモ" }
      ; QUERY(IMPORTRANGE(master!$G$2, "'" & master!$B$2 & "'!$A$2:$E"), master!$J$2)
      ; QUERY(IMPORTRANGE(master!$G$4, "'" & master!$B$4 & "'!$A$2:$E"), master!$J$4)
      ; QUERY(IMPORTRANGE(master!$G$5, "'" & master!$B$5 & "'!$A$2:$E"), master!$J$5)
      ; QUERY(IMPORTRANGE(master!$G$6, "'" & master!$B$6 & "'!$A$2:$E"), master!$J$6)
      }, LAMBDA(e,
        { 
          HYPERLINK("#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)), INDEX(e, 1, 1)), 
          INDEX(e, 1, 2),
          INDEX(e, 1, 3)
        }
      ))`;

    expect(parse(formula)).toMatchInlineSnapshot(`
      {
        "args": [
          {
            "literal": "{
              { "駅", "地区", "メモ" }
            ; QUERY(IMPORTRANGE(master!$G$2, "'" & master!$B$2 & "'!$A$2:$E"), master!$J$2)
            ; QUERY(IMPORTRANGE(master!$G$4, "'" & master!$B$4 & "'!$A$2:$E"), master!$J$4)
            ; QUERY(IMPORTRANGE(master!$G$5, "'" & master!$B$5 & "'!$A$2:$E"), master!$J$5)
            ; QUERY(IMPORTRANGE(master!$G$6, "'" & master!$B$6 & "'!$A$2:$E"), master!$J$6)
            }",
            "type": "Matrix",
            "values": [
              [
                {
                  "literal": "{ "駅", "地区", "メモ" }",
                  "type": "Matrix",
                  "values": [
                    [
                      {
                        "literal": ""駅"",
                        "type": "String",
                        "value": "駅",
                      },
                      {
                        "literal": ""地区"",
                        "type": "String",
                        "value": "地区",
                      },
                      {
                        "literal": ""メモ"",
                        "type": "String",
                        "value": "メモ",
                      },
                    ],
                  ],
                },
              ],
              [
                {
                  "args": [
                    {
                      "args": [
                        {
                          "end": undefined,
                          "literal": "master!$G$2",
                          "sheetName": "master",
                          "start": {
                            "column": {
                              "fixed": true,
                              "index": 6,
                            },
                            "row": {
                              "fixed": true,
                              "index": 1,
                            },
                          },
                          "type": "Notation",
                        },
                        {
                          "left": {
                            "left": {
                              "literal": ""'"",
                              "type": "String",
                              "value": "'",
                            },
                            "literal": ""'" & master!$B$2",
                            "operator": "&",
                            "right": {
                              "end": undefined,
                              "literal": "master!$B$2",
                              "sheetName": "master",
                              "start": {
                                "column": {
                                  "fixed": true,
                                  "index": 1,
                                },
                                "row": {
                                  "fixed": true,
                                  "index": 1,
                                },
                              },
                              "type": "Notation",
                            },
                            "type": "UnaryExpression",
                          },
                          "literal": ""'" & master!$B$2 & "'!$A$2:$E"",
                          "operator": "&",
                          "right": {
                            "literal": ""'!$A$2:$E"",
                            "type": "String",
                            "value": "'!$A$2:$E",
                          },
                          "type": "UnaryExpression",
                        },
                      ],
                      "literal": "IMPORTRANGE(master!$G$2, "'" & master!$B$2 & "'!$A$2:$E")",
                      "name": "IMPORTRANGE",
                      "type": "Function",
                    },
                    {
                      "end": undefined,
                      "literal": "master!$J$2",
                      "sheetName": "master",
                      "start": {
                        "column": {
                          "fixed": true,
                          "index": 9,
                        },
                        "row": {
                          "fixed": true,
                          "index": 1,
                        },
                      },
                      "type": "Notation",
                    },
                  ],
                  "literal": "QUERY(IMPORTRANGE(master!$G$2, "'" & master!$B$2 & "'!$A$2:$E"), master!$J$2)",
                  "name": "QUERY",
                  "type": "Function",
                },
              ],
              [
                {
                  "args": [
                    {
                      "args": [
                        {
                          "end": undefined,
                          "literal": "master!$G$4",
                          "sheetName": "master",
                          "start": {
                            "column": {
                              "fixed": true,
                              "index": 6,
                            },
                            "row": {
                              "fixed": true,
                              "index": 3,
                            },
                          },
                          "type": "Notation",
                        },
                        {
                          "left": {
                            "left": {
                              "literal": ""'"",
                              "type": "String",
                              "value": "'",
                            },
                            "literal": ""'" & master!$B$4",
                            "operator": "&",
                            "right": {
                              "end": undefined,
                              "literal": "master!$B$4",
                              "sheetName": "master",
                              "start": {
                                "column": {
                                  "fixed": true,
                                  "index": 1,
                                },
                                "row": {
                                  "fixed": true,
                                  "index": 3,
                                },
                              },
                              "type": "Notation",
                            },
                            "type": "UnaryExpression",
                          },
                          "literal": ""'" & master!$B$4 & "'!$A$2:$E"",
                          "operator": "&",
                          "right": {
                            "literal": ""'!$A$2:$E"",
                            "type": "String",
                            "value": "'!$A$2:$E",
                          },
                          "type": "UnaryExpression",
                        },
                      ],
                      "literal": "IMPORTRANGE(master!$G$4, "'" & master!$B$4 & "'!$A$2:$E")",
                      "name": "IMPORTRANGE",
                      "type": "Function",
                    },
                    {
                      "end": undefined,
                      "literal": "master!$J$4",
                      "sheetName": "master",
                      "start": {
                        "column": {
                          "fixed": true,
                          "index": 9,
                        },
                        "row": {
                          "fixed": true,
                          "index": 3,
                        },
                      },
                      "type": "Notation",
                    },
                  ],
                  "literal": "QUERY(IMPORTRANGE(master!$G$4, "'" & master!$B$4 & "'!$A$2:$E"), master!$J$4)",
                  "name": "QUERY",
                  "type": "Function",
                },
              ],
              [
                {
                  "args": [
                    {
                      "args": [
                        {
                          "end": undefined,
                          "literal": "master!$G$5",
                          "sheetName": "master",
                          "start": {
                            "column": {
                              "fixed": true,
                              "index": 6,
                            },
                            "row": {
                              "fixed": true,
                              "index": 4,
                            },
                          },
                          "type": "Notation",
                        },
                        {
                          "left": {
                            "left": {
                              "literal": ""'"",
                              "type": "String",
                              "value": "'",
                            },
                            "literal": ""'" & master!$B$5",
                            "operator": "&",
                            "right": {
                              "end": undefined,
                              "literal": "master!$B$5",
                              "sheetName": "master",
                              "start": {
                                "column": {
                                  "fixed": true,
                                  "index": 1,
                                },
                                "row": {
                                  "fixed": true,
                                  "index": 4,
                                },
                              },
                              "type": "Notation",
                            },
                            "type": "UnaryExpression",
                          },
                          "literal": ""'" & master!$B$5 & "'!$A$2:$E"",
                          "operator": "&",
                          "right": {
                            "literal": ""'!$A$2:$E"",
                            "type": "String",
                            "value": "'!$A$2:$E",
                          },
                          "type": "UnaryExpression",
                        },
                      ],
                      "literal": "IMPORTRANGE(master!$G$5, "'" & master!$B$5 & "'!$A$2:$E")",
                      "name": "IMPORTRANGE",
                      "type": "Function",
                    },
                    {
                      "end": undefined,
                      "literal": "master!$J$5",
                      "sheetName": "master",
                      "start": {
                        "column": {
                          "fixed": true,
                          "index": 9,
                        },
                        "row": {
                          "fixed": true,
                          "index": 4,
                        },
                      },
                      "type": "Notation",
                    },
                  ],
                  "literal": "QUERY(IMPORTRANGE(master!$G$5, "'" & master!$B$5 & "'!$A$2:$E"), master!$J$5)",
                  "name": "QUERY",
                  "type": "Function",
                },
              ],
              [
                {
                  "args": [
                    {
                      "args": [
                        {
                          "end": undefined,
                          "literal": "master!$G$6",
                          "sheetName": "master",
                          "start": {
                            "column": {
                              "fixed": true,
                              "index": 6,
                            },
                            "row": {
                              "fixed": true,
                              "index": 5,
                            },
                          },
                          "type": "Notation",
                        },
                        {
                          "left": {
                            "left": {
                              "literal": ""'"",
                              "type": "String",
                              "value": "'",
                            },
                            "literal": ""'" & master!$B$6",
                            "operator": "&",
                            "right": {
                              "end": undefined,
                              "literal": "master!$B$6",
                              "sheetName": "master",
                              "start": {
                                "column": {
                                  "fixed": true,
                                  "index": 1,
                                },
                                "row": {
                                  "fixed": true,
                                  "index": 5,
                                },
                              },
                              "type": "Notation",
                            },
                            "type": "UnaryExpression",
                          },
                          "literal": ""'" & master!$B$6 & "'!$A$2:$E"",
                          "operator": "&",
                          "right": {
                            "literal": ""'!$A$2:$E"",
                            "type": "String",
                            "value": "'!$A$2:$E",
                          },
                          "type": "UnaryExpression",
                        },
                      ],
                      "literal": "IMPORTRANGE(master!$G$6, "'" & master!$B$6 & "'!$A$2:$E")",
                      "name": "IMPORTRANGE",
                      "type": "Function",
                    },
                    {
                      "end": undefined,
                      "literal": "master!$J$6",
                      "sheetName": "master",
                      "start": {
                        "column": {
                          "fixed": true,
                          "index": 9,
                        },
                        "row": {
                          "fixed": true,
                          "index": 5,
                        },
                      },
                      "type": "Notation",
                    },
                  ],
                  "literal": "QUERY(IMPORTRANGE(master!$G$6, "'" & master!$B$6 & "'!$A$2:$E"), master!$J$6)",
                  "name": "QUERY",
                  "type": "Function",
                },
              ],
            ],
          },
          {
            "args": [
              {
                "literal": "e",
                "type": "Symbol",
                "value": "e",
              },
              {
                "literal": "{ 
                HYPERLINK("#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)), INDEX(e, 1, 1)), 
                INDEX(e, 1, 2),
                INDEX(e, 1, 3)
              }",
                "type": "Matrix",
                "values": [
                  [
                    {
                      "args": [
                        {
                          "left": {
                            "literal": ""#gid=640298097&range=D"",
                            "type": "String",
                            "value": "#gid=640298097&range=D",
                          },
                          "literal": ""#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列))",
                          "operator": "&",
                          "right": {
                            "args": [
                              {
                                "args": [
                                  {
                                    "args": [
                                      {
                                        "literal": "e",
                                        "type": "Symbol",
                                        "value": "e",
                                      },
                                      {
                                        "literal": "1",
                                        "negative": false,
                                        "type": "Number",
                                        "value": 1,
                                      },
                                      {
                                        "literal": "1",
                                        "negative": false,
                                        "type": "Number",
                                        "value": 1,
                                      },
                                    ],
                                    "literal": "INDEX(e, 1, 1)",
                                    "name": "INDEX",
                                    "type": "Function",
                                  },
                                  {
                                    "literal": "駅名列",
                                    "type": "Symbol",
                                    "value": "駅名列",
                                  },
                                  {
                                    "literal": "駅名列",
                                    "type": "Symbol",
                                    "value": "駅名列",
                                  },
                                ],
                                "literal": "XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)",
                                "name": "XLOOKUP",
                                "type": "Function",
                              },
                            ],
                            "literal": "ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列))",
                            "name": "ROW",
                            "type": "Function",
                          },
                          "type": "UnaryExpression",
                        },
                        {
                          "args": [
                            {
                              "literal": "e",
                              "type": "Symbol",
                              "value": "e",
                            },
                            {
                              "literal": "1",
                              "negative": false,
                              "type": "Number",
                              "value": 1,
                            },
                            {
                              "literal": "1",
                              "negative": false,
                              "type": "Number",
                              "value": 1,
                            },
                          ],
                          "literal": "INDEX(e, 1, 1)",
                          "name": "INDEX",
                          "type": "Function",
                        },
                      ],
                      "literal": "HYPERLINK("#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)), INDEX(e, 1, 1))",
                      "name": "HYPERLINK",
                      "type": "Function",
                    },
                    {
                      "args": [
                        {
                          "literal": "e",
                          "type": "Symbol",
                          "value": "e",
                        },
                        {
                          "literal": "1",
                          "negative": false,
                          "type": "Number",
                          "value": 1,
                        },
                        {
                          "literal": "2",
                          "negative": false,
                          "type": "Number",
                          "value": 2,
                        },
                      ],
                      "literal": "INDEX(e, 1, 2)",
                      "name": "INDEX",
                      "type": "Function",
                    },
                    {
                      "args": [
                        {
                          "literal": "e",
                          "type": "Symbol",
                          "value": "e",
                        },
                        {
                          "literal": "1",
                          "negative": false,
                          "type": "Number",
                          "value": 1,
                        },
                        {
                          "literal": "3",
                          "negative": false,
                          "type": "Number",
                          "value": 3,
                        },
                      ],
                      "literal": "INDEX(e, 1, 3)",
                      "name": "INDEX",
                      "type": "Function",
                    },
                  ],
                ],
              },
            ],
            "literal": "LAMBDA(e,
              { 
                HYPERLINK("#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)), INDEX(e, 1, 1)), 
                INDEX(e, 1, 2),
                INDEX(e, 1, 3)
              }
            )",
            "name": "LAMBDA",
            "type": "Function",
          },
        ],
        "literal": "BYROW({
              { "駅", "地区", "メモ" }
            ; QUERY(IMPORTRANGE(master!$G$2, "'" & master!$B$2 & "'!$A$2:$E"), master!$J$2)
            ; QUERY(IMPORTRANGE(master!$G$4, "'" & master!$B$4 & "'!$A$2:$E"), master!$J$4)
            ; QUERY(IMPORTRANGE(master!$G$5, "'" & master!$B$5 & "'!$A$2:$E"), master!$J$5)
            ; QUERY(IMPORTRANGE(master!$G$6, "'" & master!$B$6 & "'!$A$2:$E"), master!$J$6)
            }, LAMBDA(e,
              { 
                HYPERLINK("#gid=640298097&range=D" & ROW(XLOOKUP(INDEX(e, 1, 1), 駅名列, 駅名列)), INDEX(e, 1, 1)), 
                INDEX(e, 1, 2),
                INDEX(e, 1, 3)
              }
            ))",
        "name": "BYROW",
        "type": "Function",
      }
    `);
  });
});
