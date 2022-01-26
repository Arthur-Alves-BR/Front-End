'use strict';

const arthur = {
    firstName: 'Arthur',
    lastName: 'Alves'
}

console.log(`${arthur.firstName} ${arthur.lastName}`)

const nameKey = 'Name'
console.log(`${arthur['first' + nameKey]} ${arthur['last' + nameKey]}`)

function myFunc(payload){
    let readingsList = []
    for(const [key, value] in Object.entries(payload.generating_unit_readings)){
        console.log(key, value)
    }
    payload.generating_unit_readings = readingsList
}

const payload = {
    "generating_unit_readings":{
        1: {
            "a": 14,
            "dsfdbf": "dsgfsddfg"
        },
        42: {
            "a": 234,
            "dsfdbf": "ssssss"
        }
    }
}

//myFunc(payload)

console.log(payload.generating_unit_readings);

for (let obj of Object.values(payload.generating_unit_readings)){
    console.log(obj);
}

//console.log(Object.values(payload.generating_unit_readings));