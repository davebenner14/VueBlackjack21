<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Start Game Button -->
    <button @click="startGame" v-if="!gameStatus.started">Start Game</button>

    <!-- Game Content -->
    <div v-if="gameStatus.started">
      <!-- Dealer's Hand -->
      <BlackjackHand :cards="dealer.hand" title="Dealer's Hand" />

      <!-- Player's Hand -->
      <BlackjackHand :cards="player.hand" title="Player's Hand" />

      <!-- Buttons and Game Status -->
      <GameButtons
        :gameStatus="gameStatus"
        :betPlaced="bet.placed"
        @startGame="startGame"
        @hit="hit"
        @stand="stand"
        @restartGame="restartGame"
      />

      <!-- Game Status -->
      <GameStatus :message="message" />

      <!-- Chips -->
      <BlackjackChips :chips="player.chips" :bet="bet.current" />

      <!-- Betting Form -->
      <BettingForm
        :gameStatus="gameStatus"
        :bet="bet"
        :player="player"
        :placeBet="placeBet"
      />

      <!-- Debug lines -->
      <p>Bet placed: {{ bet.placed }}</p>
      <p>Game started: {{ gameStatus.started }}</p>
    </div>
  </div>
</template>

<script>
// Import components
import BlackjackHand from "./BlackjackHand.vue";
import BlackjackChips from "./BlackjackChips.vue";
import GameButtons from "./GameButtons.vue";
import GameStatus from "./GameStatus.vue";
import BettingForm from "./BettingForm.vue"; // New import

// Import game state
import GameState from "./GameState.js";

export default {
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
    BettingForm, // New component
  },
  setup() {
    const {
      gameStatus,
      bet,
      player,
      dealer,
      message,
      startGame, // Defined in GameState
      placeBet, // Defined in GameState
      hit, // Defined in GameState
    } = GameState();

    function stand() {
      // Defined here
      console.log("Player stands!");
    }

    function restartGame() {
      // Defined here
      console.log("Game restarts!");
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
      stand,
      restartGame,
    };
  },
};
</script>

<style></style>
