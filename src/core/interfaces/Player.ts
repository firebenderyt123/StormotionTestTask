interface PlayerConstructorType {
  new (): PlayerInstanceType;
}

interface PlayerInstanceType {
  takeMatches(matches: number): void;
}

export { type PlayerConstructorType, type PlayerInstanceType };
