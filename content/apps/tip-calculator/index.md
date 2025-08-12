---
layout: "app"
title: "Tip Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Finance", "Tip"]
description: "Quickly calculate tips and split bills."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
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
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Tip Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Tip Calculator is a convenient tool for quickly calculating tips and splitting bills among friends or colleagues. It is perfect for dining out, group events, or any situation where you need to divide expenses fairly.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter the bill amount, desired tip percentage, and number of people splitting the bill.</li>
          <li>Click "Calculate" to see the tip amount, total bill, and per person share.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Calculates tip, total, and per person amounts</li>
          <li>Supports any tip percentage and group size</li>
          <li>Responsive and easy to use</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Adjust the tip percentage to match service quality or local customs.</li>
          <li>Use for restaurants, taxis, or any shared expense.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, and Bootstrap 5. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
