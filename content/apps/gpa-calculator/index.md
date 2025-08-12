---
layout: "app"
title: "GPA Calculator"
date: 2025-08-08
draft: false
tags: ["Calculator", "Utilities", "Education", "GPA"]
description: "Calculate your GPA easily by entering your grades and credits."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
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
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">GPA Calculator Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          The GPA Calculator allows you to quickly and accurately calculate your Grade Point Average by entering your course grades and credit hours. It is ideal for students who want to track their academic performance.
        </p>
        <h6>How to Use</h6>
        <ul>
          <li>Add courses using the "Add Course" button. Remove with "Remove Course".</li>
          <li>Select the grade and enter the number of credits for each course.</li>
          <li>Click "Calculate GPA" to see your GPA, total credits, and total grade points.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Supports multiple courses and credit values</li>
          <li>Calculates GPA, total credits, and total grade points</li>
          <li>Responsive and easy to use</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Double-check your grades and credits for accuracy.</li>
          <li>Use this tool to plan your academic goals and monitor your progress.</li>
        </ul>
        <h6>About</h6>
        <p>
          Built with HTML5, CSS3, and Bootstrap 5. All calculations are performed locally in your browser.
        </p>
      </div>
    </div>
  </div>
</div>
