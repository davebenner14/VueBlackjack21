<template>
  <div class="game-status">
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style>
/* Add your CSS styling here for the game status */
</style>
