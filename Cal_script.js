const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const action = button.dataset.action;

    if (action === "clear") {
      currentInput = "";
    } else if (action === "backspace") {
      currentInput = currentInput.slice(0, -1);
    } else if (action === "equals") {
      calculateResult();
      return;
    } else if (action === "percent") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
      }
    } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
      handleOperator(action);
    } else {
      handleNumber(value);
    }

    updateDisplay();
  });
});

function handleOperator(action) {
  if (resultDisplayed) resultDisplayed = false;
  const lastChar = currentInput.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  const opMap = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/"
  };

  currentInput += opMap[action];
}

function handleNumber(value) {
  if (resultDisplayed) {
    currentInput = "";
    resultDisplayed = false;
  }

  if (value === ".") {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const last = parts[parts.length - 1];
    if (last.includes(".")) return;
  }

  currentInput += value;
}

function updateDisplay() {
  display.value = currentInput;
}

function calculateResult() {
  try {
    if (["+", "-", "*", "/"].includes(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }
    let result = eval(currentInput);
    if (!isFinite(result)) {
      display.value = "Error";
      currentInput = "";
    } else {
      display.value = result;
      currentInput = result.toString();
      resultDisplayed = true;
    }
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}
