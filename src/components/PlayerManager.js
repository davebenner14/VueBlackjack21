import { calculateHandValue } from "../utils/CardUtils";

export function hitPlayer(playerHand, drawCard) {
  playerHand.push(drawCard());
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
