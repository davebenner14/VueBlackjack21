import { ref } from "vue";
import { createDeck, shuffleDeck } from "../utils/CardUtils";

export default function GameState() {
  // Game status
  const gameStatus = ref({
    started: false,
    ready: false,
    over: false,
  });

  // Bet data
  const bet = ref({
    current: 0,
    placed: false,
  });

  // Player data
  const player = ref({
    chips: 1000,
    hand: [],
  });

  // Dealer data
  const dealer = ref({
    hand: [],
  });

  // Hand in progress
  const handInProgress = ref(false);

  // Card deck
  const deck = ref(shuffleDeck(createDeck())); // use createDeck function before shuffling

  // Game message
  const message = ref("");

  // Start game method
  function startGame() {
    gameStatus.value.started = true;
    handInProgress.value = true;
  }

  // Place bet method
  function placeBet(betAmount) {
    // Validate game started
    if (!validateGameStarted()) return;

    // Validate bet amount
    if (betAmount > player.value.chips) {
      message.value = "Insufficient chips!";
      return;
    }

    // Update chips, game status, bet, and handInProgress
    player.value.chips -= betAmount;
    gameStatus.value.ready = true;
    bet.value.current = betAmount; // Set the current bet
    bet.value.placed = true;
    handInProgress.value = true;

    // Deal the initial cards
    dealInitialCards();
  }

  // Function to deal initial cards
  function dealInitialCards() {
    player.value.hand.push(deck.value.pop(), deck.value.pop());
    dealer.value.hand.push(deck.value.pop(), {
      faceDown: true,
      card: deck.value.pop(),
    });
  }

  // Validate game started method
  function validateGameStarted() {
    if (!gameStatus.value.started) {
      message.value = "Please start the game before placing a bet!";
      return false;
    }
    return true;
  }

  // Hit function
  function hit() {
    // Game logic for when a player hits
    console.log("Player hit!");
  }

  // Function to decide the winner and update chips
  function endGame() {
    // Game logic to decide the winner
    const winner = "player"; // Assuming player is the winner. Replace with actual logic to determine winner.
    updateChips(winner);

    // Set game over and handInProgress to false
    gameStatus.value.over = true;
    handInProgress.value = false;
    bet.value.placed = false; // Reset bet placed
  }

  // Function to update chips based on game winner
  function updateChips(winner) {
    if (winner === "player") {
      player.value.chips += bet.value.current * 2;
    } else if (winner === "dealer") {
      player.value.chips -= bet.value.current;
    }
    bet.value.current = 0; // Reset the current bet
  }

  return {
    gameStatus,
    bet,
    player,
    dealer,
    deck,
    message,
    startGame,
    placeBet,
    hit,
    handInProgress,
    endGame,
  };
}
