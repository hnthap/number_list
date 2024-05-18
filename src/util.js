import { access, mkdir } from "node:fs/promises";
import { constants as fsPromisesConstants } from "node:fs/promises";
import LinkedList from "./LinkedList.js";

/**
 * @param {number} n 
 * @returns {LinkedList}
 */
export function getFirstNPrimeNumbers(n) {
  const list = new LinkedList();
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) {
    return list;
  }
  if (n > 0) list.addTail(2);
  if (n > 1) list.addTail(3);
  for (let i = 6; list.size() !== n; i += 6) {
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
  return list;
}

/**
 *
 * @param {import("node:fs").PathLike} path
 */
export async function doesDirectoryExist(path) {
  try {
    await access(path, fsPromisesConstants.O_DIRECTORY);
    return true;
  } catch {
    return false;
  }
}

/**
 *
 * @param {import("node:fs").PathLike} path
 */
export async function mkdirIfNotExists(path) {
  if (!await doesDirectoryExist(path)) {
    await mkdir(path, { recursive: true });
  }
  await access(path, fsPromisesConstants.O_DIRECTORY);
}
