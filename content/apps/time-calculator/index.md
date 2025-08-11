---
layout: "app"
title: "Time Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Time"]
description: "Add and subtract hours and minutes easily."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="calc-wrap">
    <section class="card shadow-lg border-0 h-100">
      <div class="card-header bg-transparent">
        <h1 class="h4 mb-0 text-center">Time Calculator</h1>
      </div>
      <div class="card-body">
        <div class="form-container">
          <div class="mb-3">
            <label for="time1" class="form-label">Time 1 (hh:mm)</label>
            <input type="time" class="form-control" id="time1" value="01:30">
          </div>
          <div class="mb-3">
            <label for="time2" class="form-label">Time 2 (hh:mm)</label>
            <input type="time" class="form-control" id="time2" value="02:45">
          </div>
          <div class="mb-3">
            <label for="operation" class="form-label">Operation</label>
            <select class="form-select" id="operation">
              <option value="add" selected>Add</option>
              <option value="subtract">Subtract</option>
            </select>
          </div>
          <div class="mb-3">
            <button id="calculate" class="btn btn-primary w-100">Calculate</button>
          </div>
        </div>
        <div class="results mt-4">
          <div class="result-card">
            <div class="result-label">Result</div>
            <div id="result" class="result-value">04:15</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Minutes</div>
            <div id="total-minutes" class="result-value">255</div>
          </div>
          <div class="result-card">
            <div class="result-label">Total Hours</div>
            <div id="total-hours" class="result-value">4.25</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
