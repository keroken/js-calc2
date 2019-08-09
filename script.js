const calculator = {
  displayValue: '0',
  firstNum: null,
  waitingForSecondNum: false,
  operator: null
};
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

function inputDigit(digit) {
  const displayValue = calculator.displayValue;
  const waitingForSecondNum = calculator.waitingForSecondNum;
  
  if (waitingForSecondNum === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondNum = false;
  } else if (displayValue === '0') {
    calculator.displayValue = digit;
  } else {
    calculator.displayValue = displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondNum === true) return;

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue = calculator.displayValue + dot;
  }
}

function handleOperator(nextOperator) {
  const firstNum = calculator.firstNum;
  const displayValue = calculator.displayValue;
  const operator = calculator.operator;
  inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondNum) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstNum === null) {
    calculator.firstNum = inputValue;
  } else if (operator) {
    const result = calculate(firstNum, operator, inputValue);

    calculator.displayValue = String(result);
    calculator.firstNum = result;
  }

  calculator.waitingForSecondNum = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function calculate(firstNum, operator, secondNum) {
  switch(operator) {
    case 'add': 
      return firstNum + secondNum;
    case 'subtract':
      return firstNum - secondNum;
    case 'multiply':
      return firstNum * secondNum;
    case 'divide':
      return firstNum / secondNum;
    case 'calculate':
      return secondNum;
  }
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstNum = null;
  calculator.waitingForSecondNum = false;
  calculator.operator = null;
  console.log(calculator);
}

keys.addEventListener('click', (event) => {
  const target = event.target;

  console.log(target);
  console.log(target.textContent);
  
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.dataset.action);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.textContent);
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.textContent);
  updateDisplay();
});
