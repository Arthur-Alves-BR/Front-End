'use strict';

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const questionStr = this.mountQuestion();
    let userInput = prompt(questionStr);

    if (this.isInputValid(userInput)) {
      this.incrementAnswers(userInput);
      this.displayResults('string');
    } else {
      console.log('Inválido');
    }
  },

  mountQuestion() {
    let questionStr = this.question;
    questionStr += `\n${this.options.join('\n')}`;
    return questionStr;
  },

  isInputValid(input) {
    let numberInput;
    input ? (numberInput = Number(input)) : (numberInput = NaN);

    const inputNaN = Number.isNaN(numberInput);
    const inputOutOfRange = numberInput > 3 || numberInput < 0;

    if (inputNaN) return false;
    if (inputOutOfRange) return false;
    return true;
  },

  incrementAnswers(input) {
    this.answers[input]++;
  },

  displayResults(type = '') {
    const typeEqualsString = type === 'string';
    if (typeEqualsString)
      console.log(`Poll results are ${this.answers.join(', ')}`);
    else console.log(this.answers);
  },
};

const button = document.querySelector('.btn');
button.addEventListener('click', () => {
  poll.registerNewAnswer();
});
