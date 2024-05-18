import { UnimplementedError, UnreachableError } from "./errors.js";

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addHead(value) {
    throw new UnimplementedError();
  }

  addTail(value) {
    if (value === null) {
      throw new Error(`Invalid value: ${null}`);
    }
    if (this.size === 0) {
      this.head = { value, previous: null, next: null };
      this.tail = this.head;
    } else {
      this.tail.next = { value, previous: this.tail, next: null };
      this.tail = this.tail.next;
    }
    this.size += 1;
  }

  removeHead() {
    throw new UnimplementedError();
  }

  removeTail() {
    throw new UnimplementedError();
  }

  /**
   * 
   * @param {any} value 
   * @returns {boolean}
   */
  has(value) {
    for (let it = this.head; it != null; it = it.next) {
      if (it.value === value) return true;
    }
    return false;
  }

  /**
   *
   * @param {number} index
   * @returns
   */
  get(index) {
    if (
      typeof index !== "number" ||
      index < 0 ||
      index >= this.size ||
      !Number.isInteger(index)
    ) {
      throw new Error(
        `Invalid index ${index} in linked list of size ${this.size}`
      );
    }
    if (2 * index < this.size) {
      let i = 0;
      for (let it = this.head; it != null; it = it.next) {
        if (index === i) return it.value;
        i += 1;
      }
    } else {
      let i = this.size - 1;
      for (let it = this.tail; it != null; it = it.previous) {
        if (index === i) return it.value;
        i -= 1;
      }
    }
    throw new UnreachableError();
  }

  toArray() {
    const array = new Array(this.size);
    let i = 0;
    for (let it = this.head; it != null; it = it.next) {
      array[i] = it.value;
      i += 1;
    }
    return array;
  }

  /**
   * 
   * @param {LinkedList} list1 
   * @param {LinkedList} list2 
   * @returns {boolean}
   */
  static isEquals(list1, list2) {
    if (list1.size !== list2.size) return false;
    let it1 = list1.head;
    let it2 = list2.head;
    while (it1 != null) {
      if (it1.value !== it2.value) return false;
      it1 = it1.next;
      it2 = it2.next;
    }
    return true;
  }

  static fromArray(array) {
    const list = new LinkedList();
    for (const value of array) {
      list.addTail(value);
    }
    return list;
  }
}
