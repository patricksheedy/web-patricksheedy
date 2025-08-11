---
layout: "app"
title: "Investment Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Investment"]
description: "Project your investment growth with this compound interest calculator."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Investment Growth Calculator</h1>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs" id="calculatorTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="lump-sum-tab" data-bs-toggle="tab" data-bs-target="#lump-sum-panel" type="button" role="tab">
              Lump Sum
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="regular-contribution-tab" data-bs-toggle="tab" data-bs-target="#regular-contribution-panel" type="button" role="tab">
              Regular Contributions
            </button>
          </li>
        </ul>
        <div class="tab-content p-3 bg-light rounded-bottom" id="calculatorTabContent">
          <div class="tab-pane fade show active" id="lump-sum-panel" role="tabpanel">
            <div class="mb-3">
              <label for="initial-investment" class="form-label">Initial Investment ($)</label>
              <input type="number" class="form-control" id="initial-investment" value="10000">
            </div>
            <div class="mb-3">
              <label for="interest-rate-lump" class="form-label">Annual Interest Rate (%)</label>
              <input type="number" class="form-control" id="interest-rate-lump" step="0.1" value="8.0">
            </div>
            <div class="mb-3">
              <label for="investment-time-lump" class="form-label">Investment Period (years)</label>
              <input type="number" class="form-control" id="investment-time-lump" value="10">
            </div>
            <div class="mb-3">
              <label for="compound-frequency" class="form-label">Compounding Frequency</label>
              <select class="form-select" id="compound-frequency">
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12" selected>Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
          </div>
          <div class="tab-pane fade" id="regular-contribution-panel" role="tabpanel">
            <div class="mb-3">
              <label for="initial-investment-reg" class="form-label">Initial Investment ($)</label>
              <input type="number" class="form-control" id="initial-investment-reg" value="5000">
            </div>
            <div class="mb-3">
              <label for="contribution-amount" class="form-label">Regular Contribution ($)</label>
              <input type="number" class="form-control" id="contribution-amount" value="500">
            </div>
            <div class="mb-3">
              <label for="contribution-frequency" class="form-label">Contribution Frequency</label>
              <select class="form-select" id="contribution-frequency">
                <option value="12" selected>Monthly</option>
                <option value="4">Quarterly</option>
                <option value="2">Semi-Annually</option>
                <option value="1">Annually</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="interest-rate-reg" class="form-label">Annual Interest Rate (%)</label>
              <input type="number" class="form-control" id="interest-rate-reg" step="0.1" value="8.0">
            </div>
            <div class="mb-3">
              <label for="investment-time-reg" class="form-label">Investment Period (years)</label>
              <input type="number" class="form-control" id="investment-time-reg" value="10">
            </div>
          </div>
        </div>
        <div class="text-center my-3">
          <button id="calculate" class="btn btn-primary px-4">Calculate Returns</button>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Future Value</div>
            <div id="future-value" class="result-value">$21,589.25</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Contributions</div>
            <div id="total-contributions" class="result-value">$10,000.00</div>
          </div>
          <div class="result-card">
            <div class="result-label">Interest Earned</div>
            <div id="interest-earned" class="result-value">$11,589.25</div>
          </div>
        </div>
        <div class="chart-container mt-4">
          <canvas id="investment-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
          </div>
          
          <div class="result-card">
            <div class="result-label">Interest Earned</div>
            <div id="interest-earned" class="result-value">$11,589.25</div>
          </div>
        </div>
        
        <div class="chart-container mt-4">
          <canvas id="investment-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
