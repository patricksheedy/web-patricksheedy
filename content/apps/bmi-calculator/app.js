document.addEventListener('DOMContentLoaded', function() {
  const metricRadio = document.getElementById('metric');
  const imperialRadio = document.getElementById('imperial');
  const metricInputs = document.getElementById('metric-inputs');
  const imperialInputs = document.getElementById('imperial-inputs');
  const calculateBtn = document.getElementById('calculate-btn');
  const recalculateBtn = document.getElementById('recalculate-btn');
  const formContainer = document.querySelector('.form-container');
  const resultContainer = document.getElementById('result-container');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const bmiChart = document.getElementById('bmi-chart');
  const gaugeContainer = document.getElementById('gauge-container');
  const heightLabelMetric = document.getElementById('height-label-metric');
  const weightLabelMetric = document.getElementById('weight-label-metric');
  const heightLabelImperial = document.getElementById('height-label-imperial');
  const weightLabelImperial = document.getElementById('weight-label-imperial');
  
  let currentUnits = 'metric';
  let gaugeChart = null;
  
  function initBmiChart() {
    bmiChart.innerHTML = `
      <div class="chart-section section-underweight"></div>
      <div class="chart-section section-normal"></div>
      <div class="chart-section section-overweight"></div>
      <div class="chart-section section-obese"></div>
    `;
  }
  
  function toggleUnits() {
    if (currentUnits === 'metric') {
      metricInputs.classList.remove('d-none');
      imperialInputs.classList.add('d-none');
      heightLabelMetric.textContent = 'Height (cm)';
      weightLabelMetric.textContent = 'Weight (kg)';
    } else {
      metricInputs.classList.add('d-none');
      imperialInputs.classList.remove('d-none');
      heightLabelImperial.textContent = 'Height (ft/in)';
      weightLabelImperial.textContent = 'Weight (lbs)';
    }
  }
  
  function calculateBMI() {
    let bmi;
    let height;
    let weight;
    
    if (currentUnits === 'metric') {
      height = parseFloat(document.getElementById('height-cm').value) / 100; // cm to m
      weight = parseFloat(document.getElementById('weight-kg').value);
      
      if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return null;
      }
      
      bmi = weight / (height * height);
    } else {
      const heightFt = parseFloat(document.getElementById('height-ft').value) || 0;
      const heightIn = parseFloat(document.getElementById('height-in').value) || 0;
      weight = parseFloat(document.getElementById('weight-lbs').value);
      
      if ((!heightFt && !heightIn) || !weight || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return null;
      }
      
      height = heightFt * 12 + heightIn; // convert to inches
      bmi = (weight / (height * height)) * 703; // imperial BMI formula
    }
    
    return bmi;
  }
  
  function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: '#4dabf7' };
    else if (bmi < 25) return { category: 'Normal weight', color: '#51cf66' };
    else if (bmi < 30) return { category: 'Overweight', color: '#fcc419' };
    else return { category: 'Obesity', color: '#ff6b6b' };
  }
  
  function updateBMIDisplay(bmi) {
    const { category, color } = getBMICategory(bmi);
    bmiValue.textContent = bmi.toFixed(1);
    bmiCategory.textContent = category;
    bmiCategory.style.color = color;
    
    // Set marker position on the chart
    const position = calculateMarkerPosition(bmi);
    bmiChart.classList.add('has-marker');
    bmiChart.style.setProperty('--highlight-color', color);
    bmiChart.style.setProperty('--marker-position', `${position}%`);
    bmiChart.style.setProperty('--marker-left', `${position}%`);
    
    // Position the marker
    const chartWidth = bmiChart.offsetWidth;
    const markerPosition = chartWidth * (position / 100);
    bmiChart.style.setProperty('left', `${markerPosition}px`);
    
    // Update or create gauge chart
    updateGauge(bmi, color);
    
    formContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');
  }
  
  function calculateMarkerPosition(bmi) {
    // The chart goes from BMI 10 to 40
    // Map the BMI value to a percentage position on the chart
    let position;
    
    if (bmi <= 10) position = 0;
    else if (bmi >= 40) position = 100;
    else {
      // Calculate position based on BMI ranges
      if (bmi < 18.5) {
        // Underweight: 0% to 15%
        position = (bmi - 10) / (18.5 - 10) * 15;
      } else if (bmi < 25) {
        // Normal: 15% to 40%
        position = 15 + (bmi - 18.5) / (25 - 18.5) * 25;
      } else if (bmi < 30) {
        // Overweight: 40% to 65%
        position = 40 + (bmi - 25) / (30 - 25) * 25;
      } else {
        // Obese: 65% to 100%
        position = 65 + (bmi - 30) / (40 - 30) * 35;
      }
    }
    
    return position;
  }
  
  function updateGauge(bmi, color) {
    // Load Chart.js if not loaded
    if (typeof Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => createGaugeChart(bmi, color);
      document.head.appendChild(script);
    } else {
      createGaugeChart(bmi, color);
    }
  }
  
  function createGaugeChart(bmi, color) {
    // Destroy previous chart if exists
    if (gaugeChart) {
      gaugeChart.destroy();
    }
    
    const ctx = document.createElement('canvas');
    gaugeContainer.innerHTML = '';
    gaugeContainer.appendChild(ctx);
    
    // Calculate angle based on BMI (10-40 range mapped to 0-180 degrees)
    let angle = 0;
    if (bmi <= 10) angle = 0;
    else if (bmi >= 40) angle = 180;
    else angle = ((bmi - 10) / 30) * 180;
    
    const data = {
      datasets: [{
        data: [angle, 180 - angle],
        backgroundColor: [color, '#e9ecef'],
        borderWidth: 0
      }]
    };
    
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        circumference: 180,
        rotation: 270,
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200 },
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false }
        }
      }
    };
    
    gaugeChart = new Chart(ctx, config);
    
    // Add needle
    const needleValue = bmi;
    const min = 10;
    const max = 40;
    const needleAngle = ((needleValue - min) / (max - min)) * Math.PI;
    
    const centerX = gaugeChart.chartArea.width / 2;
    const centerY = gaugeChart.chartArea.height;
    const needleLength = gaugeChart.chartArea.width * 0.35;
    const needleWidth = 2;
    
    const canvas = gaugeChart.canvas;
    const ctx2 = canvas.getContext('2d');
    
    ctx2.save();
    ctx2.translate(centerX, centerY);
    ctx2.rotate(needleAngle);
    
    // Draw needle
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.lineTo(needleLength, 0);
    ctx2.lineWidth = needleWidth;
    ctx2.strokeStyle = color;
    ctx2.stroke();
    
    // Draw circle at needle base
    ctx2.beginPath();
    ctx2.arc(0, 0, 5, 0, Math.PI * 2);
    ctx2.fillStyle = color;
    ctx2.fill();
    
    ctx2.restore();
  }
  
  function resetForm() {
    resultContainer.classList.add('d-none');
    formContainer.classList.remove('d-none');
    document.getElementById('height-cm').value = '';
    document.getElementById('weight-kg').value = '';
    document.getElementById('height-ft').value = '';
    document.getElementById('height-in').value = '';
    document.getElementById('weight-lbs').value = '';
    bmiChart.classList.remove('has-marker');
  }
  
  // Initialize events
  metricRadio.addEventListener('change', () => {
    currentUnits = 'metric';
    toggleUnits();
  });
  
  imperialRadio.addEventListener('change', () => {
    currentUnits = 'imperial';
    toggleUnits();
  });
  
  calculateBtn.addEventListener('click', () => {
    const bmi = calculateBMI();
    if (bmi !== null) {
      updateBMIDisplay(bmi);
    }
  });
  
  recalculateBtn.addEventListener('click', resetForm);
  
  // Initialize chart on load
  initBmiChart();
});
