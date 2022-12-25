const display = document.getElementById("display number");
const decimalButton = document.querySelector(".decimal");
const numberButtons = document.getElementsByClassName("number");
const operationButtons = document.getElementsByClassName("operator");

let firstNumber;
let operation;
let awaitingSecondNumber = false;

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
        if (display.innerHTML == "0") {
            display.innerHTML = button.value;
        } else {
            display.innerHTML += button.value;
        }
    });
}

for (let button of operationButtons) {
    if (!awaitingSecondNumber) {
        button.addEventListener("click", () => {
            firstNumber = parseFloat(display.innerHTML);
            awaitingSecondNumber = true;
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
    awaitingSecondNumber = false;
}

function equals() {
    if (awaitingSecondNumber && display.innerHTML != "") {
        let secondNumber = parseFloat(display.innerHTML);
        let result = operations[operation](firstNumber, secondNumber);
        display.innerHTML = result;
        firstNumber = result;
        awaitingSecondNumber = false;
    }
}