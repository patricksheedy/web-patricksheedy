---
layout: "app"
title: "Scientific Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Math", "Scientific"]
description: "A fast, responsive, full-featured scientific calculator."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Scientific Calculator</h1>
      </div>
      <div class="card-body">
        <div id="display" class="calc-display" role="status" aria-live="polite" aria-atomic="true">0</div>
        <div id="keys" class="calc-grid mt-3">
          <button type="button" class="btn btn-secondary" data-action="clear">C</button>
          <button type="button" class="btn btn-secondary" data-action="backspace">⌫</button>
          <button type="button" class="btn btn-primary" data-fn="ln">ln</button>
          <button type="button" class="btn btn-primary" data-fn="log">log</button>
          <button type="button" class="btn btn-primary" data-fn="sqrt">√</button>
          <button type="button" class="btn btn-primary" data-fn="x2">x²</button>
          <button type="button" class="btn btn-primary" data-fn="x3">x³</button>
          <button type="button" class="btn btn-primary" data-fn="pow">xʸ</button>
          <button type="button" class="btn btn-primary" data-fn="exp">eˣ</button>
          <button type="button" class="btn btn-primary" data-fn="recip">1/x</button>
          <button type="button" class="btn btn-primary" data-fn="abs">|x|</button>
          <button type="button" class="btn btn-primary" data-fn="pi">π</button>
          <button type="button" class="btn btn-primary" data-fn="e">e</button>
          <button type="button" class="btn btn-primary" data-fn="percent">%</button>
          <button type="button" class="btn btn-primary" data-fn="factorial">n!</button>
          <button type="button" class="btn btn-primary" data-fn="sin">sin</button>
          <button type="button" class="btn btn-primary" data-fn="cos">cos</button>
          <button type="button" class="btn btn-primary" data-fn="tan">tan</button>
          <button type="button" class="btn btn-primary" data-fn="arcsin">sin⁻¹</button>
          <button type="button" class="btn btn-primary" data-fn="arccos">cos⁻¹</button>
          <button type="button" class="btn btn-primary" data-fn="arctan">tan⁻¹</button>
          <button type="button" class="btn btn-primary" data-op="(">(</button>
          <button type="button" class="btn btn-primary" data-op=")">)</button>
          <button type="button" class="btn btn-primary" data-op="÷">÷</button>
          <button type="button" class="btn btn-light" data-digit="7">7</button>
          <button type="button" class="btn btn-light" data-digit="8">8</button>
          <button type="button" class="btn btn-light" data-digit="9">9</button>
          <button type="button" class="btn btn-primary" data-op="×">×</button>
          <button type="button" class="btn btn-light" data-digit="4">4</button>
          <button type="button" class="btn btn-light" data-digit="5">5</button>
          <button type="button" class="btn btn-light" data-digit="6">6</button>
          <button type="button" class="btn btn-primary" data-op="-">−</button>
          <button type="button" class="btn btn-light" data-digit="1">1</button>
          <button type="button" class="btn btn-light" data-digit="2">2</button>
          <button type="button" class="btn btn-light" data-digit="3">3</button>
          <button type="button" class="btn btn-primary" data-op="+">+</button>
          <button type="button" class="btn btn-light col-span-2" data-digit="0">0</button>
          <button type="button" class="btn btn-light" data-action="dot">.</button>
          <button type="button" class="btn btn-success" data-action="equals">=</button>
        </div>
      </div>
    </section>
  </div>
</main>
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Scientific Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Scientific Calculator is a powerful tool for advanced mathematical calculations. It supports a wide range of functions including trigonometry, logarithms, exponents, roots, factorials, and more. Designed for students, engineers, scientists, and anyone needing more than basic arithmetic, this calculator is both robust and user-friendly.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter numbers using the on-screen buttons or your keyboard.</li>
          <li>Use function buttons for operations like sin, cos, tan, ln, log, sqrt, powers, and more.</li>
          <li>Parentheses are supported for grouping expressions.</li>
          <li>Click <b>=</b> or press <b>Enter</b> to evaluate the expression.</li>
          <li>Use <b>C</b> to clear all, <b>⌫</b> to backspace.</li>
        </ul>
        <h6>Functions Supported</h6>
        <ul>
          <li>Trigonometric: sin, cos, tan, arcsin, arccos, arctan (degrees)</li>
          <li>Logarithmic: ln, log (base 10)</li>
          <li>Powers and roots: x², x³, xʸ, √, nth root</li>
          <li>Constants: π, e</li>
          <li>Factorial, percent, reciprocal, absolute value, exponential</li>
        </ul>
        <h6>Keyboard Shortcuts</h6>
        <ul>
          <li>Numbers and decimal: 0-9, .</li>
          <li>Operators: +, -, *, /, ^</li>
          <li>Enter or =: Calculate</li>
          <li>Escape: Clear</li>
          <li>Backspace: Delete last digit</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Use parentheses for complex expressions.</li>
          <li>Trigonometric functions use degrees.</li>
          <li>Results are displayed instantly after pressing =.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, Bootstrap 5, and Math.js for accurate calculations. All operations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>