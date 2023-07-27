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
  // Convert the dealer's hand back to simple card objects
  let simpleDealerHand = dealerHand.map((card) =>
    card.card ? card.card : card
  );

  let dealerValue = calculateHandValue(simpleDealerHand);

  while (dealerValue < 17) {
    simpleDealerHand.push(deck.value.pop());
    dealerValue = calculateHandValue(simpleDealerHand);
  }

  let gameOver = dealerValue > 21;

  let message = "";
  if (gameOver) {
    message = "Dealer Busted!";
  }

  return {
    dealerHand: simpleDealerHand,
    message: message,
    gameOver: gameOver,
  };
}
