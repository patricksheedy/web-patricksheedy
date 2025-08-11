---
layout: "app"
title: "Mortgage Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Mortgage"]
description: "Calculate your monthly mortgage payments, total interest, and amortization schedule."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
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
        
        <div class="chart-container mt-4">
          <canvas id="payment-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
