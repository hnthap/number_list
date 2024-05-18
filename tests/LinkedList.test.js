import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { LinkedList } from "../src/LinkedList.js";

describe("linked list", () => {
  it("new list must be empty", () => {
    const list = new LinkedList();
    deepStrictEqual(list.size(), 0);
  });

  it("add tail", () => {
    const list = new LinkedList();
    let length = 1;
    for (const value of [12, "Hello, World!", true]) {
      list.addTail(value);
      
      deepStrictEqual(list.size(), length);
      deepStrictEqual(list.get(list.size() - 1).value, value);
      length += 1;
    }
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
      deepStrictEqual(array[i], anotherArray[i])
    }
    deepStrictEqual(LinkedList.isEquals(list, anotherList), true);
  })
});