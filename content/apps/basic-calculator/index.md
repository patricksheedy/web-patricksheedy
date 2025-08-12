---
layout: "app"
title: "Basic Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Math"]
description: "A fast, responsive, basic 4-function calculator."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">IBM Numpad Calculator</h1>
      </div>
      <div class="card-body">
        <div id="display" class="calc-display" role="status" aria-live="polite" aria-atomic="true">0</div>
        <div id="keys" class="calc-grid mt-3">
          <button type="button" class="btn btn-secondary" data-action="clear">C</button>
          <button type="button" class="btn btn-primary" data-op="÷">÷</button>
          <button type="button" class="btn btn-primary" data-op="×">×</button>
          <button type="button" class="btn btn-primary" data-op="-">−</button>
          <button type="button" class="btn btn-light" data-digit="7">7</button>
          <button type="button" class="btn btn-light" data-digit="8">8</button>
          <button type="button" class="btn btn-light" data-digit="9">9</button>
          <button type="button" class="btn btn-primary row-span-2" data-op="+">+</button>
          <button type="button" class="btn btn-light" data-digit="4">4</button>
          <button type="button" class="btn btn-light" data-digit="5">5</button>
          <button type="button" class="btn btn-light" data-digit="6">6</button>
          <button type="button" class="btn btn-light" data-digit="1">1</button>
          <button type="button" class="btn btn-light" data-digit="2">2</button>
          <button type="button" class="btn btn-light" data-digit="3">3</button>
          <button type="button" class="btn btn-success" data-action="equals">=</button>
          <button type="button" class="btn btn-light col-span-2" data-digit="0">0</button>
          <button type="button" class="btn btn-light" data-action="dot">.</button>
        </div>
      </div>
    </section>
  </div>
</main>
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Basic Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Basic Calculator is a fast, responsive, and easy-to-use tool for performing simple arithmetic operations. It is designed to mimic the classic IBM numpad calculator, providing a familiar interface for quick calculations. This calculator supports addition, subtraction, multiplication, and division, and is optimized for both desktop and mobile devices.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>
            <strong>Entering Numbers:</strong> Click the number buttons or use your keyboard to enter digits. The display will update as you type.
          </li>
          <li>
            <strong>Decimal Point:</strong> Use the <b>.</b> button to enter decimal numbers.
          </li>
          <li>
            <strong>Operations:</strong> Click the <b>+</b>, <b>−</b>, <b>×</b>, or <b>÷</b> buttons to perform addition, subtraction, multiplication, or division. You can also use your keyboard's <b>+</b>, <b>-</b>, <b>*</b>, or <b>/</b> keys.
          </li>
          <li>
            <strong>Equals:</strong> Click the <b>=</b> button or press <b>Enter</b> to calculate the result.
          </li>
          <li>
            <strong>Clear:</strong> Click <b>C</b> to reset the calculator to zero.
          </li>
        </ul>
        <h6>Keyboard Shortcuts</h6>
        <ul>
          <li><b>0-9</b>: Enter digits</li>
          <li><b>.</b>: Decimal point</li>
          <li><b>+</b>, <b>-</b>, <b>*</b>, <b>/</b>: Operations</li>
          <li><b>Enter</b> or <b>=</b>: Calculate</li>
          <li><b>Escape</b>: Clear all</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Responsive design for all devices</li>
          <li>Keyboard and mouse/touch support</li>
          <li>Prevents invalid operations (e.g., division by zero)</li>
          <li>Visually appealing, modern interface using Bootstrap</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Use the calculator for quick math, budgeting, or checking homework.</li>
          <li>On mobile, tap the buttons for fast input.</li>
          <li>If you make a mistake, just press <b>C</b> to start over.</li>
        </ul>
        <h6>About</h6>
        <p>
          This calculator is built with HTML5, CSS3, JavaScript, and Bootstrap 5. It is designed for speed, accessibility, and ease of use. No data is stored or sent anywhere; all calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>