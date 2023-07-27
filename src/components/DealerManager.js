import { calculateHandValue } from "../utils/CardUtils";

export function standDealer(dealerHand, drawCard) {
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }
  if (calculateHandValue(dealerHand) > 21) {
    return {
      dealerHand: dealerHand,
      message: "Dealer Busted!",
      gameOver: true,
    };
  } else {
    return {
      dealerHand: dealerHand,
      message: "",
      gameOver: false,
    };
  }
}
