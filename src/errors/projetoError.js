class CannotFindProjectError extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.name = 'CannotFindProjectError';
  }
}

module.exports = { CannotFindProjectError };
