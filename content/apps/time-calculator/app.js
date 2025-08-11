document.addEventListener('DOMContentLoaded', function() {
  const time1Input = document.getElementById('time1');
  const time2Input = document.getElementById('time2');
  const operationSelect = document.getElementById('operation');
  const calculateBtn = document.getElementById('calculate');
  const resultDisplay = document.getElementById('result');
  const totalMinutesDisplay = document.getElementById('total-minutes');
  const totalHoursDisplay = document.getElementById('total-hours');
  function toMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }
  function toHHMM(mins) {
    const h = Math.floor(Math.abs(mins) / 60);
    const m = Math.abs(mins) % 60;
    return (mins < 0 ? '-' : '') + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }
  function update() {
    const t1 = toMinutes(time1Input.value);
    const t2 = toMinutes(time2Input.value);
    let total = operationSelect.value === 'add' ? t1 + t2 : t1 - t2;
    resultDisplay.textContent = toHHMM(total);
    totalMinutesDisplay.textContent = total;
    totalHoursDisplay.textContent = (total / 60).toFixed(2);
  }
  calculateBtn.addEventListener('click', update);
  update();
});
