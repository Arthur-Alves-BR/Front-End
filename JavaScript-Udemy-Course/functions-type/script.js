'use strict';

const date = new Date()

function calcAge1(birthYear)
{
    return date.getFullYear() - birthYear
}

//Anonymous
const calcAge2 = function(birthYear)
{
    return date.getFullYear() - birthYear
}

//Arrow
const calcAge3 = birthYear => {
    return date.getFullYear() - birthYear
}

console.log(calcAge1(1999))
console.log(calcAge2(1999))
console.log(calcAge3(1999))

//Arrow
const hello = (age, name) => console.log(`My name is ${name} and I'm ${age}`)

console.log(hello(22, "Arthur"))