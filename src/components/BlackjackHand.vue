<template>
  <div>
    <div class="total-container" v-if="isDealer">
      <h2><span class="emoji-dealer">🎩</span> {{ title }}</h2>
      <h3 class="total">{{ totalVisibleValue }}</h3>
    </div>
    <div class="total-container" v-else>
      <h2><span class="emoji-player">🤠</span> {{ title }}</h2>
      <h3 class="total">{{ totalValue }}</h3>
    </div>
    <ul class="hand">
      <li v-for="(card, index) in cards" :key="index">
        <PlayingCard
          :card="card"
          v-if="!isDealer || index !== 1 || dealerTurn"
        />
        <div class="card back" v-else></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { calculateHandValue } from "../utils/CardUtils";
import PlayingCard from "./PlayingCard.vue";

export default {
  components: {
    PlayingCard,
  },
  props: ["cards", "title", "isDealer", "dealerTurn"],
  computed: {
    totalValue() {
      return calculateHandValue(this.cards.map((card) => card.card || card));
    },
    totalVisibleValue() {
      const faceUpCards = this.cards.filter((card) => !card.faceDown);
      return calculateHandValue(faceUpCards.map((card) => card.card || card));
    },
  },
};
</script>

<style scoped>
.total-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hand {
  display: flex;
  justify-content: center;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.total {
  font-size: 60px;
  margin: 20px 0;
  line-height: 100px;
  width: 100px;
  height: 100px;
  background-color: rgb(53, 181, 113);
  color: white; /* Text color */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black; /* Circle border */
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; /* Text outline */
}

h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-dealer,
.emoji-player {
  font-size: 30px;
  margin-right: 10px;
}

.card.back {
  background: linear-gradient(160deg, #2952a3, #b04e0f);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 180px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;
  position: relative;
}

.card.back:before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    45deg,
    #fff0,
    #fff0 5px,
    #ffffff55 5px,
    #ffffff55 10px,
    #fff0 10px
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
