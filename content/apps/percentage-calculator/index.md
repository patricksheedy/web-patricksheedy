---
layout: "app"
title: "Percentage Calculator"
date: 2025-09-30
draft: false
tags: ["Calculator", "Percentage", "Math", "Utilities", "Finance"]
description: "Free percentage calculator. Calculate percentages, discounts, tips, tax, and more. Multiple calculation modes for all percentage needs."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Percentage Calculator</h1>
</div>
<div class="card-body">
<div class="form-container">
<ul class="nav nav-pills mb-3 flex-nowrap" style="overflow-x: auto;">
<li class="nav-item"><a class="nav-link active" data-mode="basic" href="#">Basic</a></li>
<li class="nav-item"><a class="nav-link" data-mode="is-what" href="#">Is What %</a></li>
<li class="nav-item"><a class="nav-link" data-mode="change" href="#">Change</a></li>
<li class="nav-item"><a class="nav-link" data-mode="discount" href="#">Discount</a></li>
</ul>

<div class="mode-content" id="mode-basic">
<div class="calc-question mb-3">
<h5>What is <span class="highlight">X%</span> of <span class="highlight">Y</span>?</h5>
</div>
<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">Percentage:</label>
<div class="input-group">
<input type="number" class="form-control" id="basic-percent" value="15" step="any">
<span class="input-group-text">%</span>
</div>
</div>
<div class="col-6">
<label class="form-label">Of Value:</label>
<input type="number" class="form-control" id="basic-value" value="200" step="any">
</div>
</div>
<div class="result-box">
<div class="result-label">Result:</div>
<div class="result-value" id="basic-result">30</div>
</div>
<div class="explanation-box mt-2" id="basic-explanation">
15% of 200 = (15 ÷ 100) × 200 = 30
</div>
</div>

<div class="mode-content" id="mode-is-what" style="display:none;">
<div class="calc-question mb-3">
<h5><span class="highlight">X</span> is what % of <span class="highlight">Y</span>?</h5>
</div>
<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">X Value:</label>
<input type="number" class="form-control" id="iswhat-x" value="30" step="any">
</div>
<div class="col-6">
<label class="form-label">Y Value:</label>
<input type="number" class="form-control" id="iswhat-y" value="150" step="any">
</div>
</div>
<div class="result-box">
<div class="result-label">Result:</div>
<div class="result-value" id="iswhat-result">20%</div>
</div>
<div class="explanation-box mt-2" id="iswhat-explanation">
30 is 20% of 150 = (30 ÷ 150) × 100 = 20%
</div>
</div>

<div class="mode-content" id="mode-change" style="display:none;">
<div class="calc-question mb-3">
<h5>Percentage change from <span class="highlight">X</span> to <span class="highlight">Y</span></h5>
</div>
<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">From (Old):</label>
<input type="number" class="form-control" id="change-from" value="100" step="any">
</div>
<div class="col-6">
<label class="form-label">To (New):</label>
<input type="number" class="form-control" id="change-to" value="125" step="any">
</div>
</div>
<div class="result-box">
<div class="result-label">Percentage Change:</div>
<div class="result-value" id="change-result">+25%</div>
</div>
<div class="explanation-box mt-2" id="change-explanation">
Change = ((125 - 100) ÷ 100) × 100 = +25% increase
</div>
</div>

<div class="mode-content" id="mode-discount" style="display:none;">
<div class="calc-question mb-3">
<h5>Discount Calculator</h5>
</div>
<div class="mb-3">
<label class="form-label">Original Price:</label>
<div class="input-group">
<span class="input-group-text">$</span>
<input type="number" class="form-control" id="discount-price" value="100" step="any">
</div>
</div>
<div class="mb-3">
<label class="form-label">Discount:</label>
<div class="input-group">
<input type="number" class="form-control" id="discount-percent" value="20" step="any">
<span class="input-group-text">%</span>
</div>
</div>
<div class="discount-results">
<div class="d-flex justify-content-between mb-2">
<span>Discount Amount:</span>
<strong id="discount-amount">$20.00</strong>
</div>
<div class="d-flex justify-content-between mb-2">
<span>Final Price:</span>
<strong class="text-success" id="discount-final">$80.00</strong>
</div>
<div class="d-flex justify-content-between">
<span>You Save:</span>
<strong class="text-danger" id="discount-savings">$20.00 (20%)</strong>
</div>
</div>
</div>

<div class="quick-reference mt-3">
<strong>Quick Reference:</strong>
<div class="reference-grid mt-2">
<div class="reference-item">10% = 0.10</div>
<div class="reference-item">15% = 0.15</div>
<div class="reference-item">20% = 0.20</div>
<div class="reference-item">25% = 0.25</div>
<div class="reference-item">50% = 0.50</div>
<div class="reference-item">75% = 0.75</div>
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
<h5 class="modal-title" id="helpModalLabel">Percentage Calculator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>Calculate percentages for any situation: basic percentages, discounts, tips, tax, increases, and decreases.</p>
<h6>Calculation Modes</h6>
<ul>
<li><strong>Basic:</strong> What is X% of Y? (e.g., 15% of 200 = 30)</li>
<li><strong>Is What %:</strong> X is what percent of Y? (e.g., 30 is 20% of 150)</li>
<li><strong>Change:</strong> Percentage increase/decrease between two numbers</li>
<li><strong>Discount:</strong> Calculate sale prices and savings</li>
</ul>
<h6>Common Uses</h6>
<ul>
<li><strong>Shopping:</strong> Calculate discounts and final prices</li>
<li><strong>Tips:</strong> Calculate restaurant gratuities</li>
<li><strong>Tax:</strong> Add or calculate sales tax</li>
<li><strong>Finance:</strong> Interest rates, returns, changes</li>
<li><strong>Education:</strong> Grade percentages, test scores</li>
<li><strong>Business:</strong> Profit margins, growth rates</li>
</ul>
<h6>Tips</h6>
<ul>
<li>Switch between modes using the tabs at the top</li>
<li>Results calculate automatically as you type</li>
<li>Formulas are shown for learning</li>
<li>Use decimal percentages (e.g., 12.5%)</li>
</ul>
<h6>About</h6>
<p>Built with HTML5, CSS3, JavaScript, and Bootstrap 5. All calculations performed locally in your browser.</p>
</div>
</div>
</div>
</div>
