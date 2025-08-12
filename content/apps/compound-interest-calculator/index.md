---
layout: "app"
title: "Compound Interest Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Compound Interest"]
description: "Calculate compound interest and visualize your investment growth."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
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
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Compound Interest Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Compound Interest Calculator helps you estimate the future value of your investments by applying compound interest formulas. It is ideal for savings, retirement planning, or any scenario where you want to see how your money grows over time.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter your principal amount, annual interest rate, number of years, and compounding frequency.</li>
          <li>Click "Calculate" to see the future value and total interest earned.</li>
          <li>View the growth chart for a visual representation of your investment over time.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Supports multiple compounding frequencies</li>
          <li>Visualizes growth with a chart</li>
          <li>Responsive and easy to use</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Try different rates and periods to see the effect of compounding.</li>
          <li>Use for savings, investments, or loan scenarios.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, Bootstrap 5, and Chart.js. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
