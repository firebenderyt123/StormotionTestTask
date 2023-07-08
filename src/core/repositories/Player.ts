import { PlayerInstanceType } from "../interfaces/Player";

class Player implements PlayerInstanceType {
  name: string;
  matches: number;

  constructor(name: string) {
    this.name = name;
    this.matches = 0;
  }

  takeMatches(matches: number): void {
    matches += matches;
  }
}

export default Player;
