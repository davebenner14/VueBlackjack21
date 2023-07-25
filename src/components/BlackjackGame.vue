<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Start Game Button -->
    <button @click="startGame" v-if="!gameStarted">Start Game</button>

    <!-- Game Content -->
    <div v-if="gameStarted">
      <!-- Dealer's Hand -->
      <BlackjackHand :cards="dealerHand" title="Dealer's Hand" />

      <!-- Player's Hand -->
      <BlackjackHand :cards="playerHand" title="Player's Hand" />

      <!-- Buttons and Game Status -->
      <GameButtons
        :gameStarted="gameStarted"
        :gameOver="gameOver"
        :betPlaced="betPlaced"
        @startGame="startGame"
        @hit="hit"
        @stand="stand"
        @restartGame="restartGame"
      />

      <!-- Game Status -->
      <GameStatus :message="message" />

      <!-- Chips -->
      <BlackjackChips :chips="chips" :bet="bet" />

      <!-- Betting Form -->
      <form @submit.prevent="placeBet(bet)">
        <input v-model.number="bet" type="number" min="0" max="chips" />
        <button type="submit" :disabled="!gameStarted || betPlaced">
          Place Bet
        </button>
      </form>

      <!-- Debug lines -->
      <p>Bet placed: {{ betPlaced }}</p>
      <p>Game started: {{ gameStarted }}</p>
    </div>
  </div>
</template>

<script>
// Import components
import BlackjackHand from "./BlackjackHand.vue";
import BlackjackChips from "./BlackjackChips.vue";
import GameButtons from "./GameButtons.vue";
import GameStatus from "./GameStatus.vue";

// Import game logic
import { blackjackGameLogic } from "./BlackjackGameLogic";

export default {
  data() {
    return {
      chips: 1000,
      bet: 0,
      message: "",
      gameStarted: false,
      gameReady: false,
      gameOver: false,
      betPlaced: false,
      dealerHand: [], // Add this line
      playerHand: [], // Add this line
    };
  },
  mixins: [blackjackGameLogic],
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
  },
  methods: {
    startGame() {
      // Game start logic should go here.
      this.gameStarted = true;
    },
    placeBet(betAmount) {
      // Make sure the game has started
      if (!this.gameStarted) {
        this.message = "Please start the game before placing a bet!";
        return;
      }

      // Make sure betAmount is less than or equal to chips
      if (betAmount > this.chips) {
        this.message = "Insufficient chips!";
        return;
      }

      this.chips -= betAmount; // Reduce chips by the bet amount
      this.gameReady = false; // Game is not ready for new round
      this.bet = 0; // Reset bet
      this.betPlaced = true;
    },
  },
};
</script>

<style>
/* Add your CSS styling here */
</style>
