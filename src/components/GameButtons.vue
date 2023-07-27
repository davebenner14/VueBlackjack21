<template>
  <div class="game-buttons">
    <button @click="startGame" v-if="!gameStarted">Start Game</button>

    <button @click="hit" v-if="gameStarted && !gameOver && betPlaced">
      Hit
    </button>
    <button @click="stand" v-if="gameStarted && !gameOver && betPlaced">
      Stand
    </button>
    <button @click="restartGame" v-if="gameOver">Restart Game</button>
  </div>
</template>

<script>
export default {
  props: [
    "gameStarted",
    "gameOver",
    "betPlaced",
    "startGame",
    "hit",
    "stand",
    "restartGame",
  ],
};
</script>

<style></style>
