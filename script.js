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
	return (divisor === 0 ? "Division by zero error." : dividend / divisor);
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
	displayElement.textContent = (message === "" ? "0" : message);
}

const roundForDisplay = function(places) {
	let arrayOfNumber = Array.from(queue[0].toString());
	let decimalPosition = arrayOfNumber.findIndex((element) => element === ".");
	if (decimalPosition === -1) return;

	let decimalLength = arrayOfNumber.slice(decimalPosition).length;
	if (decimalLength > places + 1) {
		queue[0] = queue[0].toFixed(places);
	}
}

const updateQueue = function(buttonLabel) {
	let value = buttonLabel;
	switch (getQueueAction(value)) {
		case ("append"):
			queue.push(value);
			break;
		case ("combine"):
			queue[queue.length - 1] += value;
			break;
		case ("overwrite"):
			queue.pop();
			queue.push(value);
			break;
		case ("negate"):
			let negated = (-parseFloat(queue.pop())).toString();
			queue.push(negated);
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

	let lastValue = getLastQueueItem();
	if ((value === "=" && !isQueueReady(true))) return;
	if (value === "Delete") return "clear";
	if (value === "Backspace") return "remove";
	if (value === "`" && isNumber(lastValue)) return "negate";
	if ((isOperator(lastValue) && isOperator(value)) || (queue.length === 0) && isNumber(value)) {
		return "overwrite";
	}
	if ((isNumber(lastValue) && isNumber(value)) || (isNumber(lastValue) && !Array.from(lastValue)
			.includes(".") && value === ".")) {
		return "combine";
	}
	if ((isNumber(value) && isOperator(lastValue)) || (isNumber(lastValue) && isOperator(value))) {
		return "append";
	}
}

const solveQueue = function() {
  let lastQueueItem = getLastQueueItem();
	if (lastQueueItem === "=") {
		queue = [calcOperate(queue[0], queue[2], queue[1])];
	} else {
		let trailingOperator = lastQueueItem;
		queue = [calcOperate(queue[0], queue[2], queue[1]), trailingOperator];
	}
}

const isQueueReady = function(inputEquals = false) {
	if ((queue.length > 3) || (queue.length === 3 && inputEquals)) return true;
}

const isNumber = function(value) {
  if ((value === "")) return false;
	return !isNaN(value);
}

const isOperator = function(value) {
	let operators = ["+", "-", "*", "/", "^", "=",];
	if (operators.includes(value)) return true;
	return false;
}

const isUtility = function(value) {
  let utilities = ["`", "Backspace", "Delete", "Enter", "-+",];
  if (utilities.includes(value)) return true;
  return false;
}

const getLastQueueItem = function() {
  return queue[queue.length - 1];
}



const getSound = function(buttonLabel) {
	if (isNumber(buttonLabel)) {
    return sounds["number"]; 
  } else if (isOperator(buttonLabel)) {
    return sounds["operator"];
  } else if (isUtility(buttonLabel)) {
    return sounds["utility"];
  } return null;
}

const playSound = function(audio) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}

const handleCalculatorInput = function(buttonLabel) {
	updateQueue(buttonLabel);
	if (isQueueReady()) {
		solveQueue();
		roundForDisplay(decimalRounding);
	}
	updateDisplay(queue.join(" "));
};

const toggleMute = function() {
	mute = !mute;
  let muteButton = document.querySelector("#mute");
	muteButton.textContent = mute ? "Unmute" : "Mute";
}

const processButton = function(e) {
  let buttonLabel = e.srcElement.getAttribute("data-key");
  if (!mute) {
		let soundEffect = getSound(buttonLabel);
		playSound(soundEffect);
	}
  if (buttonLabel === "m") {
    toggleMute(e);
  } else {
    handleCalculatorInput(buttonLabel);
  }
}

const processKey = function(e) {
  let buttonLabel = e.key;
  if (!mute) {
		let soundEffect = getSound(buttonLabel);
		playSound(soundEffect);
	}
  if (buttonLabel === "m") {
    toggleMute(e);
  } 
  handleCalculatorInput(buttonLabel);
}

const setupInput = function(calcButtonsSelector, muteButtonSelector) {
  let buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    button.addEventListener("click", processButton);
  }
  window.addEventListener("keydown", processKey)
}

let queue = [];
let sounds = {
	"number": new Audio("./resources/number.wav"),
	"operator": new Audio("./resources/operator.wav"),
	"utility": new Audio("./resources/utility.wav"),
};
let mute = false;
let decimalRounding = 8;

setupInput(".button-row button", "#mute");

//Sounds generated with jfxr @ https://jfxr.frozenfractal.com/