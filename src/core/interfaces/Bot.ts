import { PlayerConstructorType, PlayerInstanceType } from "./Player";

interface BotConstructorType extends PlayerConstructorType {
  new (): BotInstanceType;
}

interface BotInstanceType extends PlayerInstanceType {}

export { type BotConstructorType, type BotInstanceType };
