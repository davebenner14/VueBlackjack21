// Import necessary functions from manager and utility files
// DeckManager.js is responsible for deck-related functionalities
import { createAndShuffleDeck } from "./DeckManager";

// PlayerManager.js is responsible for player-related functionalities
import { hitPlayer } from "./PlayerManager";

// DealerManager.js is responsible for dealer-related functionalities
import { standDealer } from "./DealerManager";

// CardUtil.js is a utility file responsible for common card-related functionalities
import { calculateHandValue } from "./CardUtils";

export const blackjackGameLogic = {
  data() {
    return {
      // The current dealer's hand (DealerManager.js)
      dealerHand: [],

      // The current player's hand (PlayerManager.js)
      playerHand: [],

      // The current deck of cards (DeckManager.js)
      deck: [],

      // States to manage the flow of the game
      gameStarted: false,
      gameOver: false,
    };
  },
  methods: {
    // Start a new game (DeckManager.js and PlayerManager.js)
    startGame() {
      // Mark that the game has started
      this.gameStarted = true;

      // Create and shuffle a new deck of cards
      this.deck = createAndShuffleDeck();

      // Draw two cards for both dealer and player
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.playerHand = [this.drawCard(), this.drawCard()];
    },

    // Perform a hit action (PlayerManager.js)
    hit() {
      // Call the hitPlayer function from PlayerManager.js and update the player's hand and game state
      let result = hitPlayer(this.playerHand, this.drawCard);
      this.playerHand = result.playerHand;
      this.gameOver = result.gameOver;
    },

    // Perform a stand action (DealerManager.js)
    stand() {
      // Call the standDealer function from DealerManager.js and update the dealer's hand and game state
      let result = standDealer(this.dealerHand, this.drawCard);
      this.dealerHand = result.dealerHand;
      this.gameOver = result.gameOver;

      // If game is not over after dealer's turn, resolve the game
      if (!this.gameOver) {
        this.resolveGame();
      }
    },

    // Restart the game
    restartGame() {
      // Reset the game states and hands
      this.gameOver = false;
      this.gameStarted = false;
      this.dealerHand = [];
      this.playerHand = [];
    },

    // Draw a card from the deck (DeckManager.js)
    drawCard() {
      return this.deck.pop();
    },

    // Resolve the game and determine the winner (CardUtil.js)
    resolveGame() {
      // Calculate the hand values for both player and dealer
      let playerValue = calculateHandValue(this.playerHand);
      let dealerValue = calculateHandValue(this.dealerHand);

      // Compare the hand values and determine the winner
      if (playerValue > dealerValue) {
        this.message = "Player wins!";
      } else if (dealerValue > playerValue) {
        this.message = "Dealer wins!";
      } else {
        this.message = "It's a tie!";
      }

      // Mark the game as over
      this.gameOver = true;
    },
  },
};
