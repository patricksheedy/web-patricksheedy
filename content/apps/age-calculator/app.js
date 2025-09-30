document.addEventListener('DOMContentLoaded', function() {
  const birthdateInput = document.getElementById('birthdate');
  const calculateBtn = document.getElementById('calculate-btn');
  const results = document.getElementById('results');
  
  const ageYears = document.getElementById('age-years');
  const ageMonths = document.getElementById('age-months');
  const ageDays = document.getElementById('age-days');
  const totalMonths = document.getElementById('total-months');
  const totalDays = document.getElementById('total-days');
  const totalHours = document.getElementById('total-hours');
  const totalMinutes = document.getElementById('total-minutes');
  const nextBirthdayDate = document.getElementById('next-birthday-date');
  const nextBirthdayCountdown = document.getElementById('next-birthday-countdown');
  const birthDayOfWeek = document.getElementById('birth-day-of-week');
  const zodiacSign = document.getElementById('zodiac-sign');
  const birthStone = document.getElementById('birth-stone');
  const generation = document.getElementById('generation');

  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  birthdateInput.max = maxDate;
  
  const defaultDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
  birthdateInput.value = defaultDate.toISOString().split('T')[0];

  const zodiacSigns = [
    { name: 'Capricorn', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', start: [2, 19], end: [3, 20] },
    { name: 'Aries', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', start: [6, 21], end: [7, 22] },
    { name: 'Leo', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', start: [8, 23], end: [9, 22] },
    { name: 'Libra', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];

  const birthStones = ['Garnet', 'Amethyst', 'Aquamarine', 'Diamond', 'Emerald', 'Pearl', 
                       'Ruby', 'Peridot', 'Sapphire', 'Opal', 'Topaz', 'Turquoise'];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function getZodiacSign(month, day) {
    for (let sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name;
      }
    }
    return zodiacSigns[0].name;
  }

  function getGeneration(year) {
    if (year >= 1997 && year <= 2012) return 'Generation Z';
    if (year >= 1981 && year <= 1996) return 'Millennial';
    if (year >= 1965 && year <= 1980) return 'Generation X';
    if (year >= 1946 && year <= 1964) return 'Baby Boomer';
    if (year >= 1928 && year <= 1945) return 'Silent Generation';
    if (year < 1928) return 'Greatest Generation';
    return 'Generation Alpha';
  }

  function calculateAge() {
    const birthdate = new Date(birthdateInput.value);
    if (isNaN(birthdate)) {
      alert('Please enter a valid birthdate');
      return;
    }

    const now = new Date();
    let years = now.getFullYear() - birthdate.getFullYear();
    let months = now.getMonth() - birthdate.getMonth();
    let days = now.getDate() - birthdate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDaysValue = Math.floor((now - birthdate) / (1000 * 60 * 60 * 24));
    const totalHoursValue = Math.floor((now - birthdate) / (1000 * 60 * 60));
    const totalMinutesValue = Math.floor((now - birthdate) / (1000 * 60));
    const totalMonthsValue = years * 12 + months;

    ageYears.textContent = years;
    ageMonths.textContent = months;
    ageDays.textContent = days;
    totalMonths.textContent = totalMonthsValue.toLocaleString();
    totalDays.textContent = totalDaysValue.toLocaleString();
    totalHours.textContent = totalHoursValue.toLocaleString();
    totalMinutes.textContent = totalMinutesValue.toLocaleString();

    let nextBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
    
    nextBirthdayDate.textContent = nextBirthday.toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    nextBirthdayCountdown.textContent = `${daysUntilBirthday} days`;

    birthDayOfWeek.textContent = dayNames[birthdate.getDay()];
    zodiacSign.textContent = getZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());
    birthStone.textContent = birthStones[birthdate.getMonth()];
    generation.textContent = getGeneration(birthdate.getFullYear());

    results.style.display = 'block';
  }

  calculateBtn.addEventListener('click', calculateAge);
  
  birthdateInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculateAge();
    }
  });
});
