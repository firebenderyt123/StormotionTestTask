interface PlayerConstructorType {
  new (): PlayerInstanceType;
}

interface PlayerInstanceType {
  name: string;
  matches: number;
  isBot: boolean;
  takeMatches(matches: number): void;
}

export { type PlayerConstructorType, type PlayerInstanceType };
