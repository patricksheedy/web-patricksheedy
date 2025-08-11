document.addEventListener('DOMContentLoaded', function() {
  const currentAgeInput = document.getElementById('current-age');
  const retirementAgeInput = document.getElementById('retirement-age');
  const currentSavingsInput = document.getElementById('current-savings');
  const annualContributionInput = document.getElementById('annual-contribution');
  const expectedReturnInput = document.getElementById('expected-return');
  const inflationRateInput = document.getElementById('inflation-rate');
  const calculateBtn = document.getElementById('calculate');
  
  const retirementSavingsDisplay = document.getElementById('retirement-savings');
  const yearsToRetirementDisplay = document.getElementById('years-to-retirement');
  const monthlyIncomeDisplay = document.getElementById('monthly-income');
  const savingsChartCanvas = document.getElementById('savings-chart');
  
  let savingsChart;

  function calculateRetirement() {
    const currentAge = parseInt(currentAgeInput.value);
    const retirementAge = parseInt(retirementAgeInput.value);
    const currentSavings = parseFloat(currentSavingsInput.value);
    const annualContribution = parseFloat(annualContributionInput.value);
    const expectedReturn = parseFloat(expectedReturnInput.value) / 100;
    const inflationRate = parseFloat(inflationRateInput.value) / 100;
    
    if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(currentSavings) || 
        isNaN(annualContribution) || isNaN(expectedReturn) || isNaN(inflationRate)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }
    
    if (currentAge >= retirementAge) {
      alert('Retirement age must be greater than current age');
      return;
    }
    
    const yearsToRetirement = retirementAge - currentAge;
    const realReturnRate = (1 + expectedReturn) / (1 + inflationRate) - 1;
    
    let futureValue = currentSavings;
    const yearlyData = [{ year: 0, savings: futureValue }];
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      futureValue = futureValue * (1 + realReturnRate) + annualContribution;
      yearlyData.push({ year: year, savings: futureValue });
    }
    
    const monthlyIncomeAt4Percent = (futureValue * 0.04) / 12;
    
    retirementSavingsDisplay.textContent = formatCurrency(futureValue);
    yearsToRetirementDisplay.textContent = yearsToRetirement;
    monthlyIncomeDisplay.textContent = formatCurrency(monthlyIncomeAt4Percent);
    
    updateChart(yearlyData);
  }
  
  function updateChart(yearlyData) {
    const years = yearlyData.map(d => `Year ${d.year}`);
    const savings = yearlyData.map(d => d.savings);
    
    if (savingsChart) {
      savingsChart.destroy();
    }
    
    const ctx = savingsChartCanvas.getContext('2d');
    savingsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years.filter((_, i) => i % Math.max(1, Math.floor(years.length / 10)) === 0),
        datasets: [{
          label: 'Projected Savings',
          data: savings.filter((_, i) => i % Math.max(1, Math.floor(savings.length / 10)) === 0),
          borderColor: '#6f42c1',
          backgroundColor: 'rgba(111, 66, 193, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                if (value >= 1000000) {
                  return '$' + (value / 1000000).toFixed(1) + 'M';
                } else if (value >= 1000) {
                  return '$' + (value / 1000).toFixed(0) + 'K';
                }
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
  
  function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  calculateBtn.addEventListener('click', calculateRetirement);
  
  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = calculateRetirement;
    document.head.appendChild(script);
  } else {
    calculateRetirement();
  }
});
