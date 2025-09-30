document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const modeContents = document.querySelectorAll('.mode-content');
  
  const basicPercent = document.getElementById('basic-percent');
  const basicValue = document.getElementById('basic-value');
  const basicResult = document.getElementById('basic-result');
  const basicExplanation = document.getElementById('basic-explanation');
  
  const iswhatX = document.getElementById('iswhat-x');
  const iswhatY = document.getElementById('iswhat-y');
  const iswhatResult = document.getElementById('iswhat-result');
  const iswhatExplanation = document.getElementById('iswhat-explanation');
  
  const changeFrom = document.getElementById('change-from');
  const changeTo = document.getElementById('change-to');
  const changeResult = document.getElementById('change-result');
  const changeExplanation = document.getElementById('change-explanation');
  
  const discountPrice = document.getElementById('discount-price');
  const discountPercent = document.getElementById('discount-percent');
  const discountAmount = document.getElementById('discount-amount');
  const discountFinal = document.getElementById('discount-final');
  const discountSavings = document.getElementById('discount-savings');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const mode = this.getAttribute('data-mode');
      modeContents.forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById('mode-' + mode).style.display = 'block';
    });
  });

  function calculateBasic() {
    const percent = parseFloat(basicPercent.value) || 0;
    const value = parseFloat(basicValue.value) || 0;
    const result = (percent / 100) * value;
    
    basicResult.textContent = result.toFixed(2).replace(/\.?0+$/, '');
    basicExplanation.textContent = `${percent}% of ${value} = (${percent} ÷ 100) × ${value} = ${result.toFixed(2)}`;
  }

  function calculateIsWhat() {
    const x = parseFloat(iswhatX.value) || 0;
    const y = parseFloat(iswhatY.value) || 1;
    const percent = (x / y) * 100;
    
    iswhatResult.textContent = percent.toFixed(2).replace(/\.?0+$/, '') + '%';
    iswhatExplanation.textContent = `${x} is ${percent.toFixed(2)}% of ${y} = (${x} ÷ ${y}) × 100 = ${percent.toFixed(2)}%`;
  }

  function calculateChange() {
    const from = parseFloat(changeFrom.value) || 0;
    const to = parseFloat(changeTo.value) || 0;
    const change = ((to - from) / from) * 100;
    const sign = change >= 0 ? '+' : '';
    const direction = change >= 0 ? 'increase' : 'decrease';
    
    changeResult.textContent = sign + change.toFixed(2).replace(/\.?0+$/, '') + '%';
    changeResult.className = 'result-value ' + (change >= 0 ? 'text-success' : 'text-danger');
    changeExplanation.textContent = `Change = ((${to} - ${from}) ÷ ${from}) × 100 = ${sign}${change.toFixed(2)}% ${direction}`;
  }

  function calculateDiscount() {
    const price = parseFloat(discountPrice.value) || 0;
    const percent = parseFloat(discountPercent.value) || 0;
    const amount = (percent / 100) * price;
    const final = price - amount;
    
    discountAmount.textContent = '$' + amount.toFixed(2);
    discountFinal.textContent = '$' + final.toFixed(2);
    discountSavings.textContent = `$${amount.toFixed(2)} (${percent}%)`;
  }

  basicPercent.addEventListener('input', calculateBasic);
  basicValue.addEventListener('input', calculateBasic);
  
  iswhatX.addEventListener('input', calculateIsWhat);
  iswhatY.addEventListener('input', calculateIsWhat);
  
  changeFrom.addEventListener('input', calculateChange);
  changeTo.addEventListener('input', calculateChange);
  
  discountPrice.addEventListener('input', calculateDiscount);
  discountPercent.addEventListener('input', calculateDiscount);

  calculateBasic();
  calculateIsWhat();
  calculateChange();
  calculateDiscount();
});
