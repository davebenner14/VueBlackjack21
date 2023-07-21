<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Dealer's Hand -->
    <BlackjackHand :cards="dealerHand" title="Dealer's Hand" />

    <!-- Player's Hand -->
    <BlackjackHand :cards="playerHand" title="Player's Hand" />

    <!-- Buttons and Game Status -->
    <GameButtons
      :gameStarted="gameStarted"
      :gameOver="gameOver"
      @startGame="startGame"
      @hit="hit"
      @stand="stand"
      @restartGame="restartGame"
    />

    <!-- Game Status -->
    <GameStatus :message="message" />

    <!-- Chips -->
    <BlackjackChips :chips="chips" :bet="bet" />
  </div>
</template>

<script>
import BlackjackHand from "./BlackjackHand.vue";
import BlackjackChips from "./BlackjackChips.vue";
import GameButtons from "./GameButtons.vue";
import GameStatus from "./GameStatus.vue";
import { createAndShuffleDeck } from "./DeckManager";
import { hitPlayer } from "./PlayerManager";
import { standDealer } from "./DealerManager";

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
    startGame() {
      this.gameStarted = true;
      this.deck = createAndShuffleDeck();
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.playerHand = [this.drawCard(), this.drawCard()];
    },
    hit() {
      let result = hitPlayer(this.playerHand, this.drawCard);
      this.playerHand = result.playerHand;
      this.message = result.message;
      this.gameOver = result.gameOver;
    },
    stand() {
      let result = standDealer(this.dealerHand, this.drawCard);
      this.dealerHand = result.dealerHand;
      this.message = result.message;
      this.gameOver = result.gameOver;
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
    drawCard() {
      return this.deck.pop();
    },
    resolveGame() {
      // Logic for comparing playerHand and dealerHand to determine the winner
    },
  },
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
  },
};
</script>

<style>
/* Add your CSS styling here to make the game visually appealing */
</style>
