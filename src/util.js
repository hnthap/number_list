import { access, constants as fsPromisesConstants, mkdir } from "node:fs/promises";
import LinkedList from "./LinkedList.js";

/**
 * @param {number} n 
 * @returns {LinkedList}
 */
export function getFirstNPrimeNumbers(n) {
  const list = new LinkedList();
  if (n < 0) {
    throw new Error(
      `Invalid argument: n must be a non-negative integer, got a negative number.`
    );
  }
  if (!Number.isInteger(n)) {
    throw new Error(
      `Invalid argument: n must be a non-negative integer, got n not as an integer.`
    );
  }
  if (n > 0) list.addTail(2);
  if (n > 1) list.addTail(3);
  let okay = true;
  for (let i = 6; okay; i += 6) {
    for (let j = -1; j != 3 && okay; j += 2) {
      let isPrime = true;
      const v = i + j;
      const sqrtV = Math.ceil(Math.sqrt(v));
      list.forEach((value, _, stopHere) => {
        if (v % value === 0 && value <= sqrtV) {
          isPrime = false;
          stopHere();
        }
      });
      if (isPrime) {
        list.addTail(v);
        if (list.size() === n) okay = false;
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
