import { UnreachableError } from "./errors.js";

/**
 * A node in a doubly linked list.
 * @typedef {object} LinkedListNode
 * @property {any} value
 * Node's value
 * @property {LinkedListNode | null} previous
 * Previous node of this node
 * @property {LinkedListNode | null} next
 * Next node of this node
 */

/**
 * Doubly linked list.
 */
export default class LinkedList {
  /** @type {LinkedListNode} */ #head = null;
  /** @type {LinkedListNode} */ #tail = null;
  #size = 0;

  /**
   * Returns this linked list's head with its value as a property if found,
   * otherwise null.
   * @returns {{ value: any } | null}
   */
  head() {
    if (this.#head === null) return null;
    return { value: this.#head.value };
  }

  /**
   * Returns this linked list's tail with its value as a property if found,
   * otherwise null.
   * @returns {{ value: any } | null}
   */
  tail() {
    if (this.#tail === null) return null;
    return { value: this.#tail.value };
  }

  /**
   * Returns this linked list's size
   * @returns {number}
   */
  size() {
    return this.#size;
  }

  /**
   * Add new node to this linked list's head.
   * @param {any} value
   */
  addHead(value) {
    if (value === null) {
      throw new Error(`Invalid value: ${null}`);
    }
    if (this.#size === 0) {
      this.#head = { value, previous: null, next: null };
      this.#tail = this.#head;
    } else {
      this.#head.previous = { value, previous: null, next: this.#head };
      this.#head = this.#head.previous;
    }
    this.#size += 1;
  }

  /**
   * Add new node to this linked list's tail.
   * @param {any} value
   */
  addTail(value) {
    if (value === null) {
      throw new Error(`Invalid value: ${null}`);
    }
    if (this.#size === 0) {
      this.#head = { value, previous: null, next: null };
      this.#tail = this.#head;
    } else {
      this.#tail.next = { value, previous: this.#tail, next: null };
      this.#tail = this.#tail.next;
    }
    this.#size += 1;
  }

  /**
   * Remove this linked list's head node.
   * @returns {{ value: any } | null}
   */
  removeHead() {
    if (this.#head === null) return null;
    const node = { value: this.#head.value };
    if (this.#head.next === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.previous = null;
    }
    this.#size -= 1;
    return node;
  }

  /**
   * Remove this linked list's tail node.
   * @returns {{ value: any } | null}
   */
  removeTail() {
    if (this.#tail === null) return null;
    const node = { value: this.#tail.value };
    if (this.#tail.previous === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.previous;
      this.#tail.next = null;
    }
    this.#size -= 1;
    return node;
  }

  /**
   * Check if the specified value exists in this linked list.
   * @param {any} value
   * @returns {boolean}
   */
  has(value) {
    for (let it = this.#head; it != null; it = it.next) {
      if (it.value === value) return true;
    }
    return false;
  }

  /**
   * Returns a value at specified index as if this linked list
   * was an array, with the element at head has index 0 and so on.
   *
   * If the index is invalid (not a number, or out of range, or not an
   * integer), throw an error.
   * @param {number} index
   * @returns
   */
  get(index) {
    if (
      typeof index !== "number" ||
      index < 0 ||
      index >= this.#size ||
      !Number.isInteger(index)
    ) {
      throw new Error(
        `Invalid index ${index} in linked list of size ${this.#size}`
      );
    }
    if (2 * index < this.#size) {
      let i = 0;
      for (let it = this.#head; it != null; it = it.next) {
        if (index === i) return it.value;
        i += 1;
      }
    } else {
      let i = this.#size - 1;
      for (let it = this.#tail; it != null; it = it.previous) {
        if (index === i) return it.value;
        i -= 1;
      }
    }
    throw new UnreachableError();
  }

  /**
   * Iterate over this linked list element-wise from head to tail.
   * @param {(
   *  value: any,
   *  index: number,
   *  stopHere: () => void
   * ) => void} callback
   */
  forEach(callback) {
    let i = 0;
    let stopNow = false;
    for (let it = this.#head; it !== null; it = it.next) {
      callback(it.value, i, () => (stopNow = true));
      if (stopNow) break;
      i += 1;
    }
  }

  /**
   * Converts this linked list, from head to tail, to an array.
   * @returns {any[]}
   */
  toArray() {
    const array = new Array(this.#size);
    let i = 0;
    for (let it = this.#head; it != null; it = it.next) {
      array[i] = it.value;
      i += 1;
    }
    return array;
  }

  /**
   * Check if two linked lists have the same elements, from head to tail.
   * @param {LinkedList} list1
   * @param {LinkedList} list2
   * @returns {boolean}
   */
  static equals(list1, list2) {
    if (list1.#size !== list2.#size) return false;
    let it1 = list1.#head;
    let it2 = list2.#head;
    while (it1 != null) {
      if (it1.value !== it2.value) return false;
      it1 = it1.next;
      it2 = it2.next;
    }
    return true;
  }

  /**
   * Initializes new linked list from specified array's values.
   * @param {any[]} array
   * @returns {LinkedList}
   */
  static fromArray(array) {
    const list = new LinkedList();
    for (const value of array) {
      list.addTail(value);
    }
    return list;
  }
}
