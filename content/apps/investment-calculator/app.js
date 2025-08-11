document.addEventListener('DOMContentLoaded', function() {
  const initialInvestmentInput = document.getElementById('initial-investment');
  const interestRateLumpInput = document.getElementById('interest-rate-lump');
  const investmentTimeLumpInput = document.getElementById('investment-time-lump');
  const compoundFrequencySelect = document.getElementById('compound-frequency');
  
  const initialInvestmentRegInput = document.getElementById('initial-investment-reg');
  const contributionAmountInput = document.getElementById('contribution-amount');
  const contributionFrequencySelect = document.getElementById('contribution-frequency');
  const interestRateRegInput = document.getElementById('interest-rate-reg');
  const investmentTimeRegInput = document.getElementById('investment-time-reg');
  
  const calculateBtn = document.getElementById('calculate');
  const futureValueDisplay = document.getElementById('future-value');
  const totalContributionsDisplay = document.getElementById('total-contributions');
  const interestEarnedDisplay = document.getElementById('interest-earned');
  const investmentChartCanvas = document.getElementById('investment-chart');
  
  const lumpSumTab = document.getElementById('lump-sum-tab');
  const regularContributionTab = document.getElementById('regular-contribution-tab');
  
  let currentCalculationType = 'lump';
  let investmentChart;
  
  lumpSumTab.addEventListener('click', function() {
    currentCalculationType = 'lump';
  });
  
  regularContributionTab.addEventListener('click', function() {
    currentCalculationType = 'regular';
  });

  function calculateInvestment() {
    if (currentCalculationType === 'lump') {
      calculateLumpSum();
    } else {
      calculateRegularContributions();
    }
  }
  
  function calculateLumpSum() {
    const principal = parseFloat(initialInvestmentInput.value);
    const rate = parseFloat(interestRateLumpInput.value) / 100;
    const time = parseInt(investmentTimeLumpInput.value);
    const frequency = parseInt(compoundFrequencySelect.value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time <= 0) {
      alert('Please enter valid values');
      return;
    }
    
    const futureValue = principal * Math.pow(1 + (rate / frequency), frequency * time);
    const interestEarned = futureValue - principal;
    
    futureValueDisplay.textContent = formatCurrency(futureValue);
    totalContributionsDisplay.textContent = formatCurrency(principal);
    interestEarnedDisplay.textContent = formatCurrency(interestEarned);
    
    const yearlyData = calculateYearlyData(principal, rate, time, frequency, 0, 0);
    updateChart(yearlyData, principal);
  }
  
  function calculateRegularContributions() {
    const initialPrincipal = parseFloat(initialInvestmentRegInput.value);
    const contributionAmount = parseFloat(contributionAmountInput.value);
    const contributionFrequency = parseInt(contributionFrequencySelect.value);
    const rate = parseFloat(interestRateRegInput.value) / 100;
    const time = parseInt(investmentTimeRegInput.value);
    
    if (isNaN(initialPrincipal) || isNaN(contributionAmount) || isNaN(rate) || isNaN(time) || 
        initialPrincipal < 0 || contributionAmount < 0 || rate < 0 || time <= 0) {
      alert('Please enter valid values');
      return;
    }
    
    const yearlyData = calculateYearlyData(initialPrincipal, rate, time, 12, contributionAmount, contributionFrequency);
    const futureValue = yearlyData[yearlyData.length - 1].value;
    
    const periodicContributions = contributionAmount * contributionFrequency * time;
    const totalContributions = initialPrincipal + periodicContributions;
    const interestEarned = futureValue - totalContributions;
    
    futureValueDisplay.textContent = formatCurrency(futureValue);
    totalContributionsDisplay.textContent = formatCurrency(totalContributions);
    interestEarnedDisplay.textContent = formatCurrency(interestEarned);
    
    updateChart(yearlyData, initialPrincipal, contributionAmount * contributionFrequency);
  }
  
  function calculateYearlyData(initialPrincipal, annualRate, years, compoundFrequency, contribution = 0, contributionFrequency = 0) {
    const data = [];
    let currentValue = initialPrincipal;
    const contributionsPerCompound = contributionFrequency / compoundFrequency;
    
    for (let year = 0; year <= years; year++) {
      data.push({
        year: year,
        value: currentValue
      });
      
      if (year < years) {
        for (let i = 0; i < compoundFrequency; i++) {
          currentValue = currentValue * (1 + (annualRate / compoundFrequency));
          if (contribution > 0) {
            currentValue += contribution * contributionsPerCompound;
          }
        }
      }
    }
    
    return data;
  }
  
  function updateChart(yearlyData, initialInvestment, annualContribution = 0) {
    const years = yearlyData.map(d => `Year ${d.year}`);
    const values = yearlyData.map(d => d.value);
    
    const contributionsData = [initialInvestment];
    let totalContribution = initialInvestment;
    
    for (let i = 1; i < yearlyData.length; i++) {
      totalContribution += annualContribution;
      contributionsData.push(totalContribution);
    }
    
    if (investmentChart) {
      investmentChart.destroy();
    }
    
    const ctx = investmentChartCanvas.getContext('2d');
    investmentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Investment Value',
            data: values,
            borderColor: '#fd7e14',
            backgroundColor: 'rgba(253, 126, 20, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.1
          },
          {
            label: 'Contributions',
            data: contributionsData,
            borderColor: '#6c757d',
            borderDash: [5, 5],
            borderWidth: 1,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
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
  
  calculateBtn.addEventListener('click', calculateInvestment);
  
  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = calculateLumpSum;
    document.head.appendChild(script);
  } else {
    calculateLumpSum();
  }
});
