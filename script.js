const outputContainer = document.querySelector('.output__container');
outputContainer.textContent = 0; // View initial number
const calculatorContainer = document.querySelector('.calculator__container');
let firstNumber = 0;
let operator = null;
let secondNumber = 0;
let numberFromData = [];
let numberFromResultOperation = [];
const operationsData = ['/', '*', '-', '+', '='];

const isNumberWasInputed = function isNumberWasInputedAtTheStartOfTheExpression(input) {
    if (numberFromData.includes('0') && numberFromData.length < 2) {
        numberFromData.pop();
        numberFromData.push(input);
        outputContainer.textContent = numberFromData.join('');
    }
    else if (Number(input) === 0 && numberFromData.length < 9) {
        numberFromData.push(input);
        outputContainer.textContent = numberFromData.join('');
    }
    else if (Number(input) && !numberFromData.includes('.') && numberFromData.length < 9) {
        numberFromData.push(input);
        outputContainer.textContent = numberFromData.join('');
    }
    else if (Number(input) && numberFromData.includes('.') && numberFromData.length < 9) {
        numberFromData.push(input);
        outputContainer.textContent = numberFromData.join('');
    }
};

const isOperatorWasInputed = function isOperatorWasInputedInTheMiddleOfTheExpressionAndEvaluatedIt(input) {
    gatheringNumberFromInput();

    if (input !== '=' && firstNumber !== 0) {
        whichOperator(operator);
        numberFromResultOperation = firstNumber.toString().split('');
        isNumberBeyondLimit(firstNumber);

    }
    else if (input === '=' && firstNumber !== 0) {

        whichOperator(operator);
        numberFromResultOperation = firstNumber.toString().split('');
        isNumberBeyondLimit(firstNumber);
    }
    operator = input;
    // reset for the new input
    numberFromData = [];

};

const gatheringNumberFromInput = function gatheringNumberFromInputForExpressionEvaluation() {
    if ((numberFromData.length) && firstNumber === 0) {
        firstNumber = Number(numberFromData.join(''));
    }
    else if ((numberFromData.length) && secondNumber === 0) {
        secondNumber = Number(numberFromData.join(''));
    }
    else if ((numberFromResultOperation.length)) {
        firstNumber = Number(numberFromResultOperation.join(''));
        secondNumber = Number(numberFromResultOperation.join(''));
    }
    else {
        secondNumber = firstNumber;
    }

};


const whichOperator = function whichOperatorWasInputed(operator) {
    switch (operator) {
        case '*':
            firstNumber = firstNumber * secondNumber;
            break;
        case '/':
            firstNumber = firstNumber / secondNumber;
            break;
        case '+':
            firstNumber = firstNumber + secondNumber;
            break;
        case '-':
            firstNumber = firstNumber - secondNumber;
            break;
    }
};


const convertNumberToPercent = function convertNumberToPercentEquivalentForExpression() {

    if (numberFromData.length !== 0) {
        numberFromData = (Number(numberFromData.join('')) / 100).toString().split('');
        isNumberBeyondLimit(Number(numberFromData.join('')));
    }
    else {
        numberFromResultOperation = (Number(numberFromResultOperation.join('')) / 100).toString().split('');
        isNumberBeyondLimit(Number(numberFromResultOperation.join('')));
    }
};


const convertToNegativeOrPositiveNumber = function convertToNegativeOrPositiveNumberFromExpressionVariable(numbers) {
    if ((numbers.length) && (!numbers.includes('-'))) {
        numbers.unshift('-');
        isNumberBeyondLimit(Number(numbers.join('')));
    }
    else if ((numbers.length) && (numbers.includes('-'))) {
        numbers.shift('-');
        isNumberBeyondLimit(Number(numbers.join('')));
    }
};

const convertNumberIntoDecimal = function convertNumberIntoDecimalFromAnyPlace() {
    if (numberFromData.includes('.')) {
        return;
    }
    else if (!numberFromData.length && !numberFromResultOperation.length) {
        numberFromData.push('0', '.');
        outputContainer.textContent = numberFromData.join('');
    }
    else {
        numberFromData.push('.');
        outputContainer.textContent = numberFromData.join('');
    }
};

const isBackspacedWasPressed = function isBackspacedWasPressedToClearTheCalculator() {
    outputContainer.textContent = 0;
    firstNumber = 0;
    operator = null;
    secondNumber = 0;
    numberFromData = [];
    numberFromResultOperation = [];
};


const calculatorFunctions = function calculatorFunctionsThroughTheEvents(event) {
    const dataFromBtn = event;
    if (!dataFromBtn) return; // To prevent appearing in console 'undefined' whenever clicked outside the layout
    if (Number(dataFromBtn) || Number(dataFromBtn) == 0) {
        isNumberWasInputed(dataFromBtn);
    }
    else if (operationsData.includes(dataFromBtn)) {
        isOperatorWasInputed(dataFromBtn);
    }
    else if (dataFromBtn === '%') {
        convertNumberToPercent();
    }
    else if (dataFromBtn === '`') {
        if ((!numberFromData.length) && (numberFromResultOperation.length)) {
            convertToNegativeOrPositiveNumber(numberFromResultOperation);
        }
        else {
            convertToNegativeOrPositiveNumber(numberFromData);
        }
    }
    else if (dataFromBtn === '.') {
        convertNumberIntoDecimal();
    }
    else if (dataFromBtn === 'Backspace') {
        isBackspacedWasPressed();
    }
};

const isNumberBeyondLimit = function isNumberBeyondLimitToGreaterOrSmallerValue(number) {
    if (number % 1 !== 0) {
        const digitLength = Math.floor(Math.abs(number)).toString().length;
        const fractionalLength = Math.max(0, 8 - digitLength);
        number = Number(number.toFixed(fractionalLength));
    }
    if (number === Infinity || Math.abs(number) > 999999999 || Math.abs(number) < 0.0000000001) {
        outputContainer.textContent = "NO";
        // reset to initial state
        firstNumber = 0;
        secondNumber = 0;
        operator = null;
        numberFromData = [];
        numberFromResultOperation = [];
    }
    else {
        outputContainer.textContent = number;
        secondNumber = 0;
    }
}

calculatorContainer.addEventListener('click', (event) => {
    calculatorFunctions(event.target.dataset.key);
});

window.addEventListener('keydown', (event) => {
    calculatorFunctions(event.key);
});