import { BotInstanceType } from "../interfaces/Bot";
import Player from "./Player";

class Bot extends Player implements BotInstanceType {
  heaps;

  constructor(n: number, m: number, name: string = "Bot") {
    super(name);
    this.heaps = new Array(n).fill(2 * n + 1) as number[];
  }

  static calculateNimSum(heaps: number[]): number {
    let nimSum = 0;
    for (let heap of heaps) {
      nimSum ^= heap;
    }
    return nimSum;
  }

  static chooseHeap(heaps: number[], nimSum: number): number {
    for (let heap of heaps) {
      const targetSize = heap ^ nimSum;
      if (targetSize < heap) {
        return heap;
      }
    }
    return heaps[0]; // Choose the first heap if no suitable heap is found
  }
}

export default Bot;
