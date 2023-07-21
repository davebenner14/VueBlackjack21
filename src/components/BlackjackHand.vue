<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="hand">
      <div v-for="card in cards" :key="card">
        {{ card.suit }} - {{ card.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: Array,
    title: String,
  },
};
</script>

<style>
/* Add CSS styling for the BlackjackHand component here */
</style>
