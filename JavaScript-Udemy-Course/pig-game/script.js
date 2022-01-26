'use strict';

const game = {
    dice: null,
    sections: null,
    holdButton: null,
    totalScorePs: null,
    currentScores: null,
    newGameButton: null,
    rollDiceButton: null,

    winScore: 50,
    totalScore: 0,
    activePlayer: 1,
    diceValue: null,

    startGame: function () {
        this.getDomElements();
        this.addDomEvents();
    },

    getDomElements: function () {
        this.dice = document.querySelector('.dice');
        this.holdButton = document.querySelector('.hold');
        this.sections = document.querySelectorAll('section');
        this.newGameButton = document.querySelector('.new-game');
        this.rollDiceButton = document.querySelector('.roll-dice');
        this.totalScorePs = document.querySelectorAll('.total-score');
        this.currentScores = document.querySelectorAll('.current-score');
    },

    addDomEvents: function () {
        this.addHoldButtonEvent();
        this.addNewGameButtonEvent();
        this.addRollDiceButtonEvent();
    },

    addHoldButtonEvent: function () {
        this.holdButton.addEventListener('click', () => {
            this.incrementTotalScore();
            if (this.totalScore >= this.winScore) {
                this.hideDice();
                this.setPlayerWin();
                this.disableRollDiceButton();
            } else {
                this.toggleActivePlayer();
            }
        });
    },

    addNewGameButtonEvent: function () {
        this.newGameButton.addEventListener('click', () => {
            document.location.reload();
        });
    },

    addRollDiceButtonEvent: function () {
        this.rollDiceButton.addEventListener('click', () => {
            this.generateDiceNumber();
            this.displayDice();
            this.incrementCurrentScore();
            this.changePlayersTurnIfDiceValueEquals1();
        });
    },

    incrementTotalScore: function () {
        this.totalScore = Number(
            this.totalScorePs[this.activePlayer - 1].innerText
        );
        let currentScore = Number(
            this.currentScores[this.activePlayer - 1].innerText
        );

        this.totalScore += currentScore;

        this.clearCurrentScore();
        this.totalScorePs[this.activePlayer - 1].innerText = this.totalScore;
    },

    hideDice: function () {
        this.dice.classList.add('hidden');
    },

    setPlayerWin: function () {
        this.sections[this.activePlayer - 1].classList.add('win');
    },

    disableRollDiceButton: function () {
        this.rollDiceButton.disabled = true;
    },

    toggleActivePlayer: function () {
        this.activePlayer = this.activePlayer == 1 ? 2 : 1;
        this.toggleActiveSection();
    },

    clearCurrentScore: function () {
        this.currentScores[this.activePlayer - 1].innerText = 0;
    },

    generateDiceNumber: function () {
        this.diceValue = Math.floor(Math.random() * 6) + 1;
    },

    displayDice: function () {
        this.dice.classList.remove('hidden');
        this.dice.src = `./images/dice-${this.diceValue}.png`;
    },

    incrementCurrentScore: function () {
        let currentScore = Number(
            this.currentScores[this.activePlayer - 1].innerText
        );
        currentScore += this.diceValue;
        this.currentScores[this.activePlayer - 1].innerText = currentScore;
    },

    changePlayersTurnIfDiceValueEquals1: function () {
        if (this.diceValue == 1) {
            this.clearCurrentScore();
            this.toggleActivePlayer();
        }
    },

    toggleActiveSection: function () {
        for (let section of this.sections) {
            section.classList.toggle('active');
        }
    },
};

game.startGame();
