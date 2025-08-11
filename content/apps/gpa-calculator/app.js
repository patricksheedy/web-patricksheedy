document.addEventListener('DOMContentLoaded', function() {
  const coursesList = document.getElementById('courses-list');
  const addCourseBtn = document.getElementById('add-course');
  const removeCourseBtn = document.getElementById('remove-course');
  const calculateBtn = document.getElementById('calculate');
  const gpaDisplay = document.getElementById('gpa');
  const totalCreditsDisplay = document.getElementById('total-credits');
  const totalPointsDisplay = document.getElementById('total-points');
  let courseCount = 3;
  function createCourseRow(i) {
    const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
    const gradeValues = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
    };
    const row = document.createElement('div');
    row.className = 'row mb-2';
    row.innerHTML = `
      <div class="col-6">
        <select class="form-select grade-select" data-idx="${i}">
          ${grades.map(g => `<option value="${g}">${g}</option>`).join('')}
        </select>
      </div>
      <div class="col-6">
        <input type="number" class="form-control credit-input" data-idx="${i}" min="0" value="3">
      </div>
    `;
    return row;
  }
  function renderCourses() {
    coursesList.innerHTML = '';
    for (let i = 0; i < courseCount; i++) {
      coursesList.appendChild(createCourseRow(i));
    }
  }
  function calculateGPA() {
    const gradeValues = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
    };
    const gradeSelects = coursesList.querySelectorAll('.grade-select');
    const creditInputs = coursesList.querySelectorAll('.credit-input');
    let totalPoints = 0, totalCredits = 0;
    for (let i = 0; i < gradeSelects.length; i++) {
      const grade = gradeSelects[i].value;
      const credits = parseFloat(creditInputs[i].value) || 0;
      totalPoints += gradeValues[grade] * credits;
      totalCredits += credits;
    }
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    gpaDisplay.textContent = gpa.toFixed(2);
    totalCreditsDisplay.textContent = totalCredits;
    totalPointsDisplay.textContent = totalPoints.toFixed(2);
  }
  addCourseBtn.addEventListener('click', function() {
    courseCount++;
    renderCourses();
  });
  removeCourseBtn.addEventListener('click', function() {
    if (courseCount > 1) {
      courseCount--;
      renderCourses();
    }
  });
  calculateBtn.addEventListener('click', calculateGPA);
  renderCourses();
  calculateGPA();
});
