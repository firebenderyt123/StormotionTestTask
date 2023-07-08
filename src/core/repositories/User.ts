import { UserInstanceType } from "../interfaces/User";
import Player from "./Player";

class User extends Player implements UserInstanceType {
  constructor(name: string) {
    super(name, false);
  }
}

export default User;
