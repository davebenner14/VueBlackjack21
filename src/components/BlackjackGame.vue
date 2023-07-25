<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Dealer's Hand -->
    <BlackjackHand :cards="dealerHand" title="Dealer's Hand" />

    <!-- Player's Hand -->
    <BlackjackHand :cards="playerHand" title="Player's Hand" />

    <!-- Buttons and Game Status -->
    <GameButtons
      :gameStarted="gameStarted"
      :gameOver="gameOver"
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
      <button type="submit">Place Bet</button>
    </form>
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
    placeBet(betAmount) {
      this.placeBet(betAmount);
    },
  },
};
</script>

<style>
/* Add your CSS styling here */
</style>
