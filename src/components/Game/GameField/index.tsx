import React from "react";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Bot from "../../../core/repositories/Bot";
import Game from "../../../core/repositories/Game";
import User from "../../../core/repositories/User";
import { currentPlayer } from "../../../core/services/game";
import Match from "../Match";

type GameFieldProps = {
  bot: Bot;
  game: Game;
  user: User;
};

function GameField({ bot, game, user }: GameFieldProps): JSX.Element {
  const { n, m, matchesLeft } = game;
  console.log(game);

  const [selectedMatchesIndexes, setSelectedMatchesIndexes] = React.useState<
    number[]
  >([]);

  const matchOnClick = (element: JSX.Element) => {
    const num = Number(element.key);
    if (!selectedMatchesIndexes.includes(num)) {
      if (selectedMatchesIndexes.length < m)
        setSelectedMatchesIndexes((prev) => [...prev, num]);
    } else {
      setSelectedMatchesIndexes((prev) => prev.filter((elem) => elem !== num));
    }
  };

  const matches = Array.from({ length: matchesLeft }, (_, index) => {
    const elem = (
      <Match
        key={index}
        onClick={() => matchOnClick(elem)}
        isSelected={selectedMatchesIndexes.includes(index)}
      />
    );
    return elem;
  });

  return (
    <Container>
      <Typography>My matches: {user.matches}</Typography>
      <Typography>{currentPlayer(game).name}'s move</Typography>
      <MatchesList>{matches}</MatchesList>
      <Box>
        <Button disabled={!selectedMatchesIndexes.length}>Select</Button>
      </Box>
    </Container>
  );
}

const Container = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const MatchesList = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 5,
}));

export default GameField;
