import React from "react";
import GameField from "../../components/Game/GameField";
import StartForm from "../../components/Game/StartForm";
import { FormInputs } from "../../components/Game/StartForm/types";
import Bot from "../../core/repositories/Bot";
import Game from "../../core/repositories/Game";
import User from "../../core/repositories/User";
import { initGame } from "../../core/services/game";

function GameContainer(): JSX.Element {
  const [bot, setBot] = React.useState<Bot>();
  const [game, setGame] = React.useState<Game>();
  const [user, setUser] = React.useState<User>();

  const playOnClick = React.useCallback((data: FormInputs) => {
    const { name, n, m, isUserFirst } = data;

    const gameResp = initGame(name, n, m, isUserFirst);
    if (typeof gameResp !== "string") {
      if (isUserFirst) {
        setBot(gameResp.players[1] as Bot);
        setUser(gameResp.players[0] as User);
      } else {
        setBot(gameResp.players[0] as Bot);
        setUser(gameResp.players[1] as User);
      }

      setGame(gameResp);
    } else {
      console.error(gameResp);
    }
  }, []);

  return !bot || !game || !user ? (
    <StartForm onSubmit={playOnClick} />
  ) : (
    <GameField bot={bot} game={game} user={user} />
  );
}

export default GameContainer;
