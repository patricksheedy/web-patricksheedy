---
layout: "app"
title: "Imperial to Metric Conversion"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Conversion"]
description: "Convert between imperial and metric units for length, weight, and volume."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Imperial to Metric Conversion</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select class="form-select" id="category">
              <option value="length" selected>Length</option>
              <option value="weight">Weight</option>
              <option value="volume">Volume</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="imperial" class="form-label">Imperial Value</label>
            <input type="number" class="form-control" id="imperial" value="1">
          </div>
          <div class="mb-3">
            <label for="imperial-unit" class="form-label">Imperial Unit</label>
            <select class="form-select" id="imperial-unit"></select>
          </div>
          <div class="mb-3">
            <label for="metric-unit" class="form-label">Metric Unit</label>
            <select class="form-select" id="metric-unit"></select>
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Convert</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Metric Value</div>
            <div id="metric-value" class="result-value">0.00</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
