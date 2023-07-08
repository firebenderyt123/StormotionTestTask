import React from "react";
import GameField from "../../components/Game/GameField";
import StartForm from "../../components/Game/StartForm";
import { FormInputs } from "../../components/Game/StartForm/types";
import Game from "../../core/repositories/Game";
import { initGame } from "../../core/services/game";

function GameContainer(): JSX.Element {
  const [game, setGame] = React.useState<Game>();

  const playOnClick = React.useCallback((data: FormInputs) => {
    const { name, n, m, isUserFirst } = data;

    const gameResp = initGame(name, n, m, isUserFirst);
    if (gameResp) setGame(gameResp);
  }, []);

  return !game ? (
    <StartForm onSubmit={playOnClick} />
  ) : (
    <GameField game={game} />
  );
}

export default GameContainer;
