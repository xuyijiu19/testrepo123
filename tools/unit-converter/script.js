// Factors convert 1 unit into the category's base unit (meters, kilograms).
const UNITS = {
  length: {
    base: 'm',
    units: {
      m: { label: 'Meters (m)', factor: 1 },
      km: { label: 'Kilometers (km)', factor: 1000 },
      cm: { label: 'Centimeters (cm)', factor: 0.01 },
      mi: { label: 'Miles (mi)', factor: 1609.344 },
      ft: { label: 'Feet (ft)', factor: 0.3048 },
      in: { label: 'Inches (in)', factor: 0.0254 },
    },
  },
  weight: {
    base: 'kg',
    units: {
      kg: { label: 'Kilograms (kg)', factor: 1 },
      g: { label: 'Grams (g)', factor: 0.001 },
      lb: { label: 'Pounds (lb)', factor: 0.45359237 },
      oz: { label: 'Ounces (oz)', factor: 0.028349523125 },
    },
  },
  temperature: {
    units: {
      c: { label: 'Celsius (°C)' },
      f: { label: 'Fahrenheit (°F)' },
      k: { label: 'Kelvin (K)' },
    },
  },
};

const TEMPERATURE_TO_CELSIUS = {
  c: (v) => v,
  f: (v) => (v - 32) * (5 / 9),
  k: (v) => v - 273.15,
};

const CELSIUS_TO_TEMPERATURE = {
  c: (v) => v,
  f: (v) => v * (9 / 5) + 32,
  k: (v) => v + 273.15,
};

const categoryEl = document.getElementById('category');
const valueEl = document.getElementById('input-value');
const fromEl = document.getElementById('from-unit');
const toEl = document.getElementById('to-unit');
const resultEl = document.getElementById('result');

function populateUnitSelect(selectEl, category) {
  selectEl.innerHTML = '';
  for (const [key, unit] of Object.entries(UNITS[category].units)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = unit.label;
    selectEl.append(option);
  }
}

function convert() {
  const category = categoryEl.value;
  const value = parseFloat(valueEl.value);
  const fromUnit = fromEl.value;
  const toUnit = toEl.value;

  if (Number.isNaN(value)) {
    resultEl.textContent = 'Enter a valid number';
    return;
  }

  let converted;
  if (category === 'temperature') {
    const celsius = TEMPERATURE_TO_CELSIUS[fromUnit](value);
    converted = CELSIUS_TO_TEMPERATURE[toUnit](celsius);
  } else {
    const { units } = UNITS[category];
    const baseValue = value * units[fromUnit].factor;
    converted = baseValue / units[toUnit].factor;
  }

  const rounded = Math.round(converted * 1e6) / 1e6;
  resultEl.textContent = `${value} ${fromUnit} = ${rounded} ${toUnit}`;
}

function onCategoryChange() {
  const category = categoryEl.value;
  populateUnitSelect(fromEl, category);
  populateUnitSelect(toEl, category);
  if (toEl.options.length > 1) {
    toEl.selectedIndex = 1;
  }
  convert();
}

categoryEl.addEventListener('change', onCategoryChange);
valueEl.addEventListener('input', convert);
fromEl.addEventListener('change', convert);
toEl.addEventListener('change', convert);

onCategoryChange();
