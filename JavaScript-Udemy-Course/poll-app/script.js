'use strict';

const arthur = {
  name: 'Arthur Alves',
  age: 22,
};

const paola = {
  name: 'Paola Hansen Coelho',
  age: 21,
};

function displayPersonInfo() {
  console.log(`My name is ${this.name}, I'm ${this.age} years old`);
}

displayPersonInfo.call(arthur);
displayPersonInfo.apply(arthur);
const displayArthurInfo = displayPersonInfo.bind(arthur);
displayArthurInfo();

displayPersonInfo.call(paola);
displayPersonInfo.apply(paola);
const displayPaolaInfo = displayPersonInfo.bind(paola);
displayPaolaInfo();
