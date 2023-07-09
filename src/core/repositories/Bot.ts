import { BotInstanceType } from "../interfaces/Bot";
import Player from "./Player";

class Bot extends Player implements BotInstanceType {
  constructor(name: string = "Bot") {
    super(name, true);
  }
}

export default Bot;
