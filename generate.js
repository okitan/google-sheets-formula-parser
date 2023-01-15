#!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs");

const tspegjs = require("ts-pegjs");
const peggy = require("peggy");

const parser = peggy.generate(readFileSync("./grammer.peg").toString(), {
  output: "source",
  format: "commonjs",
  plugins: [tspegjs],
  tspegjs: {
    customHeader: `import * as objects from "./objects";`,
  },
});

writeFileSync("./src/parser.ts", parser);
