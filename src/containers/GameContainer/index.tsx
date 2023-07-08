import React from "react";
import GameField from "../../components/Game/GameField";
import StartForm from "../../components/Game/StartForm";
import { FormInputs } from "../../components/Game/StartForm/types";
import WinnerModal from "../../components/Game/WinnerModal";
import Game from "../../core/repositories/Game";
import { initGame } from "../../core/services/game";

function GameContainer(): JSX.Element {
  const [game, setGame] = React.useState<Game>();
  const [isGameEnded, setIsGameEnded] = React.useState<boolean>(false);

  const playOnClick = (data: FormInputs) => {
    const { name, n, m, isUserFirst } = data;

    const gameResp = initGame(name, n, m, isUserFirst);
    if (gameResp) setGame(gameResp);
  };

  const onGameEnded = () => {
    setIsGameEnded(true);
  };

  const playAgainOnClick = () => {
    setGame(undefined);
    setIsGameEnded(false);
  };

  return !game ? (
    <StartForm onSubmit={playOnClick} />
  ) : (
    <>
      <GameField game={game} onFinish={onGameEnded} />
      <WinnerModal
        title={`${game.getWinner().name} wins!`}
        open={isGameEnded}
        playAgain={playAgainOnClick}
      />
    </>
  );
}

export default GameContainer;
