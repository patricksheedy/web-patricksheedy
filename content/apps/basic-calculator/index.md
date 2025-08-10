---
layout: "app"
title: "Basic Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Math"]
description: "A fast, responsive, basic 4-function calculator."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center">
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