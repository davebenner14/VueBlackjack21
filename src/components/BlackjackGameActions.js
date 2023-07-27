import { calculateHandValue } from "../utils/CardUtils.js";

export default function (gameState) {
  const {
    player,
    dealer,
    startGame: startGameOriginal,
    placeBet,
    hit: hitOriginal,
  } = gameState;

  function startGame() {
    startGameOriginal();
  }

  function hit() {
    hitOriginal();
  }

  function stand() {
    console.log("Player stands!");
    console.log(
      "Player's hand value: " + calculateHandValue(player.value.hand.value)
    );
    console.log(
      "Dealer's hand value: " + calculateHandValue(dealer.value.hand.value)
    );
  }

  function restartGame() {
    console.log("Game restarts!");
  }

  return {
    startGame,
    placeBet,
    hit,
    stand,
    restartGame,
  };
}
