// INIT outputContainer for output element
const outputContainer = document.querySelector('.output__container');
outputContainer.textContent = 0; // View initial number
// INIT calculatorContainer for event delegation purpose
const calculatorContainer = document.querySelector('.calculator__container');
// INIT variable for the first number input
let firstNumber = 0;
// INIT variable for the operator input
let operator = null;
// INIT variable for the second number input
let secondNumber = 0;
// INIT array variable for all the number output
let numberFromData = [];
// INIT array variable for stored result
let numberFromResultOperation = [];
// INIT array variable for all operations
const operationsData = ['/', '*', '-', '+', '='];

// DEFINE isNumberWasInputed function expression
const isNumberWasInputed = function isNumberWasInputedAtTheStartOfTheExpression(input) {
    // IF input equals to zero AND firstNumber is still zero
    if (numberFromData.includes('0') && numberFromData.length < 2) {
        numberFromData.pop();
        numberFromData.push(input);
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE IF input equals to zero 
    else if (Number(input) === 0 && numberFromData.length < 9) {
        // THEN push the number into array
        numberFromData.push(input);
        // THEN output the result from all elements and delete the commas
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE IF the input data is a number 
    else if (Number(input) && !numberFromData.includes('.') && numberFromData.length < 9) {
        // THEN push the number into array
        numberFromData.push(input);
        // PRINT out output the result from all elements and delete the commas
        outputContainer.textContent = numberFromData.join('');
    } 
    else if (Number(input) && numberFromData.includes('.') && numberFromData.length < 10) {
         // THEN push the number into array
         numberFromData.push(input);
         // PRINT out output the result from all elements and delete the commas
         outputContainer.textContent = numberFromData.join('');
    }
};

// DEFINE isOperatorWasInputed function expression
const isOperatorWasInputed = function isOperatorWasInputedInTheMiddleOfTheExpressionAndEvaluatedIt(input) {
    // INVOKE gatheringNumberFromInput to get value for numbers 
    gatheringNumberFromInput();

    // IF input is equal operation AND two numbers isn't empty
    if (input !== '=' && firstNumber !== 0) {
        // INVOKE whichOperator() with operator passed argument
        whichOperator(operator);
        // PRINT out the result of the operation in output container
        outputContainer.textContent = firstNumber;
        // SET result from evaluation to backup variable
        numberFromResultOperation = firstNumber.toString().split('');
        // SET secondNumber to zero
        secondNumber = 0;

    }
    // ELSE IF input isn't equal operator AND two numbers isn't empty 
    else if (input === '=' && firstNumber !== 0) {

        // THEN INVOKE whichOperator() with operator passed argument
        whichOperator(operator);
        // PRINT out the result of the operation in output container
        outputContainer.textContent = firstNumber;
        // SET result from evaluation to backup variable
        numberFromResultOperation = firstNumber.toString().split('');
        // SET secondNumber to zero
        secondNumber = 0;
    }
    operator = input;
    // reset for the new input
    numberFromData = [];

};

// DEFINE gatheringNumberFromInput function expression
const gatheringNumberFromInput = function gatheringNumberFromInputForExpressionEvaluation() {
    // IF numberFromData isn't empty AND firstNumber equals to zero
    if ((numberFromData.length) && firstNumber === 0) {
        // THEN assign numberFromData to firstNumber
        firstNumber = Number(numberFromData.join(''));
    }
    // ELSE IF numberFromData isn't empty AND firstNumber isn't equals to zero
    else if ((numberFromData.length) && secondNumber === 0) {
        // THEN assign numberFromData to secondNumber
        secondNumber = Number(numberFromData.join(''));
    }
    // ELSE
    else {
        // THEN assign firstNumber to secondNumber
        secondNumber = firstNumber;
    }

};


// DEFINE whichOperator function expression 
const whichOperator = function whichOperatorWasInputed(operator) {
    // CASE string of operator OF
    switch (operator) {
        // CONDITION string is multiplication: 
        case '*':
            // THEN assign firstNumber multiplied by secondNumber to firstNumber
            firstNumber = firstNumber * secondNumber;
            break;
        // CONDITION string is division:
        case '/':
            // THEN assign firstNumber divided by secondNumber to firstNumber
            firstNumber = firstNumber / secondNumber;
            break;
        // CONDITION string is addition: 
        case '+':
            // THEN assign firstNumber added by secondNumber to firstNumber
            firstNumber = firstNumber + secondNumber;
            break;
        // CONDITION string is subtraction: 
        case '-':
            // THEN assign firstNumber subtracted by secondNumber to firstNumber
            firstNumber = firstNumber - secondNumber;
            break;
    }
    // ENDCASE
};


// DEFINE convertNumberToPercent function expression
const convertNumberToPercent = function convertNumberToPercentEquivalentForExpression() {
    // IF numberFromData isn't empty
    if (numberFromData.length !== 0) {
        // THEN convert all the numbers from array into Numbers with a join('') method and evaluate into percent 
        numberFromData = (Number(numberFromData.join('')) / 100).toString().split('') // assign it back into an numberFromData with toString() and split('') methods
        // PRINT out the number into output 
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE
    else {
        // SET to percent number from result operation
        numberFromResultOperation = (Number(numberFromResultOperation.join('')) / 100).toString().split('');
        outputContainer.textContent = numberFromResultOperation.join('');
    }
};


// DEFINE convertToNegativeOrPositiveNumber function expression
const convertToNegativeOrPositiveNumber = function convertToNegativeOrPositiveNumberFromExpressionVariable(numbers) {
    // IF numberFromData isn't empty AND doesn't has minus sign in array
    if ((numbers.length) && (!numbers.includes('-'))) {
        // THEN add to start of the array minus sign
        numbers.unshift('-');
        outputContainer.textContent = numbers.join('');
    }
    // ELSE IF  numberFromData isn't empty AND does has minus sign in array
    else if ((numbers.length) && (numbers.includes('-'))) {
        // THEN remove from the start of the array minus sign
        numbers.shift('-');
        outputContainer.textContent = numbers.join('');
    }
};

// DEFINE convertNumberIntoDecimal function expression
const convertNumberIntoDecimal = function convertNumberIntoDecimalFromAnyPlace() {
    // IF numberFromData includes '.' element
    if (numberFromData.includes('.')) {
        // THEN just return 
        return;
    }
    // ELSE IF numberFromData is empty
    else if (!numberFromData.length && !numberFromResultOperation.length) {
        // THEN push into numberFromData zero and decimal point
        numberFromData.push('0','.');
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE 
    else {
        // THEN push just the decimal point
        numberFromData.push('.');
        outputContainer.textContent = numberFromData.join('');
    }
};

// DEFINE isBackspacedWasPressed function expression
const isBackspacedWasPressed = function isBackspacedWasPressedToClearTheCalculator() {
    // SET all variables to initial state
    outputContainer.textContent = 0;
    firstNumber = 0;
    operator = null;
    secondNumber = 0;
    numberFromData = [];
    numberFromResultOperation = [];
};


// DEFINE calculatorFunctions function expression
const calculatorFunctions = function calculatorFunctionsThroughTheEvents(event) {
    const dataFromBtn = event;
    // IF dataFromBtn is undefined THEN return
    if (!dataFromBtn) return; // To prevent appearing in console 'undefined' whenever clicked outside the layout
    // IF dataFromBtn is a number
    if (Number(dataFromBtn) || Number(dataFromBtn) == 0) {
        // THEN invoke isNumber function
        isNumberWasInputed(dataFromBtn);
    }
    // ELSE IF dataFromBtn is an operation 
    else if (operationsData.includes(dataFromBtn)) {
        isOperatorWasInputed(dataFromBtn);
    }
     // ELSE IF dataFromBtn is an percent operation
     else if (dataFromBtn === '%') {
        // THEN INVOKE convertNumberToPercent function
        convertNumberToPercent();
    }
    // ELSE IF dataFromBtn is an backtick(minus/plus) operation
    else if (dataFromBtn === '`') {
        // THEN INVOKE convertToNegativeOrPositiveNumber function
        if ((!numberFromData.length) && (numberFromResultOperation.length)) {
            convertToNegativeOrPositiveNumber(numberFromResultOperation);
        }
        else {
            convertToNegativeOrPositiveNumber(numberFromData);
        }
    }
     // ELSE IF dataFromBtn is a point
     else if (dataFromBtn === '.') {
        // THEN INVOKES convertNumberIntoDecimal function
        convertNumberIntoDecimal();
    }
    // ELSE IF dataFromBtn is an Backspace
    else if (dataFromBtn === 'Backspace') {
        // THEN INVOKE isBackspacedWasPressed function
        isBackspacedWasPressed();
    }
};

// ADD EVENT LISTENER delegation to any button clicked
calculatorContainer.addEventListener('click', (event) => {
    calculatorFunctions(event.target.dataset.key);
});

// ADD EVENT LISTENER delegation to any key pressed from keyboard
window.addEventListener('keydown', (event) => {
    calculatorFunctions(event.key);
});