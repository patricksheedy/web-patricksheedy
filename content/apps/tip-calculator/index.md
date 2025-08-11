---
layout: "app"
title: "Tip Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Tip"]
description: "Quickly calculate tips and split bills."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Tip Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="bill" class="form-label">Bill Amount ($)</label>
            <input type="number" class="form-control" id="bill" value="50">
          </div>
          <div class="mb-3">
            <label for="tip" class="form-label">Tip (%)</label>
            <input type="number" class="form-control" id="tip" value="18">
          </div>
          <div class="mb-3">
            <label for="people" class="form-label">Number of People</label>
            <input type="number" class="form-control" id="people" value="2">
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Tip Amount</div>
            <div id="tip-amount" class="result-value">$9.00</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Bill</div>
            <div id="total-bill" class="result-value">$59.00</div>
          </div>
          <div class="result-card">
            <div class="result-label">Per Person</div>
            <div id="per-person" class="result-value">$29.50</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
