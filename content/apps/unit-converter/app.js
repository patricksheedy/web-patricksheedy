document.addEventListener('DOMContentLoaded', function() {
  const category = document.getElementById('category');
  const fromValue = document.getElementById('from-value');
  const toValue = document.getElementById('to-value');
  const fromUnit = document.getElementById('from-unit');
  const toUnit = document.getElementById('to-unit');
  const swapBtn = document.getElementById('swap-btn');
  const formulaDisplay = document.getElementById('formula-display');
  const quickTable = document.getElementById('quick-table');

  const units = {
    length: {
      meter: { name: 'Meters (m)', factor: 1 },
      kilometer: { name: 'Kilometers (km)', factor: 0.001 },
      centimeter: { name: 'Centimeters (cm)', factor: 100 },
      millimeter: { name: 'Millimeters (mm)', factor: 1000 },
      mile: { name: 'Miles (mi)', factor: 0.000621371 },
      yard: { name: 'Yards (yd)', factor: 1.09361 },
      foot: { name: 'Feet (ft)', factor: 3.28084 },
      inch: { name: 'Inches (in)', factor: 39.3701 },
      nauticalMile: { name: 'Nautical Miles', factor: 0.000539957 }
    },
    weight: {
      kilogram: { name: 'Kilograms (kg)', factor: 1 },
      gram: { name: 'Grams (g)', factor: 1000 },
      milligram: { name: 'Milligrams (mg)', factor: 1000000 },
      pound: { name: 'Pounds (lb)', factor: 2.20462 },
      ounce: { name: 'Ounces (oz)', factor: 35.274 },
      ton: { name: 'Tons (US)', factor: 0.00110231 },
      metricTon: { name: 'Metric Tons', factor: 0.001 }
    },
    temperature: {
      celsius: { name: 'Celsius (°C)' },
      fahrenheit: { name: 'Fahrenheit (°F)' },
      kelvin: { name: 'Kelvin (K)' }
    },
    volume: {
      liter: { name: 'Liters (L)', factor: 1 },
      milliliter: { name: 'Milliliters (mL)', factor: 1000 },
      gallon: { name: 'Gallons (US)', factor: 0.264172 },
      quart: { name: 'Quarts (US)', factor: 1.05669 },
      pint: { name: 'Pints (US)', factor: 2.11338 },
      cup: { name: 'Cups (US)', factor: 4.22675 },
      fluidOunce: { name: 'Fluid Ounces (US)', factor: 33.814 },
      tablespoon: { name: 'Tablespoons (US)', factor: 67.628 },
      cubicMeter: { name: 'Cubic Meters (m³)', factor: 0.001 }
    },
    area: {
      squareMeter: { name: 'Square Meters (m²)', factor: 1 },
      squareKilometer: { name: 'Square Kilometers (km²)', factor: 0.000001 },
      squareFoot: { name: 'Square Feet (ft²)', factor: 10.7639 },
      squareYard: { name: 'Square Yards (yd²)', factor: 1.19599 },
      squareMile: { name: 'Square Miles (mi²)', factor: 3.861e-7 },
      acre: { name: 'Acres', factor: 0.000247105 },
      hectare: { name: 'Hectares (ha)', factor: 0.0001 }
    },
    speed: {
      meterPerSecond: { name: 'Meters/second (m/s)', factor: 1 },
      kilometerPerHour: { name: 'Kilometers/hour (km/h)', factor: 3.6 },
      milePerHour: { name: 'Miles/hour (mph)', factor: 2.23694 },
      knot: { name: 'Knots (kn)', factor: 1.94384 },
      footPerSecond: { name: 'Feet/second (ft/s)', factor: 3.28084 }
    },
    time: {
      second: { name: 'Seconds (s)', factor: 1 },
      minute: { name: 'Minutes (min)', factor: 0.0166667 },
      hour: { name: 'Hours (h)', factor: 0.000277778 },
      day: { name: 'Days (d)', factor: 1.1574e-5 },
      week: { name: 'Weeks (wk)', factor: 1.6534e-6 },
      month: { name: 'Months (avg)', factor: 3.8052e-7 },
      year: { name: 'Years (yr)', factor: 3.171e-8 }
    },
    data: {
      byte: { name: 'Bytes (B)', factor: 1 },
      kilobyte: { name: 'Kilobytes (KB)', factor: 0.001 },
      megabyte: { name: 'Megabytes (MB)', factor: 0.000001 },
      gigabyte: { name: 'Gigabytes (GB)', factor: 1e-9 },
      terabyte: { name: 'Terabytes (TB)', factor: 1e-12 },
      bit: { name: 'Bits (b)', factor: 8 }
    }
  };

  function populateUnits(cat) {
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    const unitSet = units[cat];
    
    Object.keys(unitSet).forEach((key, index) => {
      const option1 = document.createElement('option');
      option1.value = key;
      option1.textContent = unitSet[key].name;
      fromUnit.appendChild(option1);
      
      const option2 = document.createElement('option');
      option2.value = key;
      option2.textContent = unitSet[key].name;
      toUnit.appendChild(option2);
      
      if (index === 1) toUnit.value = key;
    });
    
    convert();
  }

  function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;
    
    if (to === 'celsius') return celsius;
    if (to === 'fahrenheit') return celsius * 9/5 + 32;
    return celsius + 273.15;
  }

  function convert() {
    const cat = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(fromValue.value) || 0;
    
    let result;
    if (cat === 'temperature') {
      result = convertTemperature(value, from, to);
    } else {
      const fromFactor = units[cat][from].factor;
      const toFactor = units[cat][to].factor;
      const baseValue = value / fromFactor;
      result = baseValue * toFactor;
    }
    
    toValue.value = result.toFixed(10).replace(/\.?0+$/, '');
    updateFormula(cat, from, to, value, result);
    updateQuickTable(cat, from, to);
  }

  function updateFormula(cat, from, to, value, result) {
    const fromName = units[cat][from].name.split('(')[0].trim();
    const toName = units[cat][to].name.split('(')[0].trim();
    
    if (cat === 'temperature') {
      if (from === 'celsius' && to === 'fahrenheit') {
        formulaDisplay.textContent = `${value}°C × 9/5 + 32 = ${result.toFixed(2)}°F`;
      } else if (from === 'fahrenheit' && to === 'celsius') {
        formulaDisplay.textContent = `(${value}°F - 32) × 5/9 = ${result.toFixed(2)}°C`;
      } else if (from === 'celsius' && to === 'kelvin') {
        formulaDisplay.textContent = `${value}°C + 273.15 = ${result.toFixed(2)}K`;
      } else if (from === 'kelvin' && to === 'celsius') {
        formulaDisplay.textContent = `${value}K - 273.15 = ${result.toFixed(2)}°C`;
      } else if (from === 'fahrenheit' && to === 'kelvin') {
        formulaDisplay.textContent = `(${value}°F - 32) × 5/9 + 273.15 = ${result.toFixed(2)}K`;
      } else {
        formulaDisplay.textContent = `(${value}K - 273.15) × 9/5 + 32 = ${result.toFixed(2)}°F`;
      }
    } else {
      const fromFactor = units[cat][from].factor;
      const toFactor = units[cat][to].factor;
      const multiplier = (toFactor / fromFactor).toFixed(10).replace(/\.?0+$/, '');
      formulaDisplay.textContent = `${value} ${fromName} × ${multiplier} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${toName}`;
    }
  }

  function updateQuickTable(cat, from, to) {
    const values = [1, 5, 10, 25, 50, 100];
    let html = '<table class="table table-sm table-bordered"><thead><tr><th>' + 
               units[cat][from].name + '</th><th>' + units[cat][to].name + '</th></tr></thead><tbody>';
    
    values.forEach(val => {
      let result;
      if (cat === 'temperature') {
        result = convertTemperature(val, from, to);
      } else {
        const fromFactor = units[cat][from].factor;
        const toFactor = units[cat][to].factor;
        result = (val / fromFactor) * toFactor;
      }
      html += `<tr><td>${val}</td><td>${result.toFixed(4).replace(/\.?0+$/, '')}</td></tr>`;
    });
    
    html += '</tbody></table>';
    quickTable.innerHTML = html;
  }

  category.addEventListener('change', () => populateUnits(category.value));
  fromValue.addEventListener('input', convert);
  fromUnit.addEventListener('change', convert);
  toUnit.addEventListener('change', convert);

  swapBtn.addEventListener('click', () => {
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;
    convert();
  });

  populateUnits('length');
});
