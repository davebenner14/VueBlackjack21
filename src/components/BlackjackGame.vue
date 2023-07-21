<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Dealer's Hand -->
    <BlackjackHand :cards="dealerHand" title="Dealer's Hand" />

    <!-- Player's Hand -->
    <BlackjackHand :cards="playerHand" title="Player's Hand" />

    <!-- Buttons and Game Status -->
    <div class="game-status">
      <button @click="startGame" v-if="!gameStarted">Start Game</button>
      <button @click="hit" v-if="gameStarted && !gameOver">Hit</button>
      <button @click="stand" v-if="gameStarted && !gameOver">Stand</button>
      <p v-if="message">{{ message }}</p>
    </div>

    <!-- Chips -->
    <BlackjackChips :chips="chips" :bet="bet" />

    <!-- Restart Game Button -->
    <button @click="restartGame" v-if="gameOver">Restart Game</button>
  </div>
</template>

<script>
import BlackjackHand from "./BlackjackHand.vue";
import BlackjackChips from "./BlackjackChips.vue";

export default {
  data() {
    return {
      dealerHand: [],
      playerHand: [],
      deck: [],
      chips: 1000,
      bet: 0,
      message: "",
      gameStarted: false,
      gameOver: false,
    };
  },
  methods: {
    initializeGame() {
      this.gameStarted = true;
      this.createAndShuffleDeck();
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.playerHand = [this.drawCard(), this.drawCard()];
    },
    hit() {
      this.playerHand.push(this.drawCard());
      if (this.calculateHandValue(this.playerHand) > 21) {
        this.message = "Player Busted!";
        this.gameOver = true;
      }
    },
    stand() {
      while (this.calculateHandValue(this.dealerHand) < 17) {
        this.dealerHand.push(this.drawCard());
      }
      this.gameOver =
        this.calculateHandValue(this.dealerHand) > 21 ? true : false;
      this.message = this.gameOver ? "Dealer Busted!" : "";
      if (!this.gameOver) {
        this.resolveGame();
      }
    },
    restartGame() {
      this.gameOver = false;
      this.gameStarted = false;
      this.message = "";
      this.dealerHand = [];
      this.playerHand = [];
    },
    createAndShuffleDeck() {
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const values = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
      ];
      this.deck = [];
      for (let suit of suits) {
        for (let value of values) {
          this.deck.push({ suit: suit, value: value });
        }
      }
      for (let i = this.deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    },
    drawCard() {
      return this.deck.pop();
    },
    calculateHandValue(hand) {
      let value = 0;
      let aces = 0;

      hand.forEach((card) => {
        if (["J", "Q", "K"].includes(card.value)) {
          value += 10;
        } else if (card.value === "A") {
          value += 11;
          aces += 1; // Count the number of aces
        } else {
          value += parseInt(card.value);
        }
      });

      // If value is over 21 and there are aces in the hand, start converting aces from 11 to 1
      while (value > 21 && aces > 0) {
        value -= 10; // Convert an Ace from 11 to 1
        aces -= 1; // We've used up one Ace
      }

      return value;
    },

    resolveGame() {
      // Logic for comparing playerHand and dealerHand to determine the winner
    },
  },

  components: {
    BlackjackHand,
    BlackjackChips,
  },
};
</script>

<style>
/* Add your CSS styling here to make the game visually appealing */
</style>
