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
    else if (Number(input) === 0) {
        // THEN push the number into array
        numberFromData.push(input);
        // THEN output the result from all elements and delete the commas
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE IF the input data is a number 
    else if (Number(input)) {
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
        // SET secondNumber to zero
        secondNumber = 0;

    }
    // ELSE IF input isn't equal operator AND two numbers isn't empty 
    else if (input === '=' && firstNumber !== 0) {

        // THEN INVOKE whichOperator() with operator passed argument
        whichOperator(operator);
        // PRINT out the result of the operation in output container
        outputContainer.textContent = firstNumber;
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
};

// ADD EVENT LISTENER delegation to any button clicked
calculatorContainer.addEventListener('click', (event) => {
    calculatorFunctions(event.target.dataset.key);
});