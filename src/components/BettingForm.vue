<template>
  <form @submit.prevent="placeBet(bet.current)">
    <input
      v-model.number="bet.current"
      type="number"
      min="1"
      :max="player.chips"
    />
    <button type="submit" :disabled="!gameStatus.started || bet.placed">
      Place Bet
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["gameStatus", "bet", "player", "placeBet"],
  setup(props) {
    const bet = ref(props.bet);
    return {
      bet,
      placeBet: props.placeBet,
      gameStatus: props.gameStatus,
      player: props.player,
    };
  },
};
</script>

<style scoped></style>
