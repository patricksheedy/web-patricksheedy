(function () {
  'use strict';

  var tc = document.getElementById('tc');
  var secs = document.getElementById('secs');
  var out = document.getElementById('out');
  var outDuration = document.getElementById('out-duration');
  var copyFrame = document.getElementById('copy-frame');
  var copyDuration = document.getElementById('copy-duration');

  var FPS = 24;

  function parseTimecode(v) {
    v = v.trim();
    if (!v) return null;
    var parts = v.split(':');
    if (parts.length > 3) return null;
    var total = 0;
    for (var i = 0; i < parts.length; i++) {
      var n = parseFloat(parts[i]);
      if (isNaN(n) || n < 0) return null;
      total = total * 60 + n;
    }
    return total;
  }

  function parseSeconds(v) {
    v = v.trim();
    if (!v) return null;
    var n = parseFloat(v);
    return isNaN(n) || n < 0 ? null : n;
  }

  function calc() {
    var src = parseTimecode(tc.value);
    if (tc.value.trim() && src === null) {
      out.textContent = 'Invalid timecode';
    } else if (src === null) {
      out.innerHTML = '&nbsp;';
    } else {
      out.textContent = String(Math.round(src * FPS));
    }

    var dur = parseSeconds(secs.value);
    if (secs.value.trim() && dur === null) {
      outDuration.textContent = 'Invalid seconds';
    } else if (dur === null) {
      outDuration.innerHTML = '&nbsp;';
    } else {
      outDuration.textContent = String(Math.round(dur * FPS));
    }
  }

  function bindCopy(btn, el) {
    btn.addEventListener('click', function () {
      var text = el.textContent.trim();
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        var label = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = label;
        }, 1000);
      });
    });
  }

  tc.addEventListener('input', calc);
  tc.addEventListener('paste', function () { setTimeout(calc, 0); });
  secs.addEventListener('input', calc);
  secs.addEventListener('paste', function () { setTimeout(calc, 0); });

  bindCopy(copyFrame, out);
  bindCopy(copyDuration, outDuration);

  calc();
})();
