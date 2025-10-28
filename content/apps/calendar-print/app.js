document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('calendar-form');
  var monthsInput = document.getElementById('months-per-page');
  var startInput = document.getElementById('start-month');
  var endInput = document.getElementById('end-month');
  var weekStartSelect = document.getElementById('week-start');
  var feedback = document.getElementById('feedback');
  var statusIndicator = document.getElementById('status-indicator');
  var generateBtn = document.getElementById('generate-btn');
  var buttonDefaultMarkup = generateBtn.innerHTML;
  var now = new Date();
  var isoMonth = now.toISOString().slice(0, 7);
  startInput.value = isoMonth;
  endInput.value = isoMonth;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideFeedback();
    var monthsPerPage = Number.parseInt(monthsInput.value, 10);
    var startMonth = startInput.value;
    var endMonth = endInput.value;
    var weekStartValue = weekStartSelect.value;
    if (Number.isNaN(monthsPerPage) || monthsPerPage < 1 || monthsPerPage > 5) {
      showFeedback('Months per page must be between 1 and 5.', 'error');
      return;
    }
    if (!startMonth || !endMonth) {
      showFeedback('Select both a start month and an end month.', 'error');
      return;
    }
    if (startMonth > endMonth) {
      showFeedback('End month must be after the start month.', 'error');
      return;
    }
    if (!weekStartValue) {
      showFeedback('Choose a week start day.', 'error');
      return;
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showFeedback('PDF engine failed to load. Please refresh and try again.', 'error');
      return;
    }
    toggleBusy(true);
    var weekStartIndex = getWeekStartIndex(weekStartValue);
    var weekdayLabels = getWeekdayLabels(weekStartIndex);
    var months = buildMonthCollection(startMonth, endMonth, weekStartIndex);
    if (months.length === 0) {
      toggleBusy(false);
      statusIndicator.classList.remove('text-primary', 'text-success', 'text-muted');
      statusIndicator.classList.add('text-danger');
      statusIndicator.textContent = 'No months found in the selected range.';
      showFeedback('No months found in the selected range.', 'error');
      return;
    }
    var fileName = 'calendar-' + startMonth.replace('-', '') + '-' + endMonth.replace('-', '') + '.pdf';
    try {
      renderPdf(months, monthsPerPage, weekdayLabels, fileName);
      toggleBusy(false);
      statusIndicator.classList.remove('text-primary', 'text-danger', 'text-muted');
      statusIndicator.classList.add('text-success');
      statusIndicator.textContent = 'Calendar saved to your device.';
      showFeedback('Calendar downloaded successfully.', 'success');
    } catch (error) {
      toggleBusy(false);
      statusIndicator.classList.remove('text-primary', 'text-success', 'text-muted');
      statusIndicator.classList.add('text-danger');
      statusIndicator.textContent = 'Unable to generate the calendar PDF.';
      showFeedback('Unable to generate the calendar PDF. Try a shorter range or reload the page.', 'error');
    }
  });

  function toggleBusy(state) {
    if (state) {
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating';
      statusIndicator.classList.remove('text-success', 'text-danger', 'text-muted');
      statusIndicator.classList.add('text-primary');
      statusIndicator.textContent = 'Building calendar PDF...';
    } else {
      generateBtn.disabled = false;
      generateBtn.innerHTML = buttonDefaultMarkup;
      statusIndicator.classList.remove('text-primary');
      if (!statusIndicator.classList.contains('text-success') && !statusIndicator.classList.contains('text-danger')) {
        statusIndicator.classList.add('text-muted');
        statusIndicator.textContent = 'Ready to create your calendar.';
      }
    }
  }

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'alert mt-3 ' + (type === 'success' ? 'alert-success' : 'alert-danger');
  }

  function hideFeedback() {
    feedback.textContent = '';
    feedback.className = 'alert alert-danger d-none mt-3';
    statusIndicator.classList.remove('text-success', 'text-danger');
  }

  function getWeekStartIndex(value) {
    var map = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6
    };
    return map[value] || 0;
  }

  function getWeekdayLabels(startIndex) {
    var base = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var labels = [];
    for (var i = 0; i < 7; i++) {
      labels.push(base[(startIndex + i) % 7]);
    }
    return labels;
  }

  function buildMonthCollection(startValue, endValue, weekStartIndex) {
    var startParts = startValue.split('-');
    var endParts = endValue.split('-');
    var startYear = Number.parseInt(startParts[0], 10);
    var startMonth = Number.parseInt(startParts[1], 10) - 1;
    var endYear = Number.parseInt(endParts[0], 10);
    var endMonth = Number.parseInt(endParts[1], 10) - 1;
    var months = [];
    var formatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    var year = startYear;
    var monthIndex = startMonth;
    while (year < endYear || (year === endYear && monthIndex <= endMonth)) {
      var label = formatter.format(new Date(year, monthIndex, 1));
      months.push({
        label: label,
        weeks: buildMonthMatrix(year, monthIndex, weekStartIndex)
      });
      monthIndex += 1;
      if (monthIndex === 12) {
        monthIndex = 0;
        year += 1;
      }
    }
    return months;
  }

  function buildMonthMatrix(year, monthIndex, weekStartIndex) {
    var totalDays = new Date(year, monthIndex + 1, 0).getDate();
    var firstDay = new Date(year, monthIndex, 1).getDay();
    var offset = (firstDay - weekStartIndex + 7) % 7;
    var current = 1 - offset;
    var weeks = [];
    while (current <= totalDays) {
      var week = [];
      for (var i = 0; i < 7; i++) {
        var dayNumber = current + i;
        week.push(dayNumber >= 1 && dayNumber <= totalDays ? String(dayNumber) : '');
      }
      weeks.push(week);
      current += 7;
    }
    // Remove trailing blank rows
    while (weeks.length > 0 && weeks[weeks.length - 1].every(function(cell) { return cell === ''; })) {
      weeks.pop();
    }
    // Optionally pad to 6 rows for visual consistency (if needed)
    // while (weeks.length < 6) {
    //   weeks.push(['', '', '', '', '', '', '']);
    // }
    return weeks;
  }

  function renderPdf(months, perPage, labels, fileName) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var margin = 12;
    var usableWidth = pageWidth - margin * 2;
    var availableHeight = pageHeight - margin * 2;
    var aspectRatio = 0.78;
    var index = 0;
    while (index < months.length) {
      if (index > 0) doc.addPage();
      var chunk = months.slice(index, index + perPage);
      var count = chunk.length;
      var width = usableWidth;
      var height = width * aspectRatio;
      if (height * count > availableHeight) {
        width = Math.min(usableWidth, availableHeight / (count * aspectRatio));
        height = width * aspectRatio;
      }
      var totalHeight = height * count;
      var extraSpace = availableHeight - totalHeight;
      var spacing = count > 1 ? extraSpace / (count - 1) : 0;
      if (spacing < 0) spacing = 0;
      var originX = margin + (usableWidth - width) / 2;
      var startY = margin;
      if (count === 1 && extraSpace > 0) startY = margin + extraSpace / 2;
      var currentY = startY;
      for (var m = 0; m < count; m++) {
        renderMonth(doc, chunk[m], labels, originX, currentY, width, height);
        currentY += height + spacing;
      }
      index += perPage;
    }
    doc.save(fileName);
  }

  function renderMonth(doc, month, labels, originX, originY, cellWidth, cellHeight) {
    var titleY = originY + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(month.label, originX + cellWidth / 2, titleY, { align: 'center' });
    var headerY = titleY + 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    var colWidth = cellWidth / 7;
    for (var i = 0; i < labels.length; i++) {
      doc.text(labels[i], originX + (i + 0.5) * colWidth, headerY, { align: 'center' });
    }
    var gridTop = headerY + 5;
    var gridBottom = originY + cellHeight - 12;
    if (gridBottom <= gridTop) gridBottom = gridTop + 1;
    var gridHeight = gridBottom - gridTop;
    var weekCount = month.weeks.length;
    var rowHeight = gridHeight / weekCount;
    doc.setDrawColor(130, 130, 130);
    doc.setLineWidth(0.18);
    for (var c = 0; c <= 7; c++) {
      var x = originX + c * colWidth;
      doc.line(x, gridTop, x, gridBottom);
    }
    for (var r = 0; r <= weekCount; r++) {
      var y = gridTop + r * rowHeight;
      doc.line(originX, y, originX + cellWidth, y);
    }
    doc.setFontSize(10);
    doc.setTextColor(33, 37, 41);
    for (var w = 0; w < weekCount; w++) {
      var week = month.weeks[w];
      for (var d = 0; d < 7; d++) {
        var value = week[d];
        if (value) {
          var textX = originX + (d + 1) * colWidth - 1.5;
          var textY = gridTop + w * rowHeight + 1.2;
          doc.text(value, textX, textY, { align: 'right', baseline: 'top' });
        }
      }
    }
  }
});
