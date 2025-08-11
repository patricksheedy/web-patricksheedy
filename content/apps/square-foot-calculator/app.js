document.addEventListener('DOMContentLoaded', function() {
  const lengthInput = document.getElementById('length');
  const widthInput = document.getElementById('width');
  const unitSelect = document.getElementById('unit');
  const calculateBtn = document.getElementById('calculate');
  const areaFtDisplay = document.getElementById('area-ft');
  const areaMDisplay = document.getElementById('area-m');
  const areaInDisplay = document.getElementById('area-in');
  const areaChartCanvas = document.getElementById('area-chart');
  let areaChart;
  function getArea(length, width, unit) {
    let l = parseFloat(length);
    let w = parseFloat(width);
    if (unit === 'ft') return { ft: l * w, m: l * w * 0.092903, in: l * w * 144 };
    if (unit === 'm') return { ft: l * w * 10.7639, m: l * w, in: l * w * 1550 };
    if (unit === 'in') return { ft: l * w / 144, m: l * w / 1550, in: l * w };
    if (unit === 'cm') return { ft: l * w * 0.00107639, m: l * w * 0.0001, in: l * w * 0.155 };
    return { ft: 0, m: 0, in: 0 };
  }
  function formatNumber(val) {
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  function update() {
    const length = lengthInput.value;
    const width = widthInput.value;
    const unit = unitSelect.value;
    const area = getArea(length, width, unit);
    areaFtDisplay.textContent = formatNumber(area.ft);
    areaMDisplay.textContent = formatNumber(area.m);
    areaInDisplay.textContent = formatNumber(area.in);
    if (areaChart) areaChart.destroy();
    const ctx = areaChartCanvas.getContext('2d');
    areaChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['sq ft', 'sq m', 'sq in'],
        datasets: [{
          data: [area.ft, area.m, area.in],
          backgroundColor: ['#00bcd4', '#4caf50', '#ff9800'],
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
