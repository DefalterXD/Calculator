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
};

// ADD EVENT LISTENER delegation to any button clicked
calculatorContainer.addEventListener('click', (event) => {
    calculatorFunctions(event.target.dataset.key);
});