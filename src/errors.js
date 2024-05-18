export class UnimplementedError extends Error {
  constructor() {
    super("Unimplemented feature");
  }
}

export class UnreachableError extends Error {
  constructor() {
    super("Unreachable code");
  }
}
