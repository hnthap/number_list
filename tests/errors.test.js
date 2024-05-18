import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { UnimplementedError, UnreachableError } from "../src/errors.js";

describe("errors", () => {
  it("unimplemented error", () => {
    try {
      throw new UnimplementedError();
    } catch (err) {
      deepStrictEqual(err instanceof Error, true);
      const message = err.message;
      deepStrictEqual(typeof message, "string");
      deepStrictEqual(message.toUpperCase().includes("UNIMPLEMENTED"), true);
    }
  });
  
  it("unreachable error", () => {
    try {
      throw new UnreachableError();
    } catch (err) {
      deepStrictEqual(err instanceof Error, true);
      const message = err.message;
      deepStrictEqual(typeof message, "string");
      deepStrictEqual(message.toUpperCase().includes("UNREACHABLE"), true);
    }
  });
})
