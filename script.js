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

    getDisplayNumber(number) {
        const stringNum = number.toString();
        const integerNum = parseFloat(stringNum.split('.')[0]);
        const decimalNum = stringNum.split('.')[1];

        let integerDisplay;
        if (isNaN(integerNum)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerNum.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalNum != null) {
            return `${integerDisplay}.${decimalNum}`;
        }
        else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.mainDisplayText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.secondaryDisplayText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
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

document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.ctrlKey && e.key == "Backspace") {
        calculator.clear();
        calculator.updateDisplay();
    }
    switch (e.key) {
        // del
        case "Backspace":
            calculator.delete();
            calculator.updateDisplay();
            break;

        // equals
        case "=":
        case "Enter":
            calculator.calculate();
            calculator.updateDisplay();
            break;

        // OPERATIONS 
        case "+":
        case "-":
        case "/":
        case "*":
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
            break;

        //NUMBERS
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            calculator.appendNumber(e.key);
            calculator.updateDisplay();
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
})