document.addEventListener('DOMContentLoaded', function() {
  const homeValueInput = document.getElementById('home-value');
  const mortgageBalanceInput = document.getElementById('mortgage-balance');
  const ltvRatioSelect = document.getElementById('ltv-ratio');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTermSelect = document.getElementById('loan-term');
  const calculateBtn = document.getElementById('calculate');
  
  const availableEquityDisplay = document.getElementById('available-equity');
  const monthlyPaymentDisplay = document.getElementById('monthly-payment');
  const totalInterestDisplay = document.getElementById('total-interest');
  
  const mortgageProgress = document.getElementById('mortgage-progress');
  const equityProgress = document.getElementById('equity-progress');
  const availableProgress = document.getElementById('available-progress');
  
  function calculateEquity() {
    const homeValue = parseFloat(homeValueInput.value);
    const mortgageBalance = parseFloat(mortgageBalanceInput.value);
    const ltvRatio = parseFloat(ltvRatioSelect.value) / 100;
    const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
    const loanTerm = parseInt(loanTermSelect.value) * 12;
    
    if (isNaN(homeValue) || isNaN(mortgageBalance) || homeValue <= 0 || mortgageBalance < 0) {
      alert('Please enter valid home value and mortgage balance');
      return;
    }
    
    const totalEquity = homeValue - mortgageBalance;
    const maxLoanAmount = (homeValue * ltvRatio) - mortgageBalance;
    const availableEquity = Math.max(0, maxLoanAmount);
    
    if (availableEquity <= 0) {
      availableEquityDisplay.textContent = '$0.00';
      monthlyPaymentDisplay.textContent = '$0.00';
      totalInterestDisplay.textContent = '$0.00';
      updateEquityVisualization(homeValue, mortgageBalance, totalEquity, 0);
      return;
    }
    
    const x = Math.pow(1 + interestRate, loanTerm);
    const monthlyPayment = (availableEquity * x * interestRate) / (x - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - availableEquity;
    
    availableEquityDisplay.textContent = formatCurrency(availableEquity);
    monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
    totalInterestDisplay.textContent = formatCurrency(totalInterest);
    
    updateEquityVisualization(homeValue, mortgageBalance, totalEquity - availableEquity, availableEquity);
  }
  
  function updateEquityVisualization(homeValue, mortgageBalance, currentEquity, availableEquity) {
    const mortgagePercent = (mortgageBalance / homeValue) * 100;
    const currentEquityPercent = (currentEquity / homeValue) * 100;
    const availableEquityPercent = (availableEquity / homeValue) * 100;
    
    mortgageProgress.style.width = mortgagePercent + '%';
    mortgageProgress.setAttribute('aria-valuenow', mortgagePercent);
    
    equityProgress.style.width = currentEquityPercent + '%';
    equityProgress.setAttribute('aria-valuenow', currentEquityPercent);
    
    availableProgress.style.width = availableEquityPercent + '%';
    availableProgress.setAttribute('aria-valuenow', availableEquityPercent);
  }
  
  function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  calculateBtn.addEventListener('click', calculateEquity);
  
  calculateEquity();
});
