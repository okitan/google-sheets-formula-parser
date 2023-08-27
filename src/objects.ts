import type { String } from "./objects";
import type { Number } from "./objects";
import type { UnaryExpression } from "./objects";

export * from "./objects/number";
export * from "./objects/operator";
export * from "./objects/string";

export type Expression = UnaryExpression | Number | String;
