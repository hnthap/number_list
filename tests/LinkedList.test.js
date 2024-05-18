import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import LinkedList from "../src/LinkedList.js";

describe("linked list", () => {
  it("new list must be empty", () => {
    const list = new LinkedList();
    deepStrictEqual(list.size(), 0);
    deepStrictEqual(list.head(), null);
    deepStrictEqual(list.tail(), null);
  });

  it("add head", () => {
    const list = new LinkedList();
    let length = 1;
    for (const value of [100, "Earth", false, true, "🥶🥶🥶"]) {
      list.addHead(value);
      deepStrictEqual(list.size(), length);
      deepStrictEqual(list.head().value, value);
      length += 1;
    }
  });

  it("add tail", () => {
    const list = new LinkedList();
    let length = 1;
    for (const value of [12, "Hello, World!", true]) {
      list.addTail(value);
      deepStrictEqual(list.size(), length);
      deepStrictEqual(list.tail().value, value);
      length += 1;
    }
  });

  it("remove head", () => {
    const array = [100, "Earth", false, true, "🥶🥶🥶"];
    const list = LinkedList.fromArray(array);
    let i = 0;
    let length = list.size();
    while (list.size() !== 0) {
      deepStrictEqual(list.removeHead().value, array[i]);
      length -= 1;
      deepStrictEqual(list.size(), length);
      i += 1;
    }
    deepStrictEqual(list.removeHead(), null);
  });

  it("remove tail", () => {
    const array = [100, "Earth", false, true, "🥶🥶🥶"];
    const list = LinkedList.fromArray(array);
    let i = list.size() - 1;
    let length = list.size();
    while (list.size() !== 0) {
      deepStrictEqual(list.removeTail().value, array[i]);
      length -= 1;
      deepStrictEqual(list.size(), length);
      i -= 1;
    }
    deepStrictEqual(list.removeTail(), null);
  });

  it("get by index", () => {
    const values = [100, "Earth", false, true, "🥶🥶🥶"];
    const list = LinkedList.fromArray(values);
    deepStrictEqual(list.size(), values.length);
    for (let i = 0; i < values.length; i += 1) {
      deepStrictEqual(list.get(i), values[i]);
    }
  });

  it("from/to Array", () => {
    const array = [100, "Earth", false, true, "🥶🥶🥶"];
    const list = LinkedList.fromArray(array);
    const anotherArray = list.toArray();
    const anotherList = LinkedList.fromArray(anotherArray);
    deepStrictEqual(array.length, anotherArray.length);
    for (let i = 0; i < array.length; i += 1) {
      deepStrictEqual(array[i], anotherArray[i]);
    }
    deepStrictEqual(LinkedList.equals(list, anotherList), true);
  });

  it("has", () => {
    const array = [100, "Earth", false, true, "🥶🥶🥶"];
    const list = LinkedList.fromArray(array);
    for (const value of array) {
      deepStrictEqual(list.has(value), true);
    }
  });
});
