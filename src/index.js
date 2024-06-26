import { writeFile } from "node:fs/promises";
import { getFirstNPrimeNumbers, mkdirIfNotExists } from "./util.js";

(async () => {
  const OUT_PATH = "./out/primes.txt";
  const NUM_PRIMES = 10_000;

  console.time(`list the first ${NUM_PRIMES} prime numbers`);
  const list = getFirstNPrimeNumbers(NUM_PRIMES);
  console.timeEnd(`list the first ${NUM_PRIMES} prime numbers`);

  console.time(`write to file`);
  await mkdirIfNotExists("out");
  await writeFile(
    OUT_PATH,
    list
      .toArray()
      .map((value) => value.toString())
      .join("\n"),
    { encoding: "utf-8" }
  );
  console.timeEnd(`write to file`);
  console.log(`output stored at: ${OUT_PATH}`);
})();
