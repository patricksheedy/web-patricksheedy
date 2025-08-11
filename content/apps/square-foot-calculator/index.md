---
layout: "app"
title: "Square Foot Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Area", "Measurement"]
description: "Calculate area in square feet and meters for rooms, floors, and more."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Square Foot Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="length" class="form-label">Length</label>
            <input type="number" class="form-control" id="length" value="10">
          </div>
          <div class="mb-3">
            <label for="width" class="form-label">Width</label>
            <input type="number" class="form-control" id="width" value="12">
          </div>
          <div class="mb-3">
            <label for="unit" class="form-label">Unit</label>
            <select class="form-select" id="unit">
              <option value="ft" selected>Feet</option>
              <option value="m">Meters</option>
              <option value="in">Inches</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate Area</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Area (sq ft)</div>
            <div id="area-ft" class="result-value">120.00</div>
          </div>
          <div class="result-card">
            <div class="result-label">Area (sq m)</div>
            <div id="area-m" class="result-value">11.15</div>
          </div>
          <div class="result-card">
            <div class="result-label">Area (sq in)</div>
            <div id="area-in" class="result-value">17,280.00</div>
          </div>
        </div>
        <div class="chart-container mt-4">
          <canvas id="area-chart"></canvas>
        </div>
      </div>
    </section>
  </div>
</main>
