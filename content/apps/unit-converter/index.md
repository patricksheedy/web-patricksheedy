---
layout: "app"
title: "Unit Converter"
date: 2025-09-30
draft: false
tags: ["Converter", "Units", "Utilities", "Measurement", "Math"]
description: "Free online unit converter. Convert length, weight, temperature, volume, area, speed, time, and more. Fast and accurate conversions."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Unit Converter</h1>
</div>
<div class="card-body">
<div class="form-container">
<div class="mb-3">
<label for="category" class="form-label fw-bold">Category:</label>
<select class="form-select" id="category">
<option value="length">Length</option>
<option value="weight">Weight</option>
<option value="temperature">Temperature</option>
<option value="volume">Volume</option>
<option value="area">Area</option>
<option value="speed">Speed</option>
<option value="time">Time</option>
<option value="data">Data Storage</option>
</select>
</div>

<div class="conversion-container">
<div class="conversion-box">
<label class="form-label">From:</label>
<div class="input-group mb-2">
<input type="number" class="form-control" id="from-value" value="1" step="any">
<select class="form-select" id="from-unit" style="max-width: 140px;"></select>
</div>
</div>

<div class="swap-container">
<button class="btn btn-outline-primary btn-sm" id="swap-btn">
<i class="fas fa-exchange-alt"></i>
</button>
</div>

<div class="conversion-box">
<label class="form-label">To:</label>
<div class="input-group mb-2">
<input type="number" class="form-control" id="to-value" readonly>
<select class="form-select" id="to-unit" style="max-width: 140px;"></select>
</div>
</div>
</div>

<div class="formula-box mt-3">
<strong>Formula:</strong>
<div id="formula-display" class="mt-1 text-muted">Select units to see formula</div>
</div>

<div class="quick-conversions mt-3">
<strong>Quick Reference:</strong>
<div id="quick-table" class="table-responsive mt-2"></div>
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
<h5 class="modal-title" id="helpModalLabel">Unit Converter Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>
Convert between different units of measurement instantly. Supports length, weight, temperature, volume, area, speed, time, and data storage.
</p>
<h6>How to Use</h6>
<ul>
<li>Select a category (Length, Weight, Temperature, etc.)</li>
<li>Choose your source and target units from the dropdowns</li>
<li>Enter the value to convert</li>
<li>The result appears instantly</li>
<li>Click the swap button to reverse the conversion direction</li>
</ul>
<h6>Supported Conversions</h6>
<ul>
<li><strong>Length:</strong> Meters, kilometers, miles, feet, inches, centimeters, yards, nautical miles</li>
<li><strong>Weight:</strong> Kilograms, grams, pounds, ounces, tons, metric tons</li>
<li><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin</li>
<li><strong>Volume:</strong> Liters, milliliters, gallons, cups, tablespoons, cubic meters</li>
<li><strong>Area:</strong> Square meters, square feet, acres, hectares, square miles</li>
<li><strong>Speed:</strong> Meters/second, kilometers/hour, miles/hour, knots</li>
<li><strong>Time:</strong> Seconds, minutes, hours, days, weeks, years</li>
<li><strong>Data:</strong> Bytes, kilobytes, megabytes, gigabytes, terabytes</li>
</ul>
<h6>Features</h6>
<ul>
<li>Real-time conversion as you type</li>
<li>High precision calculations (up to 10 decimal places)</li>
<li>Conversion formulas displayed for learning</li>
<li>Quick reference table for common values</li>
<li>Responsive design for all devices</li>
</ul>
<h6>About</h6>
<p>
Built with HTML5, CSS3, JavaScript, and Bootstrap 5. All conversions are performed locally in your browser.
</p>
</div>
</div>
</div>
</div>
