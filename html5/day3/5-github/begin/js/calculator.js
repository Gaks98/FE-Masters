let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector('.screen');

function buttonClick(value){
  //if value is not a number
  //meaning it's a symbol
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  }
  else {
    handleNumber(value);
  }
  //display the current value of the buffer
  rerender();
}

function handleNumber(value){
  if (buffer === "0") {
    buffer = value;
  } else {
    //whatever is in the buffer we concatenate to make a single number
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}


function handleSymbol(value){
  switch (value) {
    //if user clicks the clear button everything is cleared
    case "C":
      buffer = "0";
      runningTotal = "0";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      //do the math
      flushOperation(parseInt(buffer));
      //then reset back to null 'cause we don't want any other operation performed after the equal sign has been pressed
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0"
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() { 
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
      buttonClick(event.target.innerText)
    });
  console.log('clicked');
}

init();