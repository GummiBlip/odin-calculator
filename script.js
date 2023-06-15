const calcAdd = function(augend, addend) {
  return (augend + addend);
};

const calcSubtract = function(subtrahend, minuend) {
  return (subtrahend - minuend);
};

const calcMultiply = function(multiplicand, multiplier) {
  return (multiplicand * multiplier);
}

const calcDivide = function(dividend, divisor) {
  return (divisor === 0 ? "Division by zero error" : dividend / divisor);
}

const calcPower = function(base, exponent) {
	return base ** exponent;
};

const calcOperate = function(primaryNumber, secondaryNumber, operator) {
  switch (operator) {
    case ("+"):
      return calcAdd(primaryNumber, secondaryNumber);
    case ("-"):
      return calcSubtract(primaryNumber, secondaryNumber);
    case ("*"):
      return calcMultiply(primaryNumber, secondaryNumber);
    case ("/"):
      return calcDivide(primaryNumber, secondaryNumber);
    case ("^"):
      return calcPower(primaryNumber, secondaryNumber);
  }
};

const updateDisplay = function(displayElement = document.querySelector("#display"), message) {
  displayElement.textContent = message;
}

const updateQueue = function(event) {
  let value = event.srcElement.textContent;
  switch (getQueueAction(value)) {
    case ("append"):
      queue.push(value)
      break;
    case ("combine"):
      queue[queue.length - 1] += value;
      break;
    case ("overwrite"):
      queue.pop();
      queue.push(value);
      break;
    case ("remove"):
      queue.pop();
      break;
    case ("clear"):
      queue = [];
      break;
  }
}

const getQueueAction = function(value) {
  
  let lastValue = queue.slice(-1)[0];
  console.log(lastValue)
  if ((isOperator(lastValue) && isOperator(value)) || (queue.length === 0)) {
    return "overwrite";
  }
  else if (lastValue[-1] === ".") {
    console.log(true);
  }
  else if ((isNumber(lastValue) && isNumber(value)) || (isNumber(lastValue) && !Array.from(lastValue).includes(".") && value === ".")) {
    return "combine";
  }
  else if ((isNumber(value) && isOperator(lastValue)) || (isNumber(lastValue) && isOperator(value))) {
    return "append";
  }
}

let queue = [];

const isNumber = function(value) {
  return !isNaN(value);
}

const isOperator = function(value) {
  let operators = ["+","-","*","/","^"];
  if (operators.includes(value)) {
    return true;
  } else {
    return false;
  }
}

for (button of document.querySelectorAll(".button-row button")) {
  button.addEventListener("click", function(e) {
    updateQueue(e);
    console.log(queue);
  });
}