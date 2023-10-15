// Defining math operator functions 

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

function divide(a, b) {
    if (a === 0 || b === 0) {
        console.log("Cannot divide by zero");
        return 'Error';
    } else {
        return a / b;
    }
}

const modulo = (a, b) => a % b;

function operate(a, operator, b) {
    if (operator == '+') {
        add(a, b);
    } else if (operator == '-') {
        subtract(a, b);
    } else if (operator == '*') {
        multiply(a, b);
    } else if (operator == '/') {
        divide(a, b);
    } else {
        console.log("No operator found");
    }
}

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
    return s.split("").reverse().join("");
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
   
    if (finalCalcArray.indexOf(operatorPrecedence.first) != '-1') {
        var oi = finalCalcArray.indexOf(operatorPrecedence.first) + 1;
        var startOfOi = 0;
        var endOfOi = 0;
        while (!cfo(finalCalcArray[oi]) && oi < finalCalcArray.length) {
            numberB += finalCalcArray[oi];
            if ((oi+1 > finalCalcArray.length) || cfo(finalCalcArray[oi+1])) {
                endOfOi = oi;
                break;
            }
            
        }   
    }   var oi = finalCalcArray.indexOf(operatorPrecedence.first) - 1;
        while (!cfo(finalCalcArray[oi]) && oi >= 0) {
            numberA += finalCalcArray[oi];
            if (cfo(finalCalcArray[oi-1]) || oi-1 < 0) {
                startOfOi = oi;
            }
            oi--;
        }
    numberA = reverse(numberA);

    console.log(numberA);
    console.log(numberB);
    console.log("Start of calculation is " + startOfOi);
    console.log("End of calculation is " + endOfOi);
    
/*
    let numberA = '';
    let numberB = '';
    let numberACompleted = false;
    let numberBCompleted = false;
    let operator = '';

    function resetMathSection() {
        numberA = '';
        numberB = '';
        numberACompleted = false;
        numberBCompleted = false;
        operator = '';
    }


    function calculateSection() {
        for (let index = 0; index < finalCalcArray.length; index++) {
            if (!(cfo(finalCalcArray[index])) && !(numberACompleted)) {
                numberA += finalCalcArray[index];
            } else if (!(cfo(finalCalcArray[index])) && !(numberBCompleted)) {
                numberB += finalCalcArray[index];
            } else if (cfo(finalCalcArray[index])) {
                numberACompleted = true;
                operator = finalCalcArray[index];
            } else {
                numberBCompleted = true;
            }
         }
    }
    
    
    calculateSection();
    console.log(finalCalcArray)
    runningCalculation = operations[operator](numberA, numberB);
    resetMathSection();
    
    console.log(runningCalculation);
*/
}

let runningCalculation = 0;

function updateDisplay(event) {
    const button = event.target;
    // Will clear display for now
    if (button.value == 'AC' || button.value == 'CE') {
        displayElement.innerText = '';
    } else if (button.value == '=') {
        calculate(displayElement.innerText);
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
