document.addEventListener('DOMContentLoaded', function () {
  var display = document.getElementById('display');
  var keys = document.getElementById('keys');
  var current = '0';
  var stack = [];
  var overwrite = false;
  var error = false;

  function updateDisplay() {
    display.textContent = current;
  }

  function clearAll() {
    current = '0';
    stack = [];
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
    if (overwrite && stack.length) {
      stack[stack.length - 1] = op;
      return;
    }
    stack.push(current);
    stack.push(op);
    overwrite = true;
  }

  function compute() {
    if (error) clearAll();
    var expr = '';
    if (stack.length) {
      expr = stack.join(' ') + ' ' + current;
    } else {
      expr = current;
    }
    try {
      var math = window.math;
      if (!math) {
        current = 'Error';
        error = true;
        updateDisplay();
        return;
      }
      var result = math.evaluate(expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/mod/g, '%'));
      if (typeof result === 'number' && !isFinite(result)) {
        current = 'Error';
        error = true;
      } else {
        current = String(result);
      }
    } catch {
      current = 'Error';
      error = true;
    }
    stack = [];
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

  function toggleSign() {
    if (error) clearAll();
    if (current.startsWith('-')) current = current.slice(1);
    else if (current !== '0') current = '-' + current;
    updateDisplay();
  }

  function inputConstant(name) {
    if (error) clearAll();
    if (overwrite) {
      current = name === 'pi' ? String(Math.PI) : String(Math.E);
      overwrite = false;
    } else {
      if (current === '0') current = name === 'pi' ? String(Math.PI) : String(Math.E);
      else current += name === 'pi' ? String(Math.PI) : String(Math.E);
    }
    updateDisplay();
  }

  function inputFunction(fn) {
    if (error) clearAll();
    var math = window.math;
    var val = parseFloat(current);
    var result;
    try {
      if (fn === 'sin') result = math.sin(math.unit(val, 'deg'));
      else if (fn === 'cos') result = math.cos(math.unit(val, 'deg'));
      else if (fn === 'tan') result = math.tan(math.unit(val, 'deg'));
      else if (fn === 'arcsin') result = math.asin(val) * 180 / Math.PI;
      else if (fn === 'arccos') result = math.acos(val) * 180 / Math.PI;
      else if (fn === 'arctan') result = math.atan(val) * 180 / Math.PI;
      else if (fn === 'ln') result = math.log(val);
      else if (fn === 'log') result = math.log10(val);
      else if (fn === 'sqrt') result = math.sqrt(val);
      else if (fn === 'x2') result = math.pow(val, 2);
      else if (fn === 'x3') result = math.pow(val, 3);
      else if (fn === 'pow') {
        var y = prompt('Enter exponent:', '2');
        if (!y || isNaN(y)) return;
        result = math.pow(val, parseFloat(y));
      }
      else if (fn === 'recip') {
        if (val === 0) {
          current = 'Error';
          error = true;
          updateDisplay();
          return;
        }
        result = 1 / val;
      }
      else if (fn === 'abs') result = math.abs(val);
      else if (fn === 'exp') result = math.exp(val);
      else if (fn === '10x') result = math.pow(10, val);
      else if (fn === 'factorial') result = math.factorial(val);
      else if (fn === 'percent') result = val / 100;
      else if (fn === 'nthroot') {
        var n = prompt('Root degree (n):', '2');
        if (!n || isNaN(n)) return;
        result = math.nthRoot(val, parseFloat(n));
      } else return;
      if (typeof result === 'number' && !isFinite(result)) {
        current = 'Error';
        error = true;
      } else {
        current = String(result);
      }
    } catch {
      current = 'Error';
      error = true;
    }
    overwrite = true;
    updateDisplay();
  }

  keys.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof HTMLElement)) return;
    var digit = t.getAttribute('data-digit');
    var op = t.getAttribute('data-op');
    var action = t.getAttribute('data-action');
    var fn = t.getAttribute('data-fn');
    if (digit) inputDigit(digit);
    else if (op) setOperator(op);
    else if (action === 'equals') compute();
    else if (action === 'clear') clearAll();
    else if (action === 'backspace') backspace();
    else if (action === 'dot') inputDot();
    else if (action === 'sign') toggleSign();
    else if (fn === 'pi') inputConstant('pi');
    else if (fn === 'e') inputConstant('e');
    else if (fn) inputFunction(fn);
  });

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k >= '0' && k <= '9') inputDigit(k);
    else if (k === '.') inputDot();
    else if (k === '+') setOperator('+');
    else if (k === '-') setOperator('-');
    else if (k === '*' || k === 'x' || k === 'X') setOperator('×');
    else if (k === '/') setOperator('÷');
    else if (k === '^') setOperator('^');
    else if (k === 'Enter' || k === '=') {
      e.preventDefault();
      compute();
    } else if (k === 'Backspace') backspace();
    else if (k === 'Escape' || k === 'Delete') clearAll();
    else if (k === '%') inputFunction('percent');
  });

  updateDisplay();
  if (!window.math) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjs@11.8.2/lib/browser/math.js';
    script.onload = function () {};
    document.head.appendChild(script);
  }
});
