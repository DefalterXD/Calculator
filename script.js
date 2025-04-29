// PLAN:

// Getting input through buttons and keyboard
// Output the input through the output container
// And make only one operation per screen
// Adding basic operations for calculator


// INIT outputContainer for output element
const outputContainer = document.querySelector('.output__container');
outputContainer.textContent = 0; // View initial number
// INIT calculatorContainer for event delegation purpose
const calculatorContainer = document.querySelector('.calculator__container');
// INIT calculatorBtns array of:
// SET an array for clear buttons (and % operator)
// SET an array for number buttons
// SET an array for operator buttons
// INIT variable for the first number input
let firstNumber = 0;
// INIT variable for the operator input
let operator = null;
// INIT variable for the second number input
let secondNumber = 0;
// INIT variable for all the number output
const numberFromData = [];

// DEFINE isNumber function expression
const isNumberWasInputed = function isNumberWasInputedAtTheStartOfTheExpression(input) {
    // IF input.dataset.key equals to zero 
    // AND (numberFromData array is not empty AND numberFromData array length is less than nine)
    if (Number(input.dataset.key) === 0 && (numberFromData.length !== 0 && numberFromData.length < 9)) {
        // THEN push the number into array
        numberFromData.push(input.dataset.key);
        // THEN output the result from all elements and delete the commas
        outputContainer.textContent = numberFromData.join('');
    }
    // ELSE IF numberFromData array length is less than nine 
    // AND the input data is a number AND zero exception from input.dataset.key
    else if (numberFromData.length < 9 && Number(input.dataset.key)) {
        // THEN push the number into array
        numberFromData.push(input.dataset.key);
        // THEN output the result from all elements and delete the commas
        outputContainer.textContent = numberFromData.join('');
    }
};




// ADD EVENT LISTENER delegation to any button clicked
calculatorContainer.addEventListener('click', (event) => {
    // TODO: make condition whether event.target is the operation or a number

    isNumberWasInputed(event.target);
    // PRINT out clicked number button to output
    // outputContainer.textContent = event.target.textContent;
});