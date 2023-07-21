<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Dealer's Hand -->
    <Hand :cards="dealerHand" title="Dealer's Hand" />

    <!-- Player's Hand -->
    <Hand :cards="playerHand" title="Player's Hand" />

    <!-- Buttons and Game Status -->
    <div class="game-status">
      <button @click="startGame" v-if="!gameStarted">Start Game</button>
      <button @click="hit" v-if="gameStarted && !gameOver">Hit</button>
      <button @click="stand" v-if="gameStarted && !gameOver">Stand</button>
      <p v-if="message">{{ message }}</p>
    </div>

    <!-- Chips -->
    <Chips :chips="chips" :bet="bet" />

    <!-- Restart Game Button -->
    <button @click="restartGame" v-if="gameOver">Restart Game</button>
  </div>
</template>

<script>
import Hand from "./Hand.vue"; // Hand component handles the display of player's and dealer's hands
import Chips from "./Chips.vue"; // Chips component handles the display and management of chips

export default {
  data() {
    return {
      dealerHand: [],
      playerHand: [],
      deck: [],
      chips: 1000,
      bet: 0,
      message: "",
      gameStarted: false,
      gameOver: false,
    };
  },
  methods: {
    // Game logic methods (startGame, hit, stand, etc.)
  },
  components: {
    Hand,
    Chips,
  },
};
</script>

<style>
/* Add your CSS styling here to make the game visually appealing */
</style>
