import Bot from "../repositories/Bot";
import Game from "../repositories/Game";
import User from "../repositories/User";

function initGame(
  userName: string,
  n: number,
  m: number,
  isUserFirst: boolean
): Game | void {
  const validation = Game.validateInitGameParams(n, m);
  if (validation !== true) console.error(validation);

  const bot = new Bot();
  const user = new User(userName);

  const players = isUserFirst ? [user, bot] : [bot, user];

  const game = new Game(n, m, players);
  return game;
}

function botMakeDecision(game: Game): number {
  const bot = game.getCurrentPlayer();
  const { m, matchesLeft } = game;

  // Check if it's the final moves
  if (matchesLeft <= m) {
    return (bot.matches + matchesLeft) % 2 === 0 || matchesLeft === 1
      ? matchesLeft
      : matchesLeft - 1;
  }

  // middle AI moves
  const optimalMatches = matchesLeft % (m + 1);
  return optimalMatches === 0 ? m : optimalMatches;
}

function playerTakeMatches(game: Game, matches: number): number {
  if (matches > game.m || matches < 1)
    console.error("Invalid matches count:", matches);

  const player = game.getCurrentPlayer();
  player.takeMatches(matches);
  game.reduceMatches(matches);
  game.nextPlayer();
  return player.matches;
}

function isCurrentPlayerBot(game: Game): boolean {
  return game.getCurrentPlayer().isBot;
}

export { initGame, botMakeDecision, playerTakeMatches, isCurrentPlayerBot };
