---
layout: "app"
title: "Scientific Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Math", "Scientific"]
description: "A fast, responsive, full-featured scientific calculator."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center">
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