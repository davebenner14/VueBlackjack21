export function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else if (card.value === "A") {
      value += 11;
      aces += 1; // Count the number of aces
    } else {
      value += parseInt(card.value);
    }
  });

  // If value is over 21 and there are aces in the hand, start converting aces from 11 to 1
  while (value > 21 && aces > 0) {
    value -= 10; // Convert an Ace from 11 to 1
    aces -= 1; // We've used up one Ace
  }

  return value;
}
