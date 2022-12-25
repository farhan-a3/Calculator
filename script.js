const display = document.getElementById("display number");
const decimalButton = document.querySelector(".decimal");
const numberButtons = document.getElementsByClassName("number");
const operationButtons = document.getElementsByClassName("operator");

let firstNumber;
let operation;
let firstNumberAvailable = false;
let secondNumberAvailable = false;

// map operation strings to js math operations
const operations = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y
};

for (let button of numberButtons) {
    // add functions to all number buttons to append the number to the display
    button.addEventListener("click", () => {
        if (!firstNumberAvailable) {
            display.innerHTML = button.value;
            firstNumberAvailable = true;
        } else {
            display.innerHTML += button.value;
        }
    });
}

for (let button of operationButtons) {
    if (!secondNumberAvailable) {
        button.addEventListener("click", () => {
            firstNumber = parseFloat(display.innerHTML);
            firstNumberAvailable = true;
            secondNumberAvailable = true;
            operation = button.value;
            display.innerHTML = "";
        });
    }
}

function addDecimal() {
    // add decimal only if there isnt a decimal already
    if (!display.innerHTML.includes(".")) {
        display.innerHTML += decimalButton.value;
    }
}

function clearDisplay() {
    // reset back to 0
    display.innerHTML = "0";
    firstNumberAvailable = false;
    secondNumberAvailable = false;
}

function equals() {
    if (secondNumberAvailable && display.innerHTML != "") {
        let secondNumber = parseFloat(display.innerHTML);
        let result = operations[operation](firstNumber, secondNumber);
        display.innerHTML = result;
        firstNumber = result;
        firstNumberAvailable = false;
        secondNumberAvailable = false;
    }
}