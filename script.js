// Defining math operator functions 

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

function divide(a, b) {
    if (a === 0 || b === 0) {
        console.log("Cannot divide by zero");
    } else {
        return a / b;
    }
}

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

// Event listener on click for all buttons
let calculatorContainer = document.getElementById('calculator-container');
let calculatorButtonContainer = document.getElementById('calculator-buttons');
let calculatorButtons = document.querySelectorAll(".calculator-button");

calculatorButtons.forEach((button) => {
    button.addEventListener('click', updateDisplay)
})

// Variable to hold display element
displayElement = document.getElementById('calculator-output');

let operators = ['%', '/', '+', '-', '×'];

function checkForOperator(operator) {
    for (i = 0; i < operators.length; i++) {
        if (operators[i] === operator) {
            return true;
        }
    }
    return false;
}

function calculate(finalCalcString) {
    // removing whitespaces
    let calcArray = finalCalcString.split('');
    let finalCalcArray = calcArray.filter(argument => argument != ' ');

    // check if calculation starts and ends with an operator
    if (checkForOperator(finalCalcArray[0]) && checkForOperator(finalCalcArray[finalCalcArray.length - 1])) {
        console.log('Incorrect Format');
        return 'Error';
    }

    // error check - two operators in a row
    let index = 0;
    for (let index = 0; index < finalCalcArray.length - 1; index++) {
        if (checkForOperator(finalCalcArray[index]) && checkForOperator(finalCalcArray[index + 1])) {
            console.log('Two Operators in a Row');
            return 'Error';
        }
    }

    console.log('its fine');

}



function updateDisplay(event) {
    const button = event.target;
    // Will clear display for now
    if (button.value == 'AC' || button.value == 'CE') {
        displayElement.innerText = '';
    } else if (button.value == '=') {
        calculate(displayElement.innerText);
    // If an operator has been pressed, then will add spacing to the display
    } else if (checkForOperator(button.value, operators)) {      
        displayElement.innerText += ' ' + button.value;
    // if an operator is at the end of the current display value, will add spacing to the display
    } else if (checkForOperator(displayElement.innerText.slice(-1), operators)) {
        displayElement.innerText += ' ' + button.value;
    } else {
        displayElement.innerText += button.value;
    }
}
