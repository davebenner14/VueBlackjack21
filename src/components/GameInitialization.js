export const GameInitialization = {
  methods: {
    initGame() {
      this.gameStarted = true;
      this.message = "Please place your bet to start playing.";
      this.gameReady = false;
      this.bet = 0;
      this.playerHand = [];
      this.dealerHand = [];
    },
    restartGame() {
      this.gameOver = false;
      this.gameStarted = false;
      this.gameReady = false;
      this.dealerHand = [];
      this.playerHand = [];
      this.message = "";
      this.bet = 0;
    },
  },
};
