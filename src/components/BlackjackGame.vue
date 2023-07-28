<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Start Game Button -->
    <button @click="startGame" v-if="!gameStatus.started">Start Game</button>

    <!-- Game Content -->
    <div v-if="gameStatus.started">
      <!-- Dealer's Hand -->
      <BlackjackHand
        :cards="dealer.hand"
        title="Dealer's Hand"
        :isDealer="true"
        :dealerTurn="dealerTurn"
      />

      <!-- Player's Hand -->
      <BlackjackHand :cards="player.hand" title="Player's Hand" />

      <!-- Buttons and Game Status -->
      <GameButtons
        :gameStarted="gameStatus.started"
        :gameOver="gameStatus.ended"
        :betPlaced="bet.placed"
        @startGame="startGame"
        @hit="hit"
        @stand="stand"
        @nextHand="nextHand"
        @restartGame="restartGame"
      />

      <!-- Game Status -->
      <GameStatus :message="message" />

      <!-- Chips -->
      <BlackjackChips :chips="player.chips" :bet="bet.current" />

      <!-- Betting Form -->
      <BettingForm
        v-if="!bet.placed"
        :gameStatus="gameStatus"
        :bet="bet"
        :player="player"
        :placeBet="placeBet"
      />
    </div>
  </div>
</template>

<script>
import BlackjackHand from "./BlackjackHand.vue";
import BlackjackChips from "./BlackjackChips.vue";
import GameButtons from "./GameButtons.vue";
import GameStatus from "./GameStatus.vue";
import BettingForm from "./BettingForm.vue";
import GameState from "../helpers/GameState";
import gameActions from "./BlackjackGameActions.js";

export default {
  name: "BlackjackGame",
  components: {
    BlackjackHand,
    BlackjackChips,
    GameButtons,
    GameStatus,
    BettingForm,
  },
  setup() {
    const gameState = GameState();
    const gameFunctions = gameActions(gameState);

    return {
      ...gameState,
      ...gameFunctions,
    };
  },
};
</script>

<style></style>
