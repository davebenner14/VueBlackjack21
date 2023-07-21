<template>
  <div class="game-buttons">
    <button @click="startGame" v-if="!gameStarted">Start Game</button>
    <button @click="hit" v-if="gameStarted && !gameOver">Hit</button>
    <button @click="stand" v-if="gameStarted && !gameOver">Stand</button>
    <button @click="restartGame" v-if="gameOver">Restart Game</button>
  </div>
</template>

<script>
export default {
  props: [
    "gameStarted",
    "gameOver",
    "startGame",
    "hit",
    "stand",
    "restartGame",
  ],
};
</script>

<style>
/* Add your CSS styling here for the game buttons */
</style>
