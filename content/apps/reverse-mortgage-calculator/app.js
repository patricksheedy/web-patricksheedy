document.addEventListener('DOMContentLoaded', function() {
  const homeValueInput = document.getElementById('home-value');
  const ageInput = document.getElementById('age');
  const mortgageBalanceInput = document.getElementById('mortgage-balance');
  const interestRateInput = document.getElementById('interest-rate');
  const calculateBtn = document.getElementById('calculate');
  const proceedsDisplay = document.getElementById('proceeds');
  const ltvDisplay = document.getElementById('ltv');
  const equityDisplay = document.getElementById('equity');
  const chartCanvas = document.getElementById('reverse-chart');
  let chart;

  function getPrincipalLimitFactor(age, rate) {
    if (age < 62) return 0;
    if (age > 90) age = 90;
    let base = 0.27 + (age - 62) * 0.011;
    base -= (rate - 5) * 0.01;
    if (base > 0.75) base = 0.75;
    if (base < 0.2) base = 0.2;
    return base;
  }

  function formatCurrency(val) {
    return '$' + Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  function update() {
    const homeValue = parseFloat(homeValueInput.value) || 0;
    const age = parseInt(ageInput.value) || 0;
    const mortgageBalance = parseFloat(mortgageBalanceInput.value) || 0;
    const rate = parseFloat(interestRateInput.value) || 0;
    const plf = getPrincipalLimitFactor(age, rate);
    const maxProceeds = homeValue * plf;
    const netProceeds = Math.max(0, maxProceeds - mortgageBalance);
    const ltv = plf * 100;
    const remainingEquity = Math.max(0, homeValue - netProceeds - mortgageBalance);

    proceedsDisplay.textContent = formatCurrency(netProceeds);
    ltvDisplay.textContent = ltv.toFixed(1) + '%';
    equityDisplay.textContent = formatCurrency(remainingEquity);

    if (chart) chart.destroy();
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Proceeds', 'Remaining Equity', 'Mortgage Balance'],
        datasets: [{
          data: [netProceeds, remainingEquity, mortgageBalance],
          backgroundColor: ['#8e24aa', '#43a047', '#fbc02d'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  calculateBtn.addEventListener('click', update);

  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = update;
    document.head.appendChild(script);
  } else {
    update();
  }
});
