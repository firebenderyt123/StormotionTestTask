import Bot from "../repositories/Bot";
import Game from "../repositories/Game";
import User from "../repositories/Player";

function initGame(
  userName: string,
  n: number,
  m: number,
  isUserFirst: boolean
): Game | string {
  const validation = Game.validateInitGameParams(n, m);
  if (validation !== true) return validation;

  const players = isUserFirst
    ? [new User(userName), new Bot(n, m)]
    : [new Bot(n, m), new User(userName)];

  const game = new Game(n, m, players);
  return game;
}

function botTakeMatches(game: Game): void {
  const bot = game.getCurrentPlayer() as Bot;

  const nimSum = Bot.calculateNimSum(bot.heaps);

  if (nimSum === 0) {
    // No guaranteed winning strategy, choose randomly
    const chosenMatches = Math.floor(Math.random() * game.m) + 1;
    bot.takeMatches(chosenMatches);
    game.reduceMatches(chosenMatches);
  } else {
    const chosenHeap = Bot.chooseHeap(bot.heaps, nimSum);
    const chosenMatches = chosenHeap - (chosenHeap ^ nimSum);
    bot.heaps[chosenHeap] -= chosenMatches;
    bot.takeMatches(chosenMatches);
    game.reduceMatches(chosenMatches);
  }

  game.nextPlayer();
}

function userTakeMatches(game: Game, matches: number): void {
  const user = game.getCurrentPlayer() as User;
  user.takeMatches(matches);
  game.reduceMatches(matches);
  game.nextPlayer();
}

export { initGame, botTakeMatches, userTakeMatches };
