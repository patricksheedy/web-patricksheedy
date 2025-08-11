---
layout: "app"
title: "BMI Calculator"
date: 2025-08-10
draft: false
tags: ["Health", "Calculator", "Utilities", "BMI"]
description: "Calculate your Body Mass Index (BMI) and understand your weight category with our responsive BMI chart."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="bmi-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">BMI Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container mb-3">
          <div class="units-toggle mb-3">
            <div class="btn-group w-100" role="group" aria-label="Unit Selection">
              <input type="radio" class="btn-check" name="units" id="imperial" value="imperial" checked>
              <label class="btn btn-outline-primary" for="imperial">Imperial (ft/in, lbs)</label>
              <input type="radio" class="btn-check" name="units" id="metric" value="metric">
              <label class="btn btn-outline-primary" for="metric">Metric (cm, kg)</label>
            </div>
          </div>
          <div id="metric-inputs" class="d-none">
            <div class="mb-3">
              <label for="height-cm" class="form-label" id="height-label-metric">Height (cm)</label>
              <input type="number" class="form-control" id="height-cm" min="50" max="300" placeholder="e.g. 175">
            </div>
            <div class="mb-3">
              <label for="weight-kg" class="form-label" id="weight-label-metric">Weight (kg)</label>
              <input type="number" class="form-control" id="weight-kg" min="20" max="500" placeholder="e.g. 70">
            </div>
          </div>
          <div id="imperial-inputs">
            <div class="mb-3">
              <label class="form-label" id="height-label-imperial">Height (ft/in)</label>
              <div class="row g-2">
                <div class="col">
                  <div class="input-group">
                    <input type="number" class="form-control" id="height-ft" min="1" max="8" placeholder="ft">
                    <span class="input-group-text">ft</span>
                  </div>
                </div>
                <div class="col">
                  <div class="input-group">
                    <input type="number" class="form-control" id="height-in" min="0" max="11" placeholder="in">
                    <span class="input-group-text">in</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="weight-lbs" class="form-label" id="weight-label-imperial">Weight (lbs)</label>
              <input type="number" class="form-control" id="weight-lbs" min="40" max="1000" placeholder="e.g. 154">
            </div>
          </div>
          <button id="calculate-btn" class="btn btn-primary w-100">Calculate BMI</button>
        </div>
        <div id="result-container" class="d-none">
          <div class="result-panel mb-3">
            <div class="row align-items-center">
              <div class="col-md-6">
                <h2 class="h5">Your BMI</h2>
                <div id="bmi-value" class="display-5 fw-bold"></div>
                <div id="bmi-category" class="fs-5 mb-2"></div>
                <button id="recalculate-btn" class="btn btn-sm btn-outline-secondary">Recalculate</button>
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <div id="gauge-container" class="gauge-wrapper"></div>
              </div>
            </div>
          </div>
          <div class="bmi-chart-container">
            <div id="bmi-chart" class="bmi-chart mb-3"></div>
            <div class="bmi-categories">
              <div class="category category-underweight">
                <div class="category-label">Underweight</div>
                <div class="category-range">&lt; 18.5</div>
              </div>
              <div class="category category-normal">
                <div class="category-label">Normal Weight</div>
                <div class="category-range">18.5 - 24.9</div>
              </div>
              <div class="category category-overweight">
                <div class="category-label">Overweight</div>
                <div class="category-range">25 - 29.9</div>
              </div>
              <div class="category category-obese">
                <div class="category-label">Obesity</div>
                <div class="category-range">&ge; 30</div>
              </div>
            </div>
          </div>
          <div class="bmi-info p-3 bg-light rounded">
            <h3 class="h6">About BMI</h3>
            <p class="small mb-0">Body Mass Index (BMI) is a measure of body fat based on height and weight. It applies to adult men and women. Note that BMI is a screening tool, not a diagnostic tool. Factors like muscle mass, age, and ethnicity can affect BMI interpretation.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
