import React from "react";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Game from "../../../core/repositories/Game";
import {
  botMakeDecision,
  isCurrentPlayerBot,
  playerTakeMatches,
} from "../../../core/services/game";
import { chooseRandomElements } from "../../../core/utils/game";
import Match from "../Match";
import Emoji from "../../ui/Emoji";

type GameFieldProps = {
  game: Game;
  onFinish(): void;
};

function GameField({ game, onFinish }: GameFieldProps): JSX.Element {
  const [userMatches, setUserMatches] = React.useState<number>(0);
  const [selectedMatchesIndexes, setSelectedMatchesIndexes] = React.useState<
    number[]
  >([]);
  const [matchesLeftIndexes, setMatchesLeftIndexes] = React.useState<number[]>(
    Array.from(Array(game.matchesLeft).keys())
  );

  React.useEffect(() => {
    // if bot moves first remove matches
    if (game.isEnded() || !isCurrentPlayerBot(game)) return;

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
      // check if game ended
      if (game.isEnded()) {
        onFinish();
      }
    }, 1500);
  }, [game, matchesLeftIndexes, onFinish]);

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
    // check if game ended
    if (game.isEnded()) {
      onFinish();
    }
  }, [game, onFinish, selectedMatchesIndexes]);

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
          <Emoji emoji="🔥" component="span" mr="5px" />
          Select
          <Emoji emoji="🔥" component="span" ml="5px" />
        </Button>
      ),
    [game, selectOnClick, selectedMatchesIndexes.length]
  );

  // current player
  const currentPlayer = (
    <>
      {game.getCurrentPlayer().name}'s move{" "}
      {isCurrentPlayerBot(game) ? (
        <Emoji emoji="🤖" component="span" />
      ) : (
        <Emoji emoji="😬" component="span" />
      )}
    </>
  );

  return (
    <Container>
      <Typography component="div" display="flex">
        My matches: {userMatches}
        {matchesSvg}
      </Typography>
      <Typography>{currentPlayer}</Typography>
      <MatchesList>{matches}</MatchesList>
      <Box>{buttonElement}</Box>
      <Typography mt="2rem">
        Matches left: {game.matchesLeft} / {game.totalMatches}
        <Emoji emoji="⚡" component="span" ml="5px" />
      </Typography>
    </Container>
  );
}

const Container = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0",
  gap: "1rem",
}));

const MatchesList = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 5,
  padding: "20px 0",
  minHeight: "55px",
}));

const matchesSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1.275rem"
    height="1.275rem"
    style={{ marginLeft: "5px" }}>
    <path
      fill="#fd3c4f"
      d="M31.824,16.328c-0.688,1.368-1.292,2.543-1.993,3.516c-0.48,0.664-1.528,0.248-1.42-0.565 c0.468-3.539-0.003-9.372-5.37-14.442c-1.259-1.189-3.233-1.083-4.461,0.139C11.42,12.101,0.806,17.933,1.003,29.198 c0.168,9.667,7.699,17.878,17.275,18.726C29.546,48.922,39,40.018,39,28.891c0-4.111-1.925-8.62-4.816-12.731 C33.588,15.313,32.29,15.403,31.824,16.328z"
    />
    <path
      fill="#fff"
      d="M31.824,16.328c-0.688,1.368-1.292,2.542-1.993,3.516c-0.48,0.664-1.528,0.248-1.42-0.565 c0.468-3.539-0.003-9.373-5.37-14.442c-1.259-1.189-3.233-1.083-4.461,0.139C11.42,12.101,0.806,17.934,1.003,29.198 C1.037,31.176,1.394,33.087,2,34.893c2.317-0.47,4.046-2.53,4.002-4.979c-0.111-6.389,4.879-10.688,10.657-15.665 c1.382-1.189,2.799-2.411,4.159-3.683c2.824,3.418,2.89,6.94,2.636,8.861c-0.361,2.737,1.564,5.25,4.302,5.612 c2.75,0.354,5.25-1.564,5.612-4.302c0.153-1.156,0.268-2.958,0.03-5.109C32.805,15.478,32.133,15.715,31.824,16.328z"
      opacity=".3"
    />
    <path
      fill="#ffce29"
      d="M28,39.487C28,44.777,23.987,48,19.036,48s-8.964-3.223-8.964-8.513 c0-4.415,4.285-9.339,6.93-11.956c1.123-1.112,2.944-1.112,4.067,0C23.715,30.148,28,35.072,28,39.487z"
    />
    <ellipse cx="27" cy="61" opacity=".3" rx="17" ry="3" />
    <path
      fill="#ffce29"
      d="M23.001,51.5c-0.7,0-1.396-0.292-1.891-0.862c-0.904-1.044-0.791-2.623,0.252-3.527l37.5-32.5 c1.045-0.904,2.621-0.792,3.527,0.252c0.904,1.044,0.791,2.623-0.252,3.527l-37.5,32.5C24.164,51.299,23.581,51.5,23.001,51.5z"
    />
    <ellipse
      cx="24.952"
      cy="47.952"
      fill="#9c34c2"
      rx="8.5"
      ry="7.139"
      transform="rotate(-45.001 24.951 47.952)"
    />
    <path
      d="M26.315,40.105c-0.709,1.796-0.341,3.919,1.112,5.371c0.699,0.7,0.432,2.594-0.962,3.988 c-1.395,1.394-3.289,1.657-3.988,0.962c-1.451-1.453-3.575-1.821-5.371-1.112c0.001,1.754,0.601,3.413,1.836,4.648 C21.729,56.75,26.681,56.319,30,53s3.75-8.271,0.962-11.059C29.728,40.707,28.068,40.106,26.315,40.105z"
      opacity=".15"
    />
    <path
      fill="#fff"
      d="M12.931,16.986c-0.42,0-0.837-0.175-1.133-0.516c-0.544-0.626-0.478-1.573,0.147-2.116l3.24-2.816 c0.626-0.546,1.573-0.477,2.116,0.147c0.544,0.626,0.478,1.573-0.147,2.116l-3.24,2.816C13.63,16.865,13.279,16.986,12.931,16.986z"
    />
  </svg>
);

export default GameField;
