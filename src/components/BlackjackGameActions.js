import { calculateHandValue } from "../utils/CardUtils.js";
import { hitPlayer, standDealer } from "./GameplayActions";

export default function (gameState) {
  const {
    player,
    dealer,
    startGame: startGameOriginal,
    placeBet,
    deck,
  } = gameState;

  function startGame() {
    startGameOriginal();
  }

  function hit() {
    let result = hitPlayer(player.value.hand, deck);
    player.value.hand = result.playerHand;

    if (result.gameOver) {
      gameState.message.value = result.message;
      gameState.gameStatus.value.ended = true;
      gameState.gameStatus.value.started = false;
    }
  }

  function stand() {
    let result = standDealer(dealer.value.hand, deck);
    dealer.value.hand = result.dealerHand;

    if (result.gameOver) {
      gameState.message.value = result.message;
      gameState.gameStatus.value.ended = true;
      gameState.gameStatus.value.started = false;
    } else {
      // Compare player and dealer hand
      compareHands();
    }
  }

  function compareHands() {
    let playerValue = calculateHandValue(player.value.hand);
    let dealerValue = calculateHandValue(dealer.value.hand);

    if (playerValue > dealerValue || dealerValue > 21) {
      gameState.message.value = "Player Wins!";
      player.value.chips += gameState.bet.value.current * 2;
    } else if (playerValue < dealerValue) {
      gameState.message.value = "Dealer Wins!";
    } else {
      gameState.message.value = "Push!";
      player.value.chips += gameState.bet.value.current; // Return the bet to the player
    }

    gameState.gameStatus.value.ended = true;
    gameState.gameStatus.value.started = false;
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
