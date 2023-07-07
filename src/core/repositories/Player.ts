import { PlayerInstanceType } from "../interfaces/Player";

class Player implements PlayerInstanceType {
  name: string;
  isBot: boolean;
  matches: number;

  constructor(name: string, isBot: boolean = false) {
    this.name = name;
    this.isBot = isBot;
    this.matches = 0;
  }

  takeMatches(matches: number): void {
    matches += matches;
  }
}

export default Player;
