import { PlayerInstanceType } from "../interfaces/Player";

class Player implements PlayerInstanceType {
  name: string;
  matches: number;
  isBot: boolean;

  constructor(name: string, isBot: boolean) {
    this.name = name;
    this.matches = 0;
    this.isBot = isBot;
  }

  takeMatches(matches: number): void {
    this.matches += matches;
  }
}

export default Player;
