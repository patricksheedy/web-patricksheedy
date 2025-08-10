document.addEventListener('DOMContentLoaded', function () {
  var display = document.getElementById('display');
  var keys = document.getElementById('keys');
  var current = '0';
  var previous = null;
  var operator = null;
  var overwrite = false;
  var error = false;

  function updateDisplay() {
    display.textContent = current;
  }

  function clearAll() {
    current = '0';
    previous = null;
    operator = null;
    overwrite = false;
    error = false;
    updateDisplay();
  }

  function inputDigit(d) {
    if (error) clearAll();
    if (overwrite) {
      current = d;
      overwrite = false;
    } else {
      if (current === '0') current = d;
      else current += d;
    }
    updateDisplay();
  }

  function inputDot() {
    if (error) clearAll();
    if (overwrite) {
      current = '0.';
      overwrite = false;
      updateDisplay();
      return;
    }
    if (!current.includes('.')) {
      current += '.';
      updateDisplay();
    }
  }

  function setOperator(op) {
    if (error) clearAll();
    if (operator && !overwrite) compute();
    previous = parseFloat(current);
    operator = op;
    overwrite = true;
  }

  function compute() {
    if (previous === null || operator === null) return;
    var a = previous;
    var b = parseFloat(current);
    var result;
    if (operator === '÷' && b === 0) {
      current = 'Error';
      error = true;
      previous = null;
      operator = null;
      overwrite = true;
      updateDisplay();
      return;
    }
    if (operator === '+') result = a + b;
    else if (operator === '−' || operator === '-') result = a - b;
    else if (operator === '×' || operator === '*') result = a * b;
    else if (operator === '÷' || operator === '/') result = a / b;
    current = String(result);
    previous = null;
    operator = null;
    overwrite = true;
    updateDisplay();
  }

  function backspace() {
    if (error) {
      clearAll();
      return;
    }
    if (overwrite) return;
    if (current.length <= 1) current = '0';
    else current = current.slice(0, -1);
    updateDisplay();
  }

  keys.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof HTMLElement)) return;
    var digit = t.getAttribute('data-digit');
    var op = t.getAttribute('data-op');
    var action = t.getAttribute('data-action');
    if (digit) inputDigit(digit);
    else if (op) setOperator(op);
    else if (action === 'equals') compute();
    else if (action === 'clear') clearAll();
    else if (action === 'backspace') backspace();
    else if (action === 'dot') inputDot();
  });

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k >= '0' && k <= '9') inputDigit(k);
    else if (k === '.') inputDot();
    else if (k === '+' || k === '-') setOperator(k);
    else if (k === '*' || k === 'x' || k === 'X') setOperator('×');
    else if (k === '/') setOperator('÷');
    else if (k === 'Enter' || k === '=') {
      e.preventDefault();
      compute();
    } else if (k === 'Backspace') backspace();
    else if (k === 'Escape' || k === 'Delete') clearAll();
  });

  updateDisplay();
});
