<template>
  <div class="game-buttons">
    <button
      class="game-button start-button"
      @click="$emit('startGame')"
      v-if="!gameStarted"
    >
      Start Game
    </button>
    <div
      class="game-button-group"
      :style="{ visibility: gameStarted ? 'visible' : 'hidden' }"
    >
      <button
        class="game-button hit-button"
        @click="$emit('hit')"
        :disabled="!gameStarted || gameOver || !betPlaced"
      >
        Hit
      </button>
      <button
        class="game-button stand-button"
        @click="$emit('stand')"
        :disabled="!gameStarted || gameOver || !betPlaced"
      >
        Stand
      </button>
    </div>
    <div class="game-button-group">
      <button
        class="game-button next-button"
        @click="$emit('nextHand')"
        v-if="gameOver && gameStarted"
      >
        Next Hand
      </button>
      <button
        class="game-button restart-button"
        @click="$emit('restartGame')"
        v-if="gameOver"
      >
        Restart Game
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["gameStarted", "gameOver", "betPlaced"],
  methods: {
    hit() {
      this.$emit("hit");
    },
    stand() {
      this.$emit("stand");
    },
    startGame() {
      this.$emit("startGame");
    },
    nextHand() {
      this.$emit("nextHand");
    },
    restartGame() {
      this.$emit("restartGame");
    },
  },
};
</script>
<style>
.game-button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.game-button {
  border-radius: 50px;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  border: none;
  transition: 0.3s;
}

.hit-button {
  background-color: transparent;
  border: 2px solid blue;
}

.hit-button:hover {
  background-color: blue;
}

.stand-button {
  background-color: transparent;
  border: 2px solid red;
}

.stand-button:hover {
  background-color: red;
}

.next-button {
  background-color: transparent;
  border: 2px solid green;
}

.next-button:hover {
  background-color: green;
}

.restart-button {
  background-color: transparent;
  border: 2px solid yellow;
}

.restart-button:hover {
  background-color: yellow;
}

.game-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
