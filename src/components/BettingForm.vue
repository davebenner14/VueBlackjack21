<template>
  <form @submit.prevent="placeBetHandler">
    <input
      v-model.number="localBet"
      type="number"
      min="1"
      :max="player.chips"
      :disabled="handInProgress"
    />
    <button
      type="submit"
      :disabled="!gameStatus.started || bet.placed || handInProgress"
    >
      Place Bet
    </button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: ["gameStatus", "bet", "player", "placeBet", "handInProgress"],
  setup(props, { emit }) {
    const localBet = ref(0);

    watch(localBet, (newValue) => {
      emit("updateBet", newValue);
    });

    const placeBetHandler = () => {
      props.placeBet(localBet.value);
    };

    return {
      ...props,
      localBet,
      placeBetHandler,
    };
  },
};
</script>

<style scoped>
form {
  font-size: 2em;
}

input[type="number"] {
  color: gold;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
