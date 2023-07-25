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
      // The current dealer's hand
      dealerHand: [],

      // The current player's hand
      playerHand: [],

      // The current deck of cards
      deck: [],

      // States to manage the flow of the game
      gameStarted: false,
      gameOver: false,
      gameReady: false, // New state to manage if game is ready for a bet
      message: "", // The message to display to the player

      // Chips and bet
      chips: 1000,
      bet: 0,
    };
  },
  methods: {
    // Start a new game
    startGame() {
      // Mark that the game has started
      this.gameStarted = true;

      // Initialize the message to instruct the player to place a bet
      this.message = "Please place your bet to start playing.";

      // Game is not ready yet as bet is not placed
      this.gameReady = false;
    },
    // Place a bet
    placeBet(betAmount) {
      // Check if the game has started
      if (!this.gameStarted) {
        this.message = "Please start the game before placing a bet.";
        return;
      }

      // Ensure the player has enough chips to place the bet
      if (betAmount > this.chips) {
        this.message = "You don't have enough chips to place that bet.";
        return;
      }

      // Deduct the bet amount from the player's chips
      this.chips -= betAmount;

      // Update the current bet amount
      this.bet = betAmount;

      // Now the game is ready to play as bet is placed
      this.gameReady = true;

      // Create and shuffle a new deck of cards
      this.deck = createAndShuffleDeck();

      // Draw two cards for both dealer and player
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.playerHand = [this.drawCard(), this.drawCard()];

      // Check for blackjack
      this.checkForBlackjack();
    },
    // Perform a hit action
    hit() {
      // Check if the game is ready
      if (!this.gameReady) {
        this.message = "Please place a bet before hitting.";
        return;
      }

      // Call the hitPlayer function and update the player's hand and game state
      let result = hitPlayer(this.playerHand, this.drawCard);
      this.playerHand = result.playerHand;
      this.gameOver = result.gameOver;

      // If game is over after player's hit, resolve the game
      if (this.gameOver) {
        this.resolveGame();
      }
    },
    // Perform a stand action
    stand() {
      // Check if the game is ready
      if (!this.gameReady) {
        this.message = "Please place a bet before standing.";
        return;
      }

      // Call the standDealer function and update the dealer's hand and game state
      let result = standDealer(this.dealerHand, this.drawCard);
      this.dealerHand = result.dealerHand;
      this.gameOver = result.gameOver;

      // Resolve the game
      this.resolveGame();
    },
    // Restart the game
    restartGame() {
      // Reset the game states and hands
      this.gameOver = false;
      this.gameStarted = false;
      this.gameReady = false;
      this.dealerHand = [];
      this.playerHand = [];
      this.message = "";
      this.bet = 0;
    },
    // Draw a card from the deck
    drawCard() {
      return this.deck.pop();
    },
    // Resolve the game and determine the winner
    resolveGame() {
      // Calculate the hand values for both player and dealer
      let playerValue = calculateHandValue(this.playerHand);
      let dealerValue = calculateHandValue(this.dealerHand);

      // Compare the hand values and determine the winner
      if (playerValue > dealerValue) {
        this.message = "Player wins!";
        this.chips += this.bet * 2; // Double the player's bet
      } else if (dealerValue > playerValue) {
        this.message = "Dealer wins!";
      } else {
        this.message = "It's a push!";
        this.chips += this.bet; // Return the player's bet
      }

      // Mark the game as over
      this.gameOver = true;
    },
    // Check for blackjack at the start of the game
    checkForBlackjack() {
      let playerValue = calculateHandValue(this.playerHand);
      let dealerValue = calculateHandValue(this.dealerHand);

      if (playerValue === 21 && dealerValue !== 21) {
        this.message = "Player got a Blackjack!";
        this.chips += this.bet * 2.5; // Pay 3:2 for a blackjack
        this.gameOver = true;
      } else if (dealerValue === 21 && playerValue !== 21) {
        this.message = "Dealer got a Blackjack!";
        this.gameOver = true;
      } else if (dealerValue === 21 && playerValue === 21) {
        this.message = "It's a push, both player and dealer got a Blackjack!";
        this.chips += this.bet; // Return the player's bet
        this.gameOver = true;
      }
    },
  },
};
