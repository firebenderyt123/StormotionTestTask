import React from "react";
import { Box } from "@mui/material";
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
    <Box display="flex" justifyContent="center" my="2rem">
      <StartForm onSubmit={playOnClick} />
    </Box>
  ) : (
    <>
      <GameField game={game} onFinish={onGameEnded} />
      <WinnerModal
        title={`${game.getWinner().name} won!`}
        open={isGameEnded}
        playAgain={playAgainOnClick}
      />
    </>
  );
}

export default GameContainer;
