<template>
  <div class="game-buttons">
    <button @click="$emit('startGame')" v-if="!gameStarted">Start Game</button>
    <button @click="$emit('hit')" v-if="gameStarted && !gameOver && betPlaced">
      Hit
    </button>
    <button
      @click="$emit('stand')"
      v-if="gameStarted && !gameOver && betPlaced"
    >
      Stand
    </button>
    <button @click="$emit('restartGame')" v-if="gameOver">Restart Game</button>
  </div>
</template>

<script>
export default {
  props: ["gameStarted", "gameOver", "betPlaced"],
};
</script>

<style></style>
