---
layout: "app"
title: "Salary Calculator"
date: 2025-09-30
draft: false
tags: ["Calculator", "Salary", "Finance", "Tax", "Income", "Paycheck"]
description: "Calculate take-home pay and convert between hourly, monthly, and annual salary. See taxes and deductions breakdown."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Salary Calculator</h1>
</div>
<div class="card-body">
<div class="form-container">
<div class="mb-3">
<label class="form-label">Salary Type:</label>
<select class="form-select" id="salary-type">
<option value="annual">Annual Salary</option>
<option value="monthly">Monthly Salary</option>
<option value="hourly">Hourly Rate</option>
</select>
</div>

<div class="mb-3">
<label class="form-label">Amount:</label>
<div class="input-group">
<span class="input-group-text">$</span>
<input type="number" class="form-control" id="salary-amount" value="75000" step="0.01">
</div>
</div>

<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">Hours/Week:</label>
<input type="number" class="form-control" id="hours-week" value="40" min="1" max="168">
</div>
<div class="col-6">
<label class="form-label">Weeks/Year:</label>
<input type="number" class="form-control" id="weeks-year" value="52" min="1" max="52">
</div>
</div>

<div class="mb-3">
<label class="form-label">Filing Status:</label>
<select class="form-select" id="filing-status">
<option value="single">Single</option>
<option value="married">Married Filing Jointly</option>
<option value="head">Head of Household</option>
</select>
</div>

<div class="mb-3">
<label class="form-label">Pre-tax Deductions (Annual):</label>
<div class="input-group">
<span class="input-group-text">$</span>
<input type="number" class="form-control" id="deductions" value="0" step="100">
</div>
<small class="text-muted">401(k), HSA, etc.</small>
</div>

<button class="btn btn-success w-100 mb-3" id="calculate-btn">Calculate</button>

<div id="results" style="display:none;">
<div class="salary-breakdown mb-3">
<h6 class="mb-2">Salary Breakdown:</h6>
<div class="breakdown-item">
<span>Annual:</span>
<strong id="annual-salary">$0</strong>
</div>
<div class="breakdown-item">
<span>Monthly:</span>
<strong id="monthly-salary">$0</strong>
</div>
<div class="breakdown-item">
<span>Bi-weekly:</span>
<strong id="biweekly-salary">$0</strong>
</div>
<div class="breakdown-item">
<span>Hourly:</span>
<strong id="hourly-rate">$0</strong>
</div>
</div>

<div class="tax-breakdown mb-3">
<h6 class="mb-2">Tax & Deductions:</h6>
<div class="tax-item">
<span>Gross Annual:</span>
<strong id="gross-annual">$0</strong>
</div>
<div class="tax-item">
<span>Federal Tax (~15%):</span>
<strong class="text-danger" id="federal-tax">-$0</strong>
</div>
<div class="tax-item">
<span>FICA (7.65%):</span>
<strong class="text-danger" id="fica-tax">-$0</strong>
</div>
<div class="tax-item">
<span>Pre-tax Deductions:</span>
<strong class="text-danger" id="deductions-display">-$0</strong>
</div>
<div class="tax-item total">
<span>Net Annual (Take-home):</span>
<strong class="text-success" id="net-annual">$0</strong>
</div>
</div>

<div class="take-home-box">
<div class="take-home-label">Monthly Take-Home</div>
<div class="take-home-value" id="net-monthly">$0</div>
</div>
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
<h5 class="modal-title" id="helpModalLabel">Salary Calculator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>Convert between annual, monthly, and hourly salary. Calculate take-home pay after taxes and deductions.</p>
<h6>How to Use</h6>
<ul>
<li>Select salary type (Annual, Monthly, or Hourly)</li>
<li>Enter your salary or hourly rate</li>
<li>Set hours per week and weeks per year</li>
<li>Choose filing status</li>
<li>Add pre-tax deductions (401k, HSA, etc.)</li>
<li>Click Calculate to see full breakdown</li>
</ul>
<h6>What's Included</h6>
<ul>
<li>Salary conversions (annual, monthly, bi-weekly, hourly)</li>
<li>Federal income tax estimate (~15% average)</li>
<li>FICA taxes (Social Security & Medicare: 7.65%)</li>
<li>Pre-tax deductions</li>
<li>Net take-home pay</li>
</ul>
<h6>Important Notes</h6>
<ul>
<li>Tax rates are estimates - actual rates vary by income bracket</li>
<li>Does not include state/local taxes</li>
<li>Does not include benefits or post-tax deductions</li>
<li>Use for comparison and estimation only</li>
<li>Consult a tax professional for accurate calculations</li>
</ul>
<h6>About</h6>
<p>Built with HTML5, CSS3, JavaScript, and Bootstrap 5. All calculations performed locally in your browser.</p>
</div>
</div>
</div>
</div>
