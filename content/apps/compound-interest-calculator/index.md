---
layout: "app"
title: "Compound Interest Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Compound Interest"]
description: "Calculate compound interest and visualize your investment growth."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Compound Interest Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="principal" class="form-label">Principal ($)</label>
            <input type="number" class="form-control" id="principal" value="1000">
          </div>
          <div class="mb-3">
            <label for="rate" class="form-label">Annual Interest Rate (%)</label>
            <input type="number" class="form-control" id="rate" value="5">
          </div>
          <div class="mb-3">
            <label for="years" class="form-label">Years</label>
            <input type="number" class="form-control" id="years" value="10">
          </div>
          <div class="mb-3">
            <label for="frequency" class="form-label">Compounding Frequency</label>
            <select class="form-select" id="frequency">
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12" selected>Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Future Value</div>
            <div id="future-value" class="result-value">$1,647.01</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Interest</div>
            <div id="total-interest" class="result-value">$647.01</div>
          </div>
        </div>
        <div class="chart-container mt-4">
          <canvas id="growth-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
