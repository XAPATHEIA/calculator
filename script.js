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
        while (!cfo(finalCalcArray[numberIndex]) && numberIndex >= 0) {
            numberA += finalCalcArray[numberIndex];
            if (cfo(finalCalcArray[numberIndex-1]) || numberIndex-1 < 0) {
                startOfnumberAIndex = numberIndex;
            }
            numberIndex--;
        }
        numberA = (reverse(numberA)).join('');

        console.log(numberA);
        console.log(numberB);
        console.log(finalCalcArray);
        // TODO: Start calculating here, index into original array and create new array so as to not constantly shift elements around
        console.log("Start of numberB is " + startOfnumberBIndex);
        console.log("End of numberB is " + endOfnumberBIndex);
        console.log("Start of numberA is " + startOfnumberAIndex);
        console.log("End of numberA is " + endOfnumberAIndex);
        let elementsToRemove = (endOfnumberBIndex - startOfnumberAIndex) + 1;
        let calculation = operations[operator](numberA, numberB);
        let elementsToAdd = calculation.toString().split('');
        finalCalcArray.splice(startOfnumberAIndex, elementsToRemove, ...elementsToAdd);
        console.log(calculation);
        console.log(elementsToAdd);
        console.log(finalCalcArray);
    }

    while (finalCalcArray.find(operator => operations.includes(operator))) {
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
 /*       
        
        if (finalCalcArray[i] == operatorPrecedence.first) {
            calculateTwoElements(operatorPrecedence.first);
        } else if (finalCalcArray[i] == operatorPrecedence.second) {
            calculateTwoElements(operatorPrecedence.second);
        } else if (finalCalcArray[i] == operatorPrecedence.third) {
            calculateTwoElements(operatorPrecedence.third);
        } else if (finalCalcArray[i] == operatorPrecedence.fourth) {
            calculateTwoElements(operatorPrecedence.fourth);
        } else if (finalCalcArray[i] == operatorPrecedence.fifth) {
            calculateTwoElements(operatorPrecedence.fifth);
        } else {
            i++;
        }
    }
*/

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
