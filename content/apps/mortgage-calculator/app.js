document.addEventListener('DOMContentLoaded', function() {
  const loanAmountInput = document.getElementById('loan-amount');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTermSelect = document.getElementById('loan-term');
  const calculateBtn = document.getElementById('calculate');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  const totalPaymentDisplay = document.getElementById('total-payment');
  const totalInterestDisplay = document.getElementById('total-interest');
  const paymentChartCanvas = document.getElementById('payment-chart');
  
  let paymentChart;

  function calculateMortgage() {
    const principal = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
    const loanTerm = parseInt(loanTermSelect.value) * 12;
    
    if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) {
      alert('Please enter valid values');
      return;
    }
    
    const x = Math.pow(1 + interestRate, loanTerm);
    const monthlyPayment = (principal * x * interestRate) / (x - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - principal;
    
    monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
    totalPaymentDisplay.textContent = formatCurrency(totalPayment);
    totalInterestDisplay.textContent = formatCurrency(totalInterest);
    
    updateChart(principal, totalInterest);
  }
  
  function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  function updateChart(principal, interest) {
    if (paymentChart) {
      paymentChart.destroy();
    }
    
    const ctx = paymentChartCanvas.getContext('2d');
    paymentChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [principal, interest],
          backgroundColor: ['#0d6efd', '#6610f2'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                label += formatCurrency(context.raw);
                return label;
              }
            }
          }
        }
      }
    });
  }
  
  calculateBtn.addEventListener('click', calculateMortgage);
  
  calculateMortgage();
  
  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = calculateMortgage;
    document.head.appendChild(script);
  }
});
