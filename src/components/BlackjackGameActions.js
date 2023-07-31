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

      // If dealer busted, player wins. Double the bet and add to player's chips.
      if (result.message === "Dealer Busted!") {
        player.value.chips += gameState.bet.value.current * 2;
      }
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
      player.value.chips += gameState.bet.value.current * 2; // winnings + initial bet
    } else if (playerValue < dealerValue) {
      gameState.message.value = "Dealer Wins!";
    } else {
      gameState.message.value = "Push!";
      player.value.chips += gameState.bet.value.current; // return the bet to the player
    }

    gameState.bet.value.current = 0; // Reset the current bet after each round
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
    player.value.chips = 1000;
    nextHand();
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
