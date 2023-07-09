import { GameInstanceType } from "../interfaces/Game";
import { PlayerInstanceType } from "../interfaces/Player";

class Game implements GameInstanceType {
  n: number;
  m: number;
  totalMatches: number;
  matchesLeft: number;
  currentPlayerIndex: number;
  players: PlayerInstanceType[];

  constructor(n: number, m: number, players: PlayerInstanceType[]) {
    this.n = n;
    this.m = m;
    this.totalMatches = 2 * n + 1;
    this.matchesLeft = 2 * n + 1;
    this.currentPlayerIndex = 0;
    this.players = players;
  }

  reduceMatches(matches: number): void {
    this.matchesLeft -= matches;
  }

  nextPlayer(): void {
    this.currentPlayerIndex = +!this.currentPlayerIndex;
  }

  getCurrentPlayer(): PlayerInstanceType {
    return this.players[this.currentPlayerIndex];
  }

  isEnded(): boolean {
    return this.matchesLeft === 0;
  }

  getWinner(): PlayerInstanceType {
    return this.players[0].matches % 2 === 0
      ? this.players[0]
      : this.players[1];
  }

  static validateInitGameParams(n: number, m: number): string | true {
    if (m <= 1) return "'m' must be > 1";
    if (n <= 2) return "'n' must be > 2";
    if (n <= m) return "'n' must be > 'm'";
    return true;
  }
}

export default Game;
