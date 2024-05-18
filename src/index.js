import { writeFile } from "node:fs/promises";
import { mkdirIfNotExists } from "./util.js";
import { LinkedList } from "./LinkedList.js";

(async () => {
  console.time("list prime numbers");
  const list = new LinkedList();
  list.addTail(2);
  list.addTail(3);
  for (let i = 6; list.size() !== 100_000; i += 6) {
    for (let j = -1; j != 3; j += 2) {
      let isPrime = true;
      const v = i + j;
      list.forEach((value, _, stopHere) => {
        if (v % value === 0 && value * value <= v) {
          isPrime = false;
          stopHere();
        }
      });
      if (isPrime) {
        list.addTail(v);
      }
    }
  }
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
