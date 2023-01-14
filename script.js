class Calculator {
    constructor (secondaryDisplayText, mainDisplayText) {
        this.secondaryDisplayText = secondaryDisplayText;
        this.mainDisplayText = mainDisplayText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }
    delete() {
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
        this.updateDisplay();
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }   
    calculate() {

    }
    updateDisplay() {
        this.mainDisplayText.innerText = this.currentOperand;
        this.secondaryDisplayText.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-allclear]');
const secondaryDisplay = document.querySelector('[data-secondary-display]');
const mainDisplay = document.querySelector('[data-main-display]');

const calculator = new Calculator(secondaryDisplay, mainDisplay);

numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allclearButton.addEventListener('click', () => {
    calculator.clear();
})
