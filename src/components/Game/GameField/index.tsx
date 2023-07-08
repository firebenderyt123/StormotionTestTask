import React from "react";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Game from "../../../core/repositories/Game";
import {
  botMakeDecision,
  isCurrentPlayerBot,
  isGameEnded,
  playerTakeMatches,
} from "../../../core/services/game";
import { chooseRandomElements } from "../../../core/utils/game";
import Match from "../Match";

type GameFieldProps = {
  game: Game;
};

function GameField({ game }: GameFieldProps): JSX.Element {
  const [userMatches, setUserMatches] = React.useState<number>(0);
  const [selectedMatchesIndexes, setSelectedMatchesIndexes] = React.useState<
    number[]
  >([]);
  const [matchesLeftIndexes, setMatchesLeftIndexes] = React.useState<number[]>(
    Array.from(Array(game.matchesLeft).keys())
  );

  React.useEffect(() => {
    // if bot moves first remove matches
    console.log(game);
    if (isGameEnded(game) || !isCurrentPlayerBot(game)) return;

    const botTookMatches = botMakeDecision(game);
    const matchesIds = chooseRandomElements(matchesLeftIndexes, botTookMatches);
    setTimeout(() => {
      setSelectedMatchesIndexes(matchesIds);
    }, 1000);
    setTimeout(() => {
      if (!isCurrentPlayerBot(game)) return; // to prevent two steps in strict mode if bot starts
      playerTakeMatches(game, botTookMatches);
      setMatchesLeftIndexes((prev) =>
        prev.filter((elem) => !matchesIds.includes(elem))
      );
      setSelectedMatchesIndexes([]);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesLeftIndexes]);

  // on match select
  const matchOnClick = React.useCallback(
    (element: JSX.Element): void => {
      if (isCurrentPlayerBot(game)) return;

      const num = Number(element.key);
      if (!selectedMatchesIndexes.includes(num)) {
        if (selectedMatchesIndexes.length < game.m)
          setSelectedMatchesIndexes((prev) => [...prev, num]);
      } else {
        setSelectedMatchesIndexes((prev) =>
          prev.filter((elem) => elem !== num)
        );
      }
    },
    [game, selectedMatchesIndexes]
  );

  // on button click
  const selectOnClick = React.useCallback((): void => {
    if (isCurrentPlayerBot(game)) return;

    const newUserMatches = playerTakeMatches(
      game,
      selectedMatchesIndexes.length
    );
    setUserMatches(newUserMatches);
    setMatchesLeftIndexes((prev) =>
      prev.filter((elem) => !selectedMatchesIndexes.includes(elem))
    );
    setSelectedMatchesIndexes([]);
  }, [game, selectedMatchesIndexes]);

  // matches list
  const matches = React.useMemo(
    () =>
      matchesLeftIndexes.map((element: number) => {
        const elem = (
          <Match
            key={element}
            onClick={() => matchOnClick(elem)}
            isSelected={selectedMatchesIndexes.includes(element)}
          />
        );
        return elem;
      }),
    [matchOnClick, matchesLeftIndexes, selectedMatchesIndexes]
  );

  // button elem
  const buttonElement = React.useMemo(
    () =>
      !isCurrentPlayerBot(game) && (
        <Button
          disabled={!selectedMatchesIndexes.length}
          onClick={selectOnClick}>
          Select
        </Button>
      ),
    [game, selectOnClick, selectedMatchesIndexes.length]
  );

  return (
    <Container>
      <Typography>My matches: {userMatches}</Typography>
      <Typography>{game.getCurrentPlayer().name}'s move</Typography>
      <MatchesList>{matches}</MatchesList>
      <Box>{buttonElement}</Box>
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
