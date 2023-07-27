export function createDeck() {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  let deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

// Function to calculate the hand value
export function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else if (card.value === "A") {
      value += 11;
      aces += 1;
    } else {
      value += parseInt(card.value);
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
}

// Function to shuffle the deck
export function shuffleDeck(deck) {
  if (!deck || !Array.isArray(deck)) {
    console.error("Invalid deck provided for shuffling");
    return;
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

// Function to draw a card from the deck
export function drawCard(deck) {
  if (!deck || !Array.isArray(deck) || deck.length === 0) {
    console.error("Invalid deck provided for drawing a card");
    return null;
  }

  return deck.pop();
}
