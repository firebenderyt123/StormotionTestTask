import Bot from "../repositories/Bot";
import Game from "../repositories/Game";
import Player from "../repositories/Player";
import User from "../repositories/User";

function initGame(
  userName: string,
  n: number,
  m: number,
  isUserFirst: boolean
): Game | void {
  const validation = Game.validateInitGameParams(n, m);
  if (validation !== true) console.error(validation);

  const bot = new Bot(n, m);
  const user = new User(userName);

  const players = isUserFirst ? [user, bot] : [bot, user];

  const game = new Game(n, m, players);
  return game;
}

function botMakeDecision(game: Game): number {
  const bot = game.getCurrentPlayer() as Bot;

  // const nimSum = Bot.calculateNimSum(bot.heaps);

  // let chosenMatches;
  // if (nimSum === 0) {
  //   // No guaranteed winning strategy, choose randomly
  //   chosenMatches = Math.floor(Math.random() * game.m) + 1;
  // } else {
  //   const chosenHeap = Bot.chooseHeap(bot.heaps, nimSum);
  //   chosenMatches = chosenHeap - (chosenHeap ^ nimSum);
  //   bot.heaps[chosenHeap] -= chosenMatches;
  // }
  // return chosenMatches;

  const { n, m, matchesLeft, totalMatches } = game;

  // if AI starts the game
  if (matchesLeft === totalMatches) {
    if ((2 * n + 1) % (m + 1) === 0) {
      return m;
    } else {
      return (2 * n + 1) % (m + 1);
    }
  }

  // Check if it's the final moves
  if (matchesLeft <= m) {
    return matchesLeft;
  }

  // middle AI moves
  if (matchesLeft % 2 === 0) {
    return Math.min(m, matchesLeft - 1);
  } else {
    return Math.min(m, matchesLeft - 2);
  }
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

function currentPlayer(game: Game): Player {
  return game.getCurrentPlayer();
}

function isCurrentPlayerBot(game: Game): boolean {
  return game.getCurrentPlayer().isBot;
}

function isGameEnded(game: Game): boolean {
  return game.isGameEnded();
}

export {
  initGame,
  botMakeDecision,
  playerTakeMatches,
  currentPlayer,
  isCurrentPlayerBot,
  isGameEnded,
};
