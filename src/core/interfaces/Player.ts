interface PlayerConstructorType {
  new (): PlayerInstanceType;
}

interface PlayerInstanceType {
  name: string;
  isBot: boolean;
  matches: number;
  takeMatches(matches: number): void;
}

export { type PlayerConstructorType, type PlayerInstanceType };
