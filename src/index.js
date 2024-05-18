import { writeFile } from "node:fs/promises";
import { getFirstNPrimeNumbers, mkdirIfNotExists } from "./util.js";

(async () => {
  console.time("list prime numbers");
  const list = getFirstNPrimeNumbers(10_000);
  console.timeEnd("list prime numbers");

  console.time("write to file");
  await mkdirIfNotExists("out");
  await writeFile(
    "out/primes.txt",
    list
      .toArray()
      .map((value) => value.toString())
      .join("\n"),
    { encoding: "utf-8" }
  );
  console.timeEnd("write to file");
})();
