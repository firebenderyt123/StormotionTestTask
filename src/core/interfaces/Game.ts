import { PlayerInstanceType } from "./Player";

interface GameConstructorType {
  new (): GameInstanceType;
  validateInitGameParams(n: number, m: number): string | true;
}

interface GameInstanceType {
  n: number;
  m: number;
  totalMatches: number;
  matchesLeft: number;
  currentPlayerIndex: number;
  players: PlayerInstanceType[];

  reduceMatches(matches: number): void;
  nextPlayer(): void;
  getCurrentPlayer(): PlayerInstanceType;
  isGameEnded(): boolean;
  getWinner(): PlayerInstanceType;
}

export { type GameConstructorType, type GameInstanceType };
