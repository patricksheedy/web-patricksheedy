---
layout: "app"
title: "GPA Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Education", "GPA"]
description: "Calculate your GPA easily by entering your grades and credits."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">GPA Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div id="courses-list"></div>
          <div class="d-flex justify-content-between mt-2">
            <button id="add-course" class="btn btn-outline-primary btn-sm">Add Course</button>
            <button id="remove-course" class="btn btn-outline-danger btn-sm">Remove Course</button>
          </div>
          <div class="mt-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate GPA</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">GPA</div>
            <div id="gpa" class="result-value">0.00</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Credits</div>
            <div id="total-credits" class="result-value">0</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Grade Points</div>
            <div id="total-points" class="result-value">0.00</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
