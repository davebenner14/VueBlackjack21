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

<style></style>
