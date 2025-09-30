---
layout: "app"
title: "Date Calculator"
date: 2025-09-30
draft: false
tags: ["Calculator", "Date", "Time", "Utilities", "Calendar"]
description: "Calculate days between dates, add or subtract days from dates, and find business days. Free online date calculator tool."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Date Calculator</h1>
</div>
<div class="card-body">
<div class="form-container">
<ul class="nav nav-pills mb-3 flex-nowrap" style="overflow-x: auto;">
<li class="nav-item"><a class="nav-link active" data-mode="between" href="#">Days Between</a></li>
<li class="nav-item"><a class="nav-link" data-mode="add" href="#">Add/Subtract</a></li>
<li class="nav-item"><a class="nav-link" data-mode="business" href="#">Business Days</a></li>
</ul>

<div class="mode-content" id="mode-between">
<div class="mb-3">
<label class="form-label">From Date:</label>
<input type="date" class="form-control" id="between-from">
</div>
<div class="mb-3">
<label class="form-label">To Date:</label>
<input type="date" class="form-control" id="between-to">
</div>
<button class="btn btn-primary w-100 mb-3" id="between-calc">Calculate</button>
<div class="result-box" id="between-result" style="display:none;">
<div class="result-main"><span id="between-days">0</span> days</div>
<div class="result-detail">
<span id="between-alt">0 years, 0 months, 0 days</span>
</div>
</div>
</div>

<div class="mode-content" id="mode-add" style="display:none;">
<div class="mb-3">
<label class="form-label">Start Date:</label>
<input type="date" class="form-control" id="add-date">
</div>
<div class="row g-2 mb-3">
<div class="col-4">
<label class="form-label">Years:</label>
<input type="number" class="form-control" id="add-years" value="0">
</div>
<div class="col-4">
<label class="form-label">Months:</label>
<input type="number" class="form-control" id="add-months" value="0">
</div>
<div class="col-4">
<label class="form-label">Days:</label>
<input type="number" class="form-control" id="add-days" value="30">
</div>
</div>
<div class="btn-group w-100 mb-3">
<button class="btn btn-outline-primary" id="add-btn-add">Add</button>
<button class="btn btn-outline-danger" id="add-btn-sub">Subtract</button>
</div>
<div class="result-box" id="add-result" style="display:none;">
<div class="result-main" id="add-result-date">-</div>
<div class="result-detail" id="add-result-day">-</div>
</div>
</div>

<div class="mode-content" id="mode-business" style="display:none;">
<div class="mb-3">
<label class="form-label">From Date:</label>
<input type="date" class="form-control" id="business-from">
</div>
<div class="mb-3">
<label class="form-label">To Date:</label>
<input type="date" class="form-control" id="business-to">
</div>
<button class="btn btn-primary w-100 mb-3" id="business-calc">Calculate Business Days</button>
<div class="result-box" id="business-result" style="display:none;">
<div class="result-main"><span id="business-days">0</span> business days</div>
<div class="result-detail">
(Excluding weekends: <span id="business-weekends">0</span> weekend days)
</div>
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
<h5 class="modal-title" id="helpModalLabel">Date Calculator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>Calculate differences between dates, add or subtract time from dates, and count business days.</p>
<h6>Modes</h6>
<ul>
<li><strong>Days Between:</strong> Find the exact number of days between two dates</li>
<li><strong>Add/Subtract:</strong> Add or subtract years, months, and days from a date</li>
<li><strong>Business Days:</strong> Count working days excluding weekends</li>
</ul>
<h6>Use Cases</h6>
<ul>
<li>Calculate project duration and deadlines</li>
<li>Plan events and schedule activities</li>
<li>Track age or time until special dates</li>
<li>Calculate business days for contracts</li>
<li>Find dates for recurring events</li>
</ul>
<h6>About</h6>
<p>Built with HTML5, CSS3, JavaScript, and Bootstrap 5. All calculations performed locally in your browser.</p>
</div>
</div>
</div>
</div>
