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
      <form @submit.prevent="placeBet(bet.current)">
        <input
          v-model.number="bet.current"
          type="number"
          min="1"
          :max="player.chips"
        />
        <button type="submit" :disabled="!gameStatus.started || bet.placed">
          Place Bet
        </button>
      </form>

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

// Import game state
import GameState from "./GameState.js";

export default {
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
  },
  setup() {
    const {
      gameStatus,
      bet,
      player,
      dealer,
      message,
      startGame,
      placeBet, // Import placeBet from GameState
      hit,
    } = GameState();

    function stand() {
      console.log("Player stands!");
    }

    function restartGame() {
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
