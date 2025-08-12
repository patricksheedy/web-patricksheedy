---
layout: "app"
title: "BMI Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Health", "BMI"]
description: "Calculate your Body Mass Index and see where you fall on the BMI chart."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
  <div class="calc-wrap">
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
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">BMI Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The BMI Calculator helps you determine your Body Mass Index, a measure of body fat based on height and weight. It provides instant feedback and visualizes your BMI on a chart, helping you understand your health status.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter your height and weight in the provided fields.</li>
          <li>Choose your preferred units (metric or imperial).</li>
          <li>Click "Calculate" to see your BMI and where you fall on the BMI chart.</li>
        </ul>
        <h6>Understanding BMI</h6>
        <ul>
          <li>BMI &lt; 18.5: Underweight</li>
          <li>BMI 18.5–24.9: Normal weight</li>
          <li>BMI 25–29.9: Overweight</li>
          <li>BMI 30+: Obese</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Instant BMI calculation</li>
          <li>Visual chart for BMI categories</li>
          <li>Responsive and accessible design</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>BMI is a general guideline and may not reflect body composition for athletes or certain populations.</li>
          <li>Consult a healthcare provider for a full health assessment.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, Bootstrap 5, and Chart.js. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
