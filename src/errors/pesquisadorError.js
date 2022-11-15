class ResearcherAlreadyExists extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.name = 'ResearcherAlreadyExists';
  }
}

class CannotFindResearcherError extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.name = 'CannotFindResearcherError';
  }
}
module.exports = { ResearcherAlreadyExists, CannotFindResearcherError };
