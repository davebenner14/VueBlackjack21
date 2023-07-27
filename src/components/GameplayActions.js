import { calculateHandValue } from "../utils/CardUtils";

export function hitPlayer(playerHand, deck) {
  playerHand.push(deck.value.pop());
  if (calculateHandValue(playerHand) > 21) {
    return {
      playerHand: playerHand,
      message: "Player Busted!",
      gameOver: true,
    };
  } else {
    return {
      playerHand: playerHand,
      message: "",
      gameOver: false,
    };
  }
}

export function standDealer(dealerHand, deck) {
  let dealerValue = calculateHandValue(dealerHand);

  while (dealerValue < 17) {
    dealerHand.push(deck.value.pop());
    dealerValue = calculateHandValue(dealerHand);
  }

  let gameOver = dealerValue > 21;

  let message = "";
  if (gameOver) {
    message = "Dealer Busted!";
  }

  return {
    dealerHand: dealerHand,
    message: message,
    gameOver: gameOver,
  };
}
