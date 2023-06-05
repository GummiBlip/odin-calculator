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

let firstNumber;
let secondNumber;
let operator;

