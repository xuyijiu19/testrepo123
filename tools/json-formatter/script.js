const inputEl = document.getElementById('json-input');
const messageEl = document.getElementById('message');
const formatBtn = document.getElementById('format-btn');
const minifyBtn = document.getElementById('minify-btn');
const copyBtn = document.getElementById('copy-btn');

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

function clearMessage() {
  messageEl.className = 'message hidden';
}

function parseInput() {
  return JSON.parse(inputEl.value);
}

function format() {
  try {
    const parsed = parseInput();
    inputEl.value = JSON.stringify(parsed, null, 2);
    showMessage('Valid JSON, formatted.', 'success');
  } catch (err) {
    showMessage(`Invalid JSON: ${err.message}`, 'error');
  }
}

function minify() {
  try {
    const parsed = parseInput();
    inputEl.value = JSON.stringify(parsed);
    showMessage('Valid JSON, minified.', 'success');
  } catch (err) {
    showMessage(`Invalid JSON: ${err.message}`, 'error');
  }
}

async function copy() {
  try {
    await navigator.clipboard.writeText(inputEl.value);
    showMessage('Copied to clipboard.', 'success');
  } catch (err) {
    showMessage(`Couldn't copy: ${err.message}`, 'error');
  }
}

formatBtn.addEventListener('click', format);
minifyBtn.addEventListener('click', minify);
copyBtn.addEventListener('click', copy);
inputEl.addEventListener('input', clearMessage);
