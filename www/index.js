import { fib } from "fibonacci-wasm";
const userInput = document.getElementById("user-input");
const result = document.getElementById("result");
const pref = document.getElementById("pref");
const controller = document.getElementById("controller");
const state = {
  isCalculating: false,
  lastInput: 0
};

userInput.onkeypress = e => {
  if (state.isCalculating) return;
  result.innerHTML = "";
  pref.innerHTML = "";
  userInput.classList.remove("is-danger");
  controller.classList.remove("is-loading");
  if (e.keyCode == 13) {
    controller.classList.add("is-loading");
    result.innerHTML = "Calculating...";
    state.isCalculating = true;
    userInput.disabled = true;
    state.lastInput = userInput.value;
    setTimeout(() => {
      if (state.isCalculating && userInput.value.length >= 10) {
        result.innerHTML = "Hmmm, just give me a sec...";
      }
    }, 500);
    setTimeout(() => {
      // don't block the UI thread
      calculate(userInput.value);
    }, 1);
  }
};

const calculate = n => {
  try {
    // Bigint
    const t1 = performance.now();
    const seqResultRust = fib(n);
    const t2 = performance.now();
    const perfRust = t2 - t1;
    pref.innerHTML += `Calculated result in ${perfRust * 1000} μs`;
    result.innerHTML = `<strong>Result</strong>: ${seqResultRust}`;
    state.isCalculating = false;
    userInput.disabled = false;
    controller.classList.remove("is-loading");
  } catch (e) {
    state.isCalculating = false;
    userInput.disabled = false;
    result.innerHTML = `Oh no, we have an error:  ${e.message}`;
    controller.classList.remove("is-loading");
    userInput.classList.add("is-danger");
    console.log(`Error ! for '${state.lastInput}'`);
    console.error(e);
  }
};
