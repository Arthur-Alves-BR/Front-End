"use strict";

const RomanToDecimal = {
    decimal_value: 0,
    letter_value: 0,
    letters_array: [],
    
    roman_values_list: {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    },

    convert: function (romanString) {
        this.stringToArray(romanString)
        this.lettersArrayToDecimal()
        return this.decimal_value
    },

    stringToArray: function (string) {
        this.letters_array = string.split("")
    },
    
    lettersArrayToDecimal: function () {
        this.decimal_value = 0;
        
        let next_letter = ''
        let this_letter_value = 0;
        let next_letter_value = 0;

        this.letters_array.forEach((letter, index) => {
            this_letter_value = this.roman_values_list[letter]

            next_letter = this.getNextArrayLetterIfExists(index)
            next_letter_value = this.roman_values_list[next_letter];
            
            if (next_letter_value > this_letter_value) {
                this_letter_value = -this_letter_value
            }
            
            this.decimal_value += this_letter_value;
        });
    },
    
    getNextArrayLetterIfExists: function (actualIndex) {
        return this.letters_array[actualIndex + 1] ? this.letters_array[actualIndex + 1] : null
    },
};

let roman = "CXL";

console.log(RomanToDecimal.convert(roman));
