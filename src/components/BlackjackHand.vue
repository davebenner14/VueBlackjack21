<template>
  <div>
    <h2 v-if="isDealer">{{ title }} (Total: {{ totalVisibleValue }})</h2>
    <h2 v-else>{{ title }} (Total: {{ totalValue }})</h2>
    <ul>
      <li v-for="(card, index) in cards" :key="index">
        <span v-if="!isDealer || index !== 1 || !card.faceDown">
          {{ card.card ? card.card : card }}
        </span>
        <span v-else> Face Down </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { calculateHandValue } from "../utils/CardUtils";

export default {
  props: ["cards", "title", "isDealer"],
  computed: {
    totalValue() {
      return calculateHandValue(
        this.cards.map((card) => (card.card ? card.card : card))
      );
    },
    totalVisibleValue() {
      // If it's the dealer's hand and there is a face-down card, calculate the hand value with only the first card.
      if (this.isDealer && this.cards[1]?.faceDown) {
        // The card's actual value is stored in the `card` property of the dealer's hand object
        return calculateHandValue([
          this.cards[0].card ? this.cards[0].card : this.cards[0],
        ]);
      }
      // Otherwise, calculate the hand value with all cards.
      return calculateHandValue(
        this.cards.map((card) => (card.card ? card.card : card))
      );
    },
  },
};
</script>
