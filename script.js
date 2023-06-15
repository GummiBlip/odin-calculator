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
  primaryNumber = parseFloat(primaryNumber);
  secondaryNumber = parseFloat(secondaryNumber);
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

const updateDisplay = function(message, displayElement = document.querySelector("#display")) {
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
  
  let lastValue = queue[queue.length - 1];
  if ((isOperator(lastValue) && isOperator(value)) || (queue.length === 0)) {
    return "overwrite";
  }
  else if ((isNumber(lastValue) && isNumber(value)) || (isNumber(lastValue) && !Array.from(lastValue).includes(".") && value === ".")) {
    return "combine";
  }
  else if ((isNumber(value) && isOperator(lastValue)) || (isNumber(lastValue) && isOperator(value))) {
    return "append";
  }
}

const solveQueue = function() {
  if (queue[queue.length - 1] === "=") {
    queue = [calcOperate(queue[0], queue[2], queue[1])];
  }
  else {
    let trailingOperator = queue[queue.length - 1];
    queue = [calcOperate(queue[0], queue[2], queue[1]), trailingOperator];
  }
}

const isQueueReady = function() {
  if (queue.length > 3) return true;
}

const isNumber = function(value) {
  return !isNaN(value);
}

const isOperator = function(value) {
  let operators = ["+","-","*","/","^","="];
  if (operators.includes(value)) return true;
  return false;
}

for (button of document.querySelectorAll(".button-row button")) {
  button.addEventListener("click", function(e) {
    updateQueue(e);
    if (isQueueReady()) {
      solveQueue(); 
    }
    updateDisplay(queue.join(" "));
  });
}
let queue = [];