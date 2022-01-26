"use strict";

const game = {
    highScorePanel: null,
    secrectNumber: null,
    playerInput: null,
    againButton: null,
    checkButton: null,
    numberInput: null,
    scorePanel: null,
    numberBox: null,
    highScore: null,
    message: null,
    playing: null,
    score: null,
    body: null,

    startGame: function () {
        this.getDomElements();
        this.addDomEvents();

        this.score = 20;
        this.displayScore();

        this.playing = true;
        this.numberInput.focus();

        this.generateSecretNumber();
        this.displayMessage("Let's start!");

        this.getHighScoreInLocalStorage();
        this.displayHighScore();
    },

    generateSecretNumber: function () {
        this.secrectNumber = Math.floor(Math.random() * 20) + 1;
    },

    getDomElements: function () {
        this.highScorePanel = document.querySelector(".high-score");
        this.againButton = document.querySelector(".again-button");
        this.checkButton = document.querySelector(".check-button");
        this.numberInput = document.querySelector(".number-input");
        this.numberBox = document.querySelector(".number-box");
        this.scorePanel = document.querySelector(".score");
        this.message = document.querySelector(".message");
        this.body = document.querySelector("body");
    },

    addDomEvents: function () {
        this.addCheckButtonEvent();
        this.addAgainButtonEvent();
    },

    addCheckButtonEvent: function () {
        this.checkButton.addEventListener("click", () => {
            this.getPlayerEntry();
            this.gameLogic();
        });
    },

    addAgainButtonEvent: function () {
        this.againButton.addEventListener("click", () =>
            document.location.reload()
        );
    },

    getPlayerEntry: function () {
        this.playerInput = Number(this.numberInput.value);
    },

    gameLogic: function () {
        this.testIfInputIsTheSecretNumber();
        this.score--;
        this.testGameOver();
        if (this.playing) {
            this.displayTip();
            this.displayScore();
        }
    },

    testIfInputIsTheSecretNumber: function () {
        if (this.playerInput == this.secrectNumber) {
            this.playerWin();
        }
    },

    displayTip: function () {
        if (this.playerInput > this.secrectNumber) {
            this.displayMessage("Too high!");
        } else this.displayMessage("Too low!");
    },

    testGameOver: function () {
        if (this.score == 0) {
            this.gameOver();
        }
    },

    gameOver: function () {
        this.displayScore();
        this.playing = false;
        this.setBodyClass("red-body");
        this.displayMessage("Game Over!");
    },

    playerWin: function () {
        this.playing = false;
        this.showSecretNumber();
        this.setBodyClass("green-body");
        this.displayMessage("You win!");
        this.setHighScoreInLocalStorage();
    },

    displayScore: function () {
        this.scorePanel.innerText = this.score;
    },

    displayMessage: function (message) {
        this.message.innerText = message;
    },

    setHighScoreInLocalStorage() {
        this.getHighScoreInLocalStorage();
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
            this.displayHighScore();
        }
    },

    getHighScoreInLocalStorage: function () {
        this.highScore = localStorage.getItem("highScore");
    },

    displayHighScore: function () {
        this.highScorePanel.innerText = this.highScore;
    },

    setBodyClass: function (classString) {
        this.body.className = classString;
    },

    showSecretNumber: function () {
        this.numberBox.innerText = this.secrectNumber;
    },
};

window.addEventListener("load", () => game.startGame());
