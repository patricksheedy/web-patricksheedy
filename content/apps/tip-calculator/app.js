document.addEventListener('DOMContentLoaded', function() {
  const billInput = document.getElementById('bill');
  const tipInput = document.getElementById('tip');
  const peopleInput = document.getElementById('people');
  const calculateBtn = document.getElementById('calculate');
  const tipAmountDisplay = document.getElementById('tip-amount');
  const totalBillDisplay = document.getElementById('total-bill');
  const perPersonDisplay = document.getElementById('per-person');
  function formatCurrency(val) {
    return '$' + Number(val).toFixed(2);
  }
  function update() {
    const bill = parseFloat(billInput.value) || 0;
    const tip = parseFloat(tipInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const tipAmount = bill * tip / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    tipAmountDisplay.textContent = formatCurrency(tipAmount);
    totalBillDisplay.textContent = formatCurrency(total);
    perPersonDisplay.textContent = formatCurrency(perPerson);
  }
  calculateBtn.addEventListener('click', update);
  update();
});
