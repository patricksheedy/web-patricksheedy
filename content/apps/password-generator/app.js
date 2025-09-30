document.addEventListener('DOMContentLoaded', function() {
  const lengthSlider = document.getElementById('length-slider');
  const lengthValue = document.getElementById('length-value');
  const batchCount = document.getElementById('batch-count');
  const batchValue = document.getElementById('batch-value');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const passwordOutput = document.getElementById('password-output');
  const strengthText = document.getElementById('strength-text');
  const strengthBar = document.getElementById('strength-bar');
  const entropyText = document.getElementById('entropy-text');
  const batchResults = document.getElementById('batch-results');
  
  const uppercase = document.getElementById('uppercase');
  const lowercase = document.getElementById('lowercase');
  const numbers = document.getElementById('numbers');
  const symbols = document.getElementById('symbols');
  const avoidAmbiguous = document.getElementById('avoid-ambiguous');

  lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
  });

  batchCount.addEventListener('input', function() {
    batchValue.textContent = this.value;
  });

  function getCharacterSet() {
    let chars = '';
    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (avoidAmbiguous.checked) {
      upperChars = upperChars.replace(/[O]/g, '');
      lowerChars = lowerChars.replace(/[l]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
      symbolChars = symbolChars.replace(/[|]/g, '');
    }
    
    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;
    
    return chars;
  }

  function generatePassword(length) {
    const chars = getCharacterSet();
    if (chars.length === 0) return '';
    
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }
    
    return password;
  }

  function calculateEntropy(password) {
    const chars = getCharacterSet();
    const length = password.length;
    return Math.log2(Math.pow(chars.length, length));
  }

  function getStrength(entropy) {
    if (entropy < 50) return { text: 'Weak', color: 'danger', width: 20 };
    if (entropy < 65) return { text: 'Fair', color: 'warning', width: 40 };
    if (entropy < 80) return { text: 'Good', color: 'info', width: 60 };
    if (entropy < 100) return { text: 'Strong', color: 'primary', width: 80 };
    return { text: 'Very Strong', color: 'success', width: 100 };
  }

  function formatCrackTime(entropy) {
    const attempts = Math.pow(2, entropy);
    const attemptsPerSecond = 1e9;
    const seconds = attempts / attemptsPerSecond;
    
    if (seconds < 60) return `${seconds.toFixed(0)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(0)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(0)} hours`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(0)} days`;
    if (seconds < 31536000000) return `${(seconds / 31536000).toFixed(0)} years`;
    return `${(seconds / 31536000).toExponential(2)} years`;
  }

  function updateStrength(password) {
    const entropy = calculateEntropy(password);
    const strength = getStrength(entropy);
    
    strengthText.textContent = strength.text;
    strengthBar.className = `progress-bar bg-${strength.color}`;
    strengthBar.style.width = `${strength.width}%`;
    entropyText.textContent = `${entropy.toFixed(1)} bits of entropy • Crack time: ${formatCrackTime(entropy)}`;
  }

  generateBtn.addEventListener('click', function() {
    const length = parseInt(lengthSlider.value);
    const count = parseInt(batchCount.value);
    
    if (getCharacterSet().length === 0) {
      alert('Please select at least one character type!');
      return;
    }
    
    if (count === 1) {
      const password = generatePassword(length);
      passwordOutput.textContent = password;
      updateStrength(password);
      batchResults.innerHTML = '';
    } else {
      passwordOutput.textContent = `${count} passwords generated`;
      batchResults.innerHTML = '';
      
      for (let i = 0; i < count; i++) {
        const password = generatePassword(length);
        const div = document.createElement('div');
        div.className = 'batch-password';
        div.innerHTML = `
          <span class="password-text">${password}</span>
          <button class="btn btn-sm btn-outline-primary copy-batch" data-password="${password}">
            <i class="fas fa-copy"></i>
          </button>
        `;
        batchResults.appendChild(div);
      }
      
      const firstPassword = batchResults.querySelector('.password-text').textContent;
      updateStrength(firstPassword);
    }
  });

  copyBtn.addEventListener('click', function() {
    const text = passwordOutput.textContent;
    if (text === 'Click Generate' || text.includes('passwords generated')) return;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      copyBtn.classList.add('btn-success');
      copyBtn.classList.remove('btn-primary');
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('btn-success');
        copyBtn.classList.add('btn-primary');
      }, 1500);
    });
  });

  batchResults.addEventListener('click', function(e) {
    const btn = e.target.closest('.copy-batch');
    if (!btn) return;
    
    const password = btn.getAttribute('data-password');
    navigator.clipboard.writeText(password).then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.classList.add('btn-success');
      btn.classList.remove('btn-outline-primary');
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-outline-primary');
      }, 1500);
    });
  });

  generateBtn.click();
});
