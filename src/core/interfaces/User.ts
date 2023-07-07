import { PlayerConstructorType, PlayerInstanceType } from "./Player";

interface UserConstructorType extends PlayerConstructorType {
  new (): UserInstanceType;
}

interface UserInstanceType extends PlayerInstanceType {}

export { type UserConstructorType, type UserInstanceType };
