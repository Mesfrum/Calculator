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
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand != '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calculate() {
        let comuputation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                comuputation = previous + current;
                break;
            case '-':
                comuputation = previous - current;
                break;
            case '*':
                comuputation = previous * current;
                break;
            case '/':
                comuputation = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = comuputation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.mainDisplayText.innerText = this.currentOperand;
        if (this.operation != null) {
            this.secondaryDisplayText.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.secondaryDisplayText.innerText = '';
        }
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
    calculator.updateDisplay();
})

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})