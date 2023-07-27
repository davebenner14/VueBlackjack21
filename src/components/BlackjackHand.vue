<template>
  <div>
    <h2 v-if="isDealer">{{ title }} (Total: {{ totalVisibleValue }})</h2>
    <h2 v-else>{{ title }} (Total: {{ totalValue }})</h2>
    <ul>
      <li v-for="(card, index) in cards" :key="index">
        <span v-if="!isDealer || index !== 1 || dealerTurn">
          {{ card }}
        </span>
        <span v-else> Face Down </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { calculateHandValue } from "../utils/CardUtils";

export default {
  props: ["cards", "title", "isDealer", "dealerTurn"],
  computed: {
    totalValue() {
      return calculateHandValue(this.cards.map((card) => card.card || card));
    },
    totalVisibleValue() {
      // Include only face-up cards in the total, regardless of the turn.
      const faceUpCards = this.cards.filter((card) => !card.faceDown);
      return calculateHandValue(faceUpCards.map((card) => card.card || card));
    },
  },
};
</script>
