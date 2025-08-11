document.addEventListener('DOMContentLoaded', function() {
  const principalInput = document.getElementById('principal');
  const rateInput = document.getElementById('rate');
  const yearsInput = document.getElementById('years');
  const frequencySelect = document.getElementById('frequency');
  const calculateBtn = document.getElementById('calculate');
  const futureValueDisplay = document.getElementById('future-value');
  const totalInterestDisplay = document.getElementById('total-interest');
  const growthChartCanvas = document.getElementById('growth-chart');
  let growthChart;
  function formatCurrency(val) {
    return '$' + Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  function calculate() {
    const P = parseFloat(principalInput.value) || 0;
    const r = (parseFloat(rateInput.value) || 0) / 100;
    const n = parseInt(frequencySelect.value);
    const t = parseInt(yearsInput.value) || 0;
    const FV = P * Math.pow(1 + r / n, n * t);
    const interest = FV - P;
    futureValueDisplay.textContent = formatCurrency(FV);
    totalInterestDisplay.textContent = formatCurrency(interest);
    const data = [];
    for (let i = 0; i <= t; i++) {
      data.push(P * Math.pow(1 + r / n, n * i));
    }
    if (growthChart) growthChart.destroy();
    const ctx = growthChartCanvas.getContext('2d');
    growthChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({length: t + 1}, (_, i) => `Year ${i}`),
        datasets: [{
          label: 'Investment Value',
          data: data,
          borderColor: '#43a047',
          backgroundColor: 'rgba(67,160,71,0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
                if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'K';
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
  calculateBtn.addEventListener('click', calculate);
  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = calculate;
    document.head.appendChild(script);
  } else {
    calculate();
  }
});
