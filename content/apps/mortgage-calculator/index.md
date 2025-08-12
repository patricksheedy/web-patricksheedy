---
layout: "app"
title: "Mortgage Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Mortgage"]
description: "Calculate your monthly mortgage payments, total interest, and amortization schedule."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Mortgage Payment Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="loan-amount" class="form-label">Loan Amount ($)</label>
            <input type="number" class="form-control" id="loan-amount" value="300000">
          </div>
          <div class="mb-3">
            <label for="interest-rate" class="form-label">Interest Rate (%)</label>
            <input type="number" class="form-control" id="interest-rate" step="0.01" value="4.5">
          </div>
          <div class="mb-3">
            <label for="loan-term" class="form-label">Loan Term (years)</label>
            <select class="form-select" id="loan-term">
              <option value="30">30 years</option>
              <option value="25">25 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Monthly Payment</div>
            <div id="monthly-payment" class="result-value">$1,520.06</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Payment</div>
            <div id="total-payment" class="result-value">$547,220.13</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Interest</div>
            <div id="total-interest" class="result-value">$247,220.13</div>
          </div>
        </div>
        <div class="chart-container mt-4">
          <canvas id="payment-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Mortgage Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Mortgage Calculator helps you estimate your monthly mortgage payments, total interest, and total payment over the life of your loan. It is ideal for home buyers, homeowners, and real estate professionals.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter your loan amount, interest rate, and loan term.</li>
          <li>Click "Calculate" to see your monthly payment, total payment, and total interest.</li>
          <li>View the breakdown of principal vs. interest in the chart.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Supports multiple loan terms (10, 15, 20, 25, 30 years)</li>
          <li>Visualizes principal and interest with a chart</li>
          <li>Responsive and easy to use</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Try different loan terms and rates to compare scenarios.</li>
          <li>Use the results to plan your budget and understand your long-term costs.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, Bootstrap 5, and Chart.js. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
