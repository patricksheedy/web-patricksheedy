document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('text-pdf-form');
  var titleInput = document.getElementById('document-title');
  var orientationSelect = document.getElementById('page-orientation');
  var fontSizeSelect = document.getElementById('font-size');
  var bodyInput = document.getElementById('document-body');
  var feedback = document.getElementById('text-feedback');
  var statusIndicator = document.getElementById('text-status');
  var downloadBtn = document.getElementById('download-btn');
  var buttonMarkup = downloadBtn.innerHTML;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideFeedback();
    var title = (titleInput.value || '').trim();
    var orientation = orientationSelect.value === 'landscape' ? 'landscape' : 'portrait';
    var fontSize = Number.parseInt(fontSizeSelect.value, 10);
    var body = bodyInput.value || '';
    if (!body.trim()) {
      showFeedback('Add some text to convert before downloading.', 'error');
      return;
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showFeedback('PDF engine failed to load. Please refresh and try again.', 'error');
      return;
    }
    toggleBusy(true);
    try {
      createPdf(title, orientation, fontSize, body);
      toggleBusy(false);
      statusIndicator.classList.remove('text-primary', 'text-danger', 'text-muted');
      statusIndicator.classList.add('text-success');
      statusIndicator.textContent = 'PDF saved to your device.';
      showFeedback('Document downloaded successfully.', 'success');
    } catch (error) {
      toggleBusy(false);
      statusIndicator.classList.remove('text-primary', 'text-success', 'text-muted');
      statusIndicator.classList.add('text-danger');
      statusIndicator.textContent = 'Unable to generate the PDF file.';
      showFeedback('Unable to generate the PDF file. Try again or shorten the document.', 'error');
    }
  });

  function toggleBusy(state) {
    if (state) {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating';
      statusIndicator.classList.remove('text-success', 'text-danger', 'text-muted');
      statusIndicator.classList.add('text-primary');
      statusIndicator.textContent = 'Creating PDF...';
    } else {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = buttonMarkup;
      statusIndicator.classList.remove('text-primary');
      if (!statusIndicator.classList.contains('text-success') && !statusIndicator.classList.contains('text-danger')) {
        statusIndicator.classList.add('text-muted');
        statusIndicator.textContent = 'Ready to create your PDF.';
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

  function createPdf(title, orientation, fontSize, body) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ orientation: orientation, unit: 'mm', format: 'a4' });
    var margin = 18;
    var lineSpacingFactor = 1.3;
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var usableWidth = pageWidth - margin * 2;
    var cursorY = margin;
    if (title) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(title, pageWidth / 2, cursorY, { align: 'center' });
      cursorY += 10;
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    var content = body.replace(/\r\n/g, '\n');
    var wrapped = doc.splitTextToSize(content, usableWidth);
    var lineHeight = doc.getFontSize() * 0.3528 * lineSpacingFactor;
    for (var i = 0; i < wrapped.length; i++) {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage({ orientation: orientation, unit: 'mm', format: 'a4' });
        cursorY = margin;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
      }
      doc.text(wrapped[i], margin, cursorY);
      cursorY += lineHeight;
    }
    var fileName = buildFileName(title);
    doc.save(fileName);
  }

  function buildFileName(title) {
    var now = new Date();
    var stamp = now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + pad(now.getHours()) + pad(now.getMinutes());
    var base = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : 'text-document';
    if (!base) base = 'text-document';
    return base + '-' + stamp + '.pdf';
  }

  function pad(value) {
    return value.toString().padStart(2, '0');
  }
});
