interface GameConstructorType {
  new (): GameInstanceType;
}

interface GameInstanceType {
  takeMatches(matches: number): void;
}

export { type GameConstructorType, type GameInstanceType };
