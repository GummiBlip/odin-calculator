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

const updateQueue = function(e) {
	let value = e.srcElement.textContent;
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

	let lastValue = queue[queue.length - 1];
	if ((value === "=" && !isQueueReady(true))) return;
	if (value === "AC") return "clear";
	if (value === "DEL") return "remove";
	if (value === "-+" && isNumber(lastValue)) return "negate";
	if ((isOperator(lastValue) && isOperator(value)) || (queue.length === 0) && !isOperator(value)) {
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
	if (queue[queue.length - 1] === "=") {
		queue = [calcOperate(queue[0], queue[2], queue[1])];
	} else {
		let trailingOperator = queue[queue.length - 1];
		queue = [calcOperate(queue[0], queue[2], queue[1]), trailingOperator];
	}
}

const isQueueReady = function(inputEquals = false) {
	if ((queue.length > 3) || (queue.length === 3 && inputEquals)) return true;
}

const isNumber = function(value) {
	return !isNaN(value);
}

const isOperator = function(value) {
	let operators = ["+", "-", "*", "/", "^", "="];
	if (operators.includes(value)) return true;
	return false;
}

const getSound = function(e) {
	let classes = e.srcElement.classList;
	if (classes.contains("number")) {
		return sounds["number"];
	} else if (classes.contains("operator")) {
		return sounds["operator"];
	} else if (classes.contains("utility")) {
		return sounds["utility"];
	}
}

const playSound = function(audio) {
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

const handleCalculatorClick = function(e) {
	if (!mute) {
		let soundEffect = getSound(e);
		playSound(soundEffect);
	}
	updateQueue(e);
	if (isQueueReady()) {
		solveQueue();
		roundForDisplay(8);
	}
	updateDisplay(queue.join(" "));
};

const toggleMute = function() {
	mute = !mute;
	muteButton.textContent = mute ? "Unmute" : "Mute";
}

let queue = [];
let sounds = {
	"number": new Audio("./resources/number.wav"),
	"operator": new Audio("./resources/operator.wav"),
	"utility": new Audio("./resources/utility.wav"),
};
let mute = false;
let muteButton = document.querySelector("#mute");

for (button of document.querySelectorAll(".button-row button")) {
	button.addEventListener("click", handleCalculatorClick);
}
muteButton.addEventListener("click", toggleMute);

//Sounds generated with jfxr @ https://jfxr.frozenfractal.com/