import { access, mkdir } from "node:fs/promises";
import { constants as fsPromisesConstants } from "node:fs/promises";

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
