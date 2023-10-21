// Defining math operator functions 

const add = (a, b) => parseFloat(a) + parseFloat(b);

const subtract = (a, b) => parseFloat(a) - parseFloat(b);

const multiply = (a, b) => parseFloat(a) * parseFloat(b);

function divide(a, b) {
    if (parseFloat(a) == 0 || parseFloat(b) == 0) {
        console.log("Cannot divide by zero");
        return 'Error';
    } else {
        return parseInt(a) / parseInt(b);
    }
}

const operations = {
    '/': divide,
    '×': multiply,
    '+': add,
    '−': subtract
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
    first: '/',
    second: '×',
    third: '+',
    fourth: '−'
}

let operators = ['/', '×', '+', '−']

function cfo(operator) {
    // help with debugging - skips numbers when provided as an arg
    if (!isNaN(parseInt(operator))) {
        return false;
    }
    for (i = 0; i < operators.length; i++) {
        if (operators[i] == operator) {
            return true;
        } else if (operator == undefined) {
            return true;
        }
    }
    return false;
}

// reverse strings
function reverse(s){
    return s.split("").reverse();
}


function calculate(finalCalcString) {
    // removing whitespaces
    let calcArray = finalCalcString.split('');
    let finalCalcArray = calcArray.filter(argument => argument != ' ');

    // checking if the calculation prompt is empty
    if (finalCalcArray.length == 0) {
        return 'Enter a calculation to begin.';
    }

    // check if calculation starts and ends with an operator
    if (cfo(finalCalcArray[0]) && cfo(finalCalcArray[finalCalcArray.length - 1])) {
        console.log('Incorrect Format');
        return 'Calculation cannot start and end with an operator.';
    }

    // check if calculation ends with an operator
    if (cfo(finalCalcArray[finalCalcArray.length - 1])) {
        console.log('Incorrect Format');
        return 'Calculation cannot end with an operator.';
    }

    // error check - two operators in a row
    for (let index = 0; index < finalCalcArray.length - 1; index++) {
        if (cfo(finalCalcArray[index]) && cfo(finalCalcArray[index + 1])) {
            console.log('Two Operators in a Row');
            return 'Calculation cannot have two operators in a row.';
        }
    }

    //regex to collect numbers only
    const regex = /\d+/;
    const operatorsInCalculation = finalCalcArray.filter(item => !regex.test(item));

    var numberA = '';
    var numberB = '';

    function calculateTwoElements(operator) {
        // the first number that starts after the index of the provided operator
        var numberIndex = finalCalcArray.indexOf(operator) + 1;
        var startOfnumberBIndex = numberIndex;
        var endOfnumberBIndex = 0;

        // while the current number is not an operator and is less than the total calculation array length
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

        // while the current number is not an operator and is more than 0 (because the calculation must start at index 0)
        while (!cfo(finalCalcArray[numberIndex]) && numberIndex >= 0) {
            numberA += finalCalcArray[numberIndex];
            if (cfo(finalCalcArray[numberIndex-1]) || numberIndex-1 < 0) {
                startOfnumberAIndex = numberIndex;
            }
            numberIndex--;
        }

        // reverses the first number because it is put together backwards, the loop goes backwards
        numberA = (reverse(numberA)).join('');


        console.log("Number A is " + numberA);
        console.log("Number B is " + numberB);
        console.log("Initial FinalCalcArray is " + finalCalcArray.join(''));

        // computes which section of the finalcalcarray to remove, and the result of the 2 pairs of numbers to be operated on
        let elementsToRemove = (endOfnumberBIndex - startOfnumberAIndex) + 1;
        let calculation = operations[operator](numberA, numberB);
        calculation = Math.round((calculation + Number.EPSILON) * 100) / 100;
        console.log(`Result of Number A ${operator} Number B is ${calculation.toString().split('').join('')}`);

        // removes calculated numbers and its operator and replaces with the new number instead
        let elementsToAdd = calculation.toString().split('');
        finalCalcArray.splice(startOfnumberAIndex, elementsToRemove, ...elementsToAdd);
        console.log("Resultant FinalCalcArray is " + finalCalcArray.join(''));
        numberA = '';
        numberB = '';
    }

    // while the finalcalcarray has an operator in it (and therefore more calculation to do)
    while (finalCalcArray.some(operator => operators.includes(operator))) {
        for (let i = 0; i < finalCalcArray.length - 1; i++) {
            if (finalCalcArray[i] == '.' && finalCalcArray[i+1] == '.') {
                return 'Cannot have more than one decimal per number.'
                break;
            }
        }
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
    // if the resulting finalcalcarray can be converted into float, return it, otherwise, an error occured.
    if (!isNaN(parseFloat(finalCalcArray.join('')))) {
        return finalCalcArray;
    } else {
        return "Incorrect Format";
    }

}

function updateDisplay(event) {
    const button = event.target;
    // Will clear display for now
    if (button.value == 'AC') {
        displayElement.innerText = '';
    } else if (button.value == 'CE') {
        displayElement.innerText = displayElement.innerText.slice(0, -1);
    } else if (button.value == '=') {
        try {
            displayElement.innerText = calculate(displayElement.innerText).join('');
        }
        catch(err) {
            displayElement.innerText = calculate(displayElement.innerText);
            console.log(err.message);
        }
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
