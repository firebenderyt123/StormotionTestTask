interface PlayerConstructorType {
  new (): PlayerInstanceType;
}

interface PlayerInstanceType {
  name: string;
  matches: number;
  takeMatches(matches: number): void;
}

export { type PlayerConstructorType, type PlayerInstanceType };
