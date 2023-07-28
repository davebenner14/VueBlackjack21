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

    // Draw two cards for the player and dealer
    player.value.hand = [deck.drawCard(), deck.drawCard()];
    dealer.value.hand = [
      deck.drawCard(),
      { ...deck.drawCard(), faceDown: true },
    ];
  }

  function hit() {
    let result = hitPlayer(player.value.hand, deck);
    player.value.hand = result.playerHand;

    if (result.gameOver) {
      gameState.message.value = result.message;
      gameState.gameStatus.value.ended = true;
    }
  }

  function stand() {
    // Flip the dealer's face-down card
    gameState.dealerTurn.value = true;

    let result = standDealer(dealer.value.hand, deck);
    dealer.value.hand = result.dealerHand;

    if (result.gameOver) {
      gameState.message.value = result.message;
      gameState.gameStatus.value.ended = true;
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
  }

  function nextHand() {
    // Reset the game state to initial state
    gameState.gameStatus.value.started = false;
    gameState.gameStatus.value.ended = false;
    gameState.dealerTurn.value = false;
    gameState.bet.value.placed = false;
    player.value.hand = [];
    dealer.value.hand = [];

    // Clear the message from previous round
    gameState.message.value = "";

    // Start a new game
    startGame();
  }

  function restartGame() {
    player.value.chips = 1000; // Reset player's chips
    nextHand(); // Call nextHand function to reset other game states
  }

  return {
    startGame,
    placeBet,
    hit,
    stand,
    nextHand,
    restartGame,
  };
}
