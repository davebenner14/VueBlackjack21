<template>
  <div class="card" :class="card.suit">
    <div class="top-corner">
      <span class="value">{{ card.value }}</span>
      <span class="symbol">{{ getSymbol() }}</span>
    </div>
    <div class="symbol center-symbol" v-if="isPictureCard">
      {{ getSymbol() }}
    </div>
    <div class="bottom-corner">
      <span class="value">{{ card.value }}</span>
      <span class="symbol">{{ getSymbol() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"],
  methods: {
    getSymbol() {
      switch (this.card.suit) {
        case "hearts":
          return "♥";
        case "diamonds":
          return "♦";
        case "clubs":
          return "♣";
        case "spades":
          return "♠";
      }
    },
    isPictureCard() {
      return ["J", "Q", "K", "A"].includes(this.card.value);
    },
  },
};
</script>
<style scoped>
.card {
  width: 60px;
  height: 90px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
}

.value {
  font-size: 20px;
  color: black; /* Set the default color for the card numbers to black */
}

.symbol {
  font-size: 20px;
}

.center-symbol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.top-corner {
  position: absolute;
  top: 5px;
  left: 5px;
}

.bottom-corner {
  position: absolute;
  bottom: 5px;
  right: 5px;
  transform: rotate(180deg);
}

.hearts .value,
.diamonds .value {
  color: red; /* Set the color of the card numbers to red for hearts and diamonds */
}

.spades .value,
.clubs .value {
  color: black; /* Set the color of the card numbers to black for spades and clubs */
}

.hearts .symbol,
.diamonds .symbol {
  color: red; /* Set the color of the card symbol to red for hearts and diamonds */
}

.spades .symbol,
.clubs .symbol {
  color: black; /* Set the color of the card symbol to black for spades and clubs */
}

.hearts .bottom-corner,
.diamonds .bottom-corner {
  color: red; /* Set the color of the bottom corner to red for hearts and diamonds */
}

.spades .bottom-corner,
.clubs .bottom-corner {
  color: black; /* Set the color of the bottom corner to black for spades and clubs */
}
</style>
