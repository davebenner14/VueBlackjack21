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
      <!-- This component may need adjustment to receive new properties and events -->
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
          min="0"
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
import BlackjackHand from "./BlackjackHand.vue"; // Represents dealer's and player's hand
import BlackjackChips from "./BlackjackChips.vue"; // Represents chips state
import GameButtons from "./GameButtons.vue"; // Represents buttons to control the game
import GameStatus from "./GameStatus.vue"; // Represents game status messages

// Import game state
import GameState from "./GameState.js"; // Represents game state and actions

export default {
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
  },
  setup() {
    // Use game state
    const {
      gameStatus,
      bet,
      player,
      dealer,
      message,
      startGame,
      placeBet,
      hit, // Make sure to include 'hit' here
    } = GameState();

    function stand() {
      // TODO: Add game logic for 'stand'
      console.log("Player stands!");
    }

    function restartGame() {
      // TODO: Add game logic for 'restartGame'
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

<style>
/* Add your CSS styling here */
</style>
