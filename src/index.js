import { writeFile } from "node:fs/promises";
import { mkdirIfNotExists } from "./util.js";
import { LinkedList } from "./LinkedList.js";

(async () => {
  console.time("list prime numbers");
  const list = new LinkedList();
  list.addTail(2);
  list.addTail(3);
  for (let i = 6; list.size !== 100_000; i += 6) {
    for (let j = -1; j != 3; j += 2) {
      let isPrime = true;
      const value = i + j;
      for (let it = list.head; it !== null; it = it.next) {
        if (value % it.value === 0 && it.value * it.value <= value) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        list.addTail(value);
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
