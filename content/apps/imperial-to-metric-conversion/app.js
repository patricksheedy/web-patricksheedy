document.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.getElementById('category');
  const imperialInput = document.getElementById('imperial');
  const imperialUnitSelect = document.getElementById('imperial-unit');
  const metricUnitSelect = document.getElementById('metric-unit');
  const calculateBtn = document.getElementById('calculate');
  const metricValueDisplay = document.getElementById('metric-value');
  const units = {
    length: {
      imperial: [
        { name: 'Inch', value: 'in', factor: 0.0254 },
        { name: 'Foot', value: 'ft', factor: 0.3048 },
        { name: 'Yard', value: 'yd', factor: 0.9144 },
        { name: 'Mile', value: 'mi', factor: 1609.34 }
      ],
      metric: [
        { name: 'Millimeter', value: 'mm', factor: 1000 },
        { name: 'Centimeter', value: 'cm', factor: 100 },
        { name: 'Meter', value: 'm', factor: 1 },
        { name: 'Kilometer', value: 'km', factor: 0.001 }
      ]
    },
    weight: {
      imperial: [
        { name: 'Ounce', value: 'oz', factor: 0.0283495 },
        { name: 'Pound', value: 'lb', factor: 0.453592 },
        { name: 'Stone', value: 'st', factor: 6.35029 }
      ],
      metric: [
        { name: 'Gram', value: 'g', factor: 1000 },
        { name: 'Kilogram', value: 'kg', factor: 1 },
        { name: 'Metric Ton', value: 't', factor: 0.001 }
      ]
    },
    volume: {
      imperial: [
        { name: 'Fluid Ounce', value: 'floz', factor: 0.0295735 },
        { name: 'Pint', value: 'pt', factor: 0.473176 },
        { name: 'Quart', value: 'qt', factor: 0.946353 },
        { name: 'Gallon', value: 'gal', factor: 3.78541 }
      ],
      metric: [
        { name: 'Milliliter', value: 'ml', factor: 1000 },
        { name: 'Liter', value: 'l', factor: 1 }
      ]
    }
  };
  function populateUnits() {
    const cat = categorySelect.value;
    imperialUnitSelect.innerHTML = units[cat].imperial.map(u => `<option value="${u.value}">${u.name}</option>`).join('');
    metricUnitSelect.innerHTML = units[cat].metric.map(u => `<option value="${u.value}">${u.name}</option>`).join('');
  }
  function convert() {
    const cat = categorySelect.value;
    const impVal = parseFloat(imperialInput.value) || 0;
    const impUnit = imperialUnitSelect.value;
    const metUnit = metricUnitSelect.value;
    const imp = units[cat].imperial.find(u => u.value === impUnit);
    const met = units[cat].metric.find(u => u.value === metUnit);
    let meters = impVal * imp.factor;
    let metric = meters * met.factor;
    metricValueDisplay.textContent = metric.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }
  categorySelect.addEventListener('change', function() {
    populateUnits();
    convert();
  });
  imperialUnitSelect.addEventListener('change', convert);
  metricUnitSelect.addEventListener('change', convert);
  calculateBtn.addEventListener('click', convert);
  populateUnits();
  convert();
});
