import { createAndShuffleDeck } from "./DeckManager";
import { hitPlayer } from "./PlayerManager";
import { standDealer } from "./DealerManager";
import { calculateHandValue } from "../utils/CardUtils";
import { GameInitialization } from "./GameInitialization";

export const blackjackGameLogic = {
  data() {
    return {
      dealerHand: [],
      playerHand: [],
      deck: [],
      gameStarted: false,
      gameOver: false,
      gameReady: false,
      message: "",
      chips: 1000,
      bet: 0,
    };
  },
  methods: {
    initGame: GameInitialization.methods.initGame,
    restartGame: GameInitialization.methods.restartGame,
    placeBet(betAmount) {
      if (!this.gameStarted) {
        this.message = "Please start the game before placing a bet.";
        return;
      }
      if (betAmount > this.chips) {
        this.message = "You don't have enough chips to place that bet.";
        return;
      }
      this.chips -= betAmount;
      this.bet = betAmount;
      this.gameReady = true;
      this.deck = createAndShuffleDeck();
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.playerHand = [this.drawCard(), this.drawCard()];
      this.checkForBlackjack();
    },
    hit() {
      if (!this.gameReady) {
        this.message = "Please place a bet before hitting.";
        return;
      }
      let result = hitPlayer(this.playerHand, this.drawCard());
      this.playerHand = result.playerHand;
      this.gameOver = result.gameOver;
      if (this.gameOver) {
        this.resolveGame();
      }
    },
    stand() {
      if (!this.gameReady) {
        this.message = "Please place a bet before standing.";
        return;
      }
      let result = standDealer(this.dealerHand, this.drawCard());
      this.dealerHand = result.dealerHand;
      this.gameOver = result.gameOver;
      this.resolveGame();
    },
    drawCard() {
      return this.deck.pop();
    },
    resolveGame() {
      let playerValue = calculateHandValue(this.playerHand);
      let dealerValue = calculateHandValue(this.dealerHand);
      if (playerValue > dealerValue) {
        this.message = "Player wins!";
        this.chips += this.bet * 2;
      } else if (dealerValue > playerValue) {
        this.message = "Dealer wins!";
      } else {
        this.message = "It's a push!";
        this.chips += this.bet;
      }
      this.gameOver = true;
    },
    checkForBlackjack() {
      let playerValue = calculateHandValue(this.playerHand);
      let dealerValue = calculateHandValue(this.dealerHand);
      if (playerValue === 21 && dealerValue !== 21) {
        this.message = "Player got a Blackjack!";
        this.chips += this.bet * 2.5;
        this.gameOver = true;
      } else if (dealerValue === 21 && playerValue !== 21) {
        this.message = "Dealer got a Blackjack!";
        this.gameOver = true;
      } else if (dealerValue === 21 && playerValue === 21) {
        this.message = "It's a push, both player and dealer got a Blackjack!";
        this.chips += this.bet;
        this.gameOver = true;
      }
    },
  },
};
