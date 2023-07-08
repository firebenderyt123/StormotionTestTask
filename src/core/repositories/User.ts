import { UserInstanceType } from "../interfaces/User";
import Player from "./Player";

class User extends Player implements UserInstanceType {}

export default User;
