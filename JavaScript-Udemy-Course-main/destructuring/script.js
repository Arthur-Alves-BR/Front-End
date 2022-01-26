'use strict';

const arr = [2, 3, 4];

let [x, y, z] = arr;
console.log(x, y, z);

//switching values
[x, y] = [y, x];
console.log(x, y, z);

//Objs
const animal = {
  nome: 'galinha',
  idade: 25,
  pintinhos: ['João', 'Maria'],
};

const {nome: name, idade: age, pintinhos: children} = animal;

console.log(name, age, children);
