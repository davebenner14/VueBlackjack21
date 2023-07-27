import { ref } from "vue";

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

  // Game message
  const message = ref("");

  // Start game method
  function startGame() {
    gameStatus.value.started = true;
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

    // Update chips, game status and bet
    player.value.chips -= betAmount;
    gameStatus.value.ready = true;
    bet.value.placed = true;
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

  return {
    gameStatus,
    bet,
    player,
    dealer,
    message,
    startGame,
    placeBet,
    hit,
  };
}
