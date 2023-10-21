// Defining math operator functions 

const add = (a, b) => parseInt(a) + parseInt(b);

const subtract = (a, b) => parseInt(a) - parseInt(b);

const multiply = (a, b) => parseInt(a) * parseInt(b);

function divide(a, b) {
    if (parseInt(a) === 0 || parseInt(b) === 0) {
        console.log("Cannot divide by zero");
        return 'Error';
    } else {
        return parseInt(a) / parseInt(b);
    }
}

const modulo = (a, b) => parseInt(a) % parseInt(b);


const operations = {
    '%': modulo,
    '/': divide,
    '×': multiply,
    '+': add,
    '-': subtract
}


// Event listener on click for all buttons
let calculatorContainer = document.getElementById('calculator-container');
let calculatorButtonContainer = document.getElementById('calculator-buttons');
let calculatorButtons = document.querySelectorAll(".calculator-button");

calculatorButtons.forEach((button) => {
    button.addEventListener('click', updateDisplay)
})

// Variable to hold display element
displayElement = document.getElementById('calculator-output');

let operatorPrecedence = {
    first: '%',
    second: '/',
    third: '×',
    fourth: '+',
    fifth: '-'
}

let operators = ['%', '/', '×', '+', '-']

function cfo(operator) {
    if (!isNaN(parseInt(operator))) {
        return false;
    }
    for (i = 0; i < operators.length; i++) {
        if (operators[i] === operator) {
            return true;
        } else if (operator === undefined) {
            return true;
        }
    }
    return false;
}

function reverse(s){
    return s.split("").reverse();
}


function calculate(finalCalcString) {
    // removing whitespaces
    let calcArray = finalCalcString.split('');
    let finalCalcArray = calcArray.filter(argument => argument != ' ');

    // check if calculation starts and ends with an operator
    if (cfo(finalCalcArray[0]) && cfo(finalCalcArray[finalCalcArray.length - 1])) {
        console.log('Incorrect Format');
        return 'Error';
    }

    // error check - two operators in a row
    for (let index = 0; index < finalCalcArray.length - 1; index++) {
        if (cfo(finalCalcArray[index]) && cfo(finalCalcArray[index + 1])) {
            console.log('Two Operators in a Row');
            return 'Error';
        }
    }

    let numberA = '';
    let numberB = '';

    const regex = /\d+/;
    const operatorsInCalculation = finalCalcArray.filter(item => !regex.test(item))

    /* TODO: 
        - Will find the two numbers to be operated on by modulus.
        - Need to refactor in to a function
        - Use with a loop/if-statement block to work on all operators
        - Actually change the "finalCalcArray" array to resolve into a single number
    */

    function calculateTwoElements(operator) {
        var numberIndex = finalCalcArray.indexOf(operator) + 1;
        var startOfnumberBIndex = numberIndex;
        var endOfnumberBIndex = 0;
        while (!cfo(finalCalcArray[numberIndex]) && numberIndex < finalCalcArray.length) {
            numberB += finalCalcArray[numberIndex];
            if ((numberIndex+1 > finalCalcArray.length) || cfo(finalCalcArray[numberIndex+1])) {
                endOfnumberBIndex = numberIndex;
                break;
            }
            numberIndex++
        }   
        var numberIndex = finalCalcArray.indexOf(operator) - 1;
        var endOfnumberAIndex = numberIndex;
        var startOfnumberAIndex = 0;
        while (!cfo(finalCalcArray[numberIndex]) && numberIndex >= 0) {
            numberA += finalCalcArray[numberIndex];
            if (cfo(finalCalcArray[numberIndex-1]) || numberIndex-1 < 0) {
                startOfnumberAIndex = numberIndex;
            }
            numberIndex--;
        }
        numberA = (reverse(numberA)).join('');

        console.log("Number A is " + numberA);
        console.log("Number B is " + numberB);
        console.log("Initial FinalCalcArray is " + finalCalcArray.join(''));
        let elementsToRemove = (endOfnumberBIndex - startOfnumberAIndex) + 1;
        let calculation = operations[operator](numberA, numberB);
        console.log(`Result of Number A ${operator} Number B is ${calculation.toString().split('').join('')}`);
        let elementsToAdd = calculation.toString().split('');
        finalCalcArray.splice(startOfnumberAIndex, elementsToRemove, ...elementsToAdd);
        console.log("Resultant FinalCalcArray is " + finalCalcArray.join(''));
        numberA = '';
        numberB = '';
    }

    while (finalCalcArray.some(operator => operators.includes(operator))) {
        if (finalCalcArray.includes(operatorPrecedence.first)) {
            calculateTwoElements(operatorPrecedence.first);
            continue;
        } else if (finalCalcArray.includes(operatorPrecedence.second)) {
            calculateTwoElements(operatorPrecedence.second);
            continue;
        } else if (finalCalcArray.includes(operatorPrecedence.third)) {
            calculateTwoElements(operatorPrecedence.third);
            continue;
        } else if (finalCalcArray.includes(operatorPrecedence.fourth)) {
            calculateTwoElements(operatorPrecedence.fourth);
            continue;
        } else if (finalCalcArray.includes(operatorPrecedence.fifth)) {
            calculateTwoElements(operatorPrecedence.fifth);
            continue;
        } else {
            break;
        }
    }
    if (!isNaN(parseInt(finalCalcArray.join('')))) {
        return finalCalcArray;
    } else {
        return "Incorrect Format";
    }

}

function updateDisplay(event) {
    const button = event.target;
    // Will clear display for now
    if (button.value == 'AC' || button.value == 'CE') {
        displayElement.innerText = '';
    } else if (button.value == '=') {
        displayElement.innerText = calculate(displayElement.innerText).join('');
    // If an operator has been pressed, then will add spacing to the display
    } else if (cfo(button.value, operators)) {      
        displayElement.innerText += ' ' + button.value;
    // if an operator is at the end of the current display value, will add spacing to the display
    } else if (cfo(displayElement.innerText.slice(-1), operators)) {
        displayElement.innerText += ' ' + button.value;
    } else {
        displayElement.innerText += button.value;
    }
}
