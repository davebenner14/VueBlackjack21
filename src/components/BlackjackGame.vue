<template>
  <div class="game-container">
    <!-- Game Title -->
    <h1 class="game-title">Vue Blackjack 21</h1>

    <!-- Dealer's Hand -->
    <!-- This uses the BlackjackHand.vue component to display the dealer's hand -->
    <BlackjackHand :cards="dealerHand" title="Dealer's Hand" />

    <!-- Player's Hand -->
    <!-- This uses the BlackjackHand.vue component to display the player's hand -->
    <BlackjackHand :cards="playerHand" title="Player's Hand" />

    <!-- Buttons and Game Status -->
    <!-- GameButtons.vue is used to display the buttons for game actions (start, hit, stand, restart) -->
    <GameButtons
      :gameStarted="gameStarted"
      :gameOver="gameOver"
      @startGame="startGame"
      @hit="hit"
      @stand="stand"
      @restartGame="restartGame"
    />

    <!-- Game Status -->
    <!-- GameStatus.vue is used to display the current status of the game -->
    <GameStatus :message="message" />

    <!-- Chips -->
    <!-- BlackjackChips.vue is used to display the current number of chips and the current bet -->
    <BlackjackChips :chips="chips" :bet="bet" />
  </div>
</template>

<script>
// Import components
import BlackjackHand from "./BlackjackHand.vue"; // A component for displaying a hand of cards
import BlackjackChips from "./BlackjackChips.vue"; // A component for displaying the player's chips and current bet
import GameButtons from "./GameButtons.vue"; // A component for displaying the game's action buttons
import GameStatus from "./GameStatus.vue"; // A component for displaying the game's status

// Import game logic
import { blackjackGameLogic } from "./BlackjackGameLogic"; // The logic for the blackjack game

export default {
  data() {
    return {
      chips: 1000, // The player's current number of chips
      bet: 0, // The current bet
      message: "", // The message to display to the player
    };
  },
  mixins: [blackjackGameLogic], // Include the blackjack game logic
  components: {
    // Declare the components used in the template
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
