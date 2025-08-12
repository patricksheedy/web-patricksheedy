---
layout: "app"
title: "Time Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Time"]
description: "Add and subtract hours and minutes easily."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
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
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Time Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The Time Calculator allows you to add or subtract hours and minutes, making it easy to calculate durations, schedules, or time differences. It is ideal for work, study, travel, or any activity where time tracking is important.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Enter two times in hh:mm format.</li>
          <li>Select whether to add or subtract the times.</li>
          <li>Click "Calculate" to see the result in hh:mm, total minutes, and total hours.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Add or subtract any two times</li>
          <li>Displays result in multiple formats</li>
          <li>Responsive and easy to use</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Use for work shifts, study sessions, or travel planning.</li>
          <li>Negative results are shown with a minus sign.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, and Bootstrap 5. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
