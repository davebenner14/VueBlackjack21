<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Start Game Button -->
    <button @click="startGame" v-if="!gameStatus.started">Start Game</button>

    <!-- Game Content -->
    <div v-if="gameStatus.started" class="game-content">
      <!-- Dealer's Hand -->
      <BlackjackHand
        class="dealer-hand"
        :cards="dealer.hand"
        title="Dealer's Hand"
        :isDealer="true"
        :dealerTurn="dealerTurn"
      />

      <!-- Player's Section -->
      <div class="player-section">
        <div class="player-chips-bet">
          <!-- Player's Chips and Bet -->
          <BlackjackChips
            class="betting-elements"
            :chips="player.chips"
            :bet="bet.current"
          />

          <!-- Betting Form -->
          <BettingForm
            class="betting-elements"
            v-if="!bet.placed"
            :gameStatus="gameStatus"
            :bet="bet"
            :player="player"
            :placeBet="placeBet"
          />
        </div>

        <!-- Player's Hand -->
        <BlackjackHand
          class="player-hand"
          :cards="player.hand"
          title="Player's Hand"
        />

        <!-- Game Buttons -->
        <GameButtons
          class="player-buttons"
          :gameStarted="gameStatus.started"
          :gameOver="gameStatus.ended"
          :betPlaced="bet.placed"
          @startGame="startGame"
          @hit="hit"
          @stand="stand"
          @nextHand="nextHand"
          @restartGame="restartGame"
        />
      </div>

      <!-- Game Status -->
      <GameStatus :message="message" />
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

<style src="../styles/GameContainer.css"></style>
