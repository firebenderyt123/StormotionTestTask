import { PlayerConstructorType, PlayerInstanceType } from "./Player";

interface BotConstructorType extends PlayerConstructorType {
  new (): BotInstanceType;
  calculateNimSum(heaps: number[]): number;
  chooseHeap(heaps: number[], nimSum: number): number;
}

interface BotInstanceType extends PlayerInstanceType {
  heaps: number[];
}

export { type BotConstructorType, type BotInstanceType };
