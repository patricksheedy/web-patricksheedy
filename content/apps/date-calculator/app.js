document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const modeContents = document.querySelectorAll('.mode-content');
  
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('between-from').value = today;
  document.getElementById('between-to').value = today;
  document.getElementById('add-date').value = today;
  document.getElementById('business-from').value = today;
  document.getElementById('business-to').value = today;

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const mode = this.getAttribute('data-mode');
      modeContents.forEach(content => content.style.display = 'none');
      document.getElementById('mode-' + mode).style.display = 'block';
    });
  });

  document.getElementById('between-calc').addEventListener('click', function() {
    const from = new Date(document.getElementById('between-from').value);
    const to = new Date(document.getElementById('between-to').value);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    document.getElementById('between-days').textContent = diffDays.toLocaleString();
    document.getElementById('between-alt').textContent = `${years} years, ${months} months, ${days} days`;
    document.getElementById('between-result').style.display = 'block';
  });

  function calculateAddSubtract(isAdd) {
    const date = new Date(document.getElementById('add-date').value);
    const years = parseInt(document.getElementById('add-years').value) || 0;
    const months = parseInt(document.getElementById('add-months').value) || 0;
    const days = parseInt(document.getElementById('add-days').value) || 0;
    
    const multiplier = isAdd ? 1 : -1;
    date.setFullYear(date.getFullYear() + years * multiplier);
    date.setMonth(date.getMonth() + months * multiplier);
    date.setDate(date.getDate() + days * multiplier);
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('add-result-date').textContent = date.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('add-result-day').textContent = dayNames[date.getDay()];
    document.getElementById('add-result').style.display = 'block';
  }

  document.getElementById('add-btn-add').addEventListener('click', () => calculateAddSubtract(true));
  document.getElementById('add-btn-sub').addEventListener('click', () => calculateAddSubtract(false));

  document.getElementById('business-calc').addEventListener('click', function() {
    const from = new Date(document.getElementById('business-from').value);
    const to = new Date(document.getElementById('business-to').value);
    
    let businessDays = 0;
    let weekendDays = 0;
    let current = new Date(from);
    
    while (current <= to) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      } else {
        weekendDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    document.getElementById('business-days').textContent = businessDays.toLocaleString();
    document.getElementById('business-weekends').textContent = weekendDays.toLocaleString();
    document.getElementById('business-result').style.display = 'block';
  });
});
