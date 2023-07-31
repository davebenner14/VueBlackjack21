<template>
  <div class="game-buttons">
    <button
      class="game-button start-button"
      @click="$emit('startGame')"
      v-if="!gameStarted"
    >
      Start Game
    </button>
    <div class="game-button-group">
      <button
        class="game-button hit-button"
        @click="$emit('hit')"
        v-if="gameStarted && !gameOver && betPlaced"
      >
        Hit
      </button>
      <button
        class="game-button stand-button"
        @click="$emit('stand')"
        v-if="gameStarted && !gameOver && betPlaced"
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
  gap: 10px; /* this will give some space between your buttons */
}

.game-button {
  border-radius: 50px; /* gives the buttons an oval shape */
  color: white; /* white text */
  padding: 10px 20px; /* button size, adjust as needed */
  font-size: 1.2em; /* font size, adjust as needed */
  border: none; /* removes default border */
  transition: 0.3s; /* smooth hover effect */
}

.hit-button {
  background-color: transparent; /* transparent background */
  border: 2px solid blue; /* blue border */
}

.hit-button:hover {
  background-color: blue; /* blue background on hover */
}

.stand-button {
  background-color: transparent; /* transparent background */
  border: 2px solid red; /* red border */
}

.stand-button:hover {
  background-color: red; /* red background on hover */
}

.next-button {
  background-color: transparent; /* transparent background */
  border: 2px solid green; /* green border */
}

.next-button:hover {
  background-color: green; /* green background on hover */
}

.restart-button {
  background-color: transparent; /* transparent background */
  border: 2px solid yellow; /* yellow border */
}

.restart-button:hover {
  background-color: yellow; /* yellow background on hover */
}
</style>
