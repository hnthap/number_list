import { deepStrictEqual, notDeepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { doesDirectoryExist, getFirstNPrimeNumbers } from "../src/util.js";

describe("utility methods", () => {
  it("get first n prime numbers", () => {
    for (const n of [1_000, 799, 203]) {
      getFirstNPrimeNumbers(n).forEach((value) => {
        if (value === 2) return;
        if (value === 3) return;
        notDeepStrictEqual(value % 2, 0);
        notDeepStrictEqual(value % 3, 0);
        for (let i = 5; i * i <= value; i += 6) {
          notDeepStrictEqual(value % i, 0);
          notDeepStrictEqual(value % (i + 2), 0);
        }
      });
    }
  });

  it("the directory src exists but <empty> does not", async () => {
    deepStrictEqual(await doesDirectoryExist("src"), true);
    deepStrictEqual(await doesDirectoryExist(""), false);
  });
});
