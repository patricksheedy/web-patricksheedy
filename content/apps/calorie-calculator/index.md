---
layout: "app"
title: "Calorie Calculator"
date: 2025-09-30
draft: false
tags: ["Calculator", "Health", "Fitness", "Calories", "Nutrition", "Diet"]
description: "Calculate daily calorie needs, BMR, TDEE, and macros. Get personalized calorie goals for weight loss, maintenance, or muscle gain."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Calorie Calculator</h1>
</div>
<div class="card-body">
<div class="form-container">
<div class="mb-3">
<div class="btn-group w-100">
<input type="radio" class="btn-check" name="units" id="metric" checked>
<label class="btn btn-outline-primary" for="metric">Metric</label>
<input type="radio" class="btn-check" name="units" id="imperial">
<label class="btn btn-outline-primary" for="imperial">Imperial</label>
</div>
</div>

<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">Age:</label>
<input type="number" class="form-control" id="age" value="30" min="15" max="100">
</div>
<div class="col-6">
<label class="form-label">Gender:</label>
<select class="form-select" id="gender">
<option value="male">Male</option>
<option value="female">Female</option>
</select>
</div>
</div>

<div class="row g-2 mb-3" id="metric-inputs">
<div class="col-6">
<label class="form-label">Weight (kg):</label>
<input type="number" class="form-control" id="weight-kg" value="70" step="0.1">
</div>
<div class="col-6">
<label class="form-label">Height (cm):</label>
<input type="number" class="form-control" id="height-cm" value="170" step="0.1">
</div>
</div>

<div class="row g-2 mb-3" id="imperial-inputs" style="display:none;">
<div class="col-6">
<label class="form-label">Weight (lbs):</label>
<input type="number" class="form-control" id="weight-lbs" value="154" step="0.1">
</div>
<div class="col-6">
<label class="form-label">Height (inches):</label>
<input type="number" class="form-control" id="height-in" value="67" step="0.1">
</div>
</div>

<div class="mb-3">
<label class="form-label">Activity Level:</label>
<select class="form-select" id="activity">
<option value="1.2">Sedentary (little or no exercise)</option>
<option value="1.375">Lightly active (exercise 1-3 days/week)</option>
<option value="1.55" selected>Moderately active (exercise 3-5 days/week)</option>
<option value="1.725">Very active (exercise 6-7 days/week)</option>
<option value="1.9">Extremely active (physical job or 2x training)</option>
</select>
</div>

<button class="btn btn-success w-100 mb-3" id="calc-btn">Calculate</button>

<div id="results" style="display:none;">
<div class="calorie-results mb-3">
<div class="calorie-card">
<div class="calorie-label">BMR</div>
<div class="calorie-value" id="bmr">0</div>
<small class="text-muted">Base Metabolic Rate</small>
</div>
<div class="calorie-card primary">
<div class="calorie-label">TDEE</div>
<div class="calorie-value" id="tdee">0</div>
<small class="text-muted">Maintenance</small>
</div>
</div>

<div class="goals-box mb-3">
<strong>Calorie Goals:</strong>
<div class="goal-item">
<span>Weight Loss (0.5 kg/week):</span>
<strong id="goal-loss">0</strong> cals
</div>
<div class="goal-item">
<span>Maintenance:</span>
<strong id="goal-maintain">0</strong> cals
</div>
<div class="goal-item">
<span>Weight Gain (0.5 kg/week):</span>
<strong id="goal-gain">0</strong> cals
</div>
</div>

<div class="macros-box">
<strong>Macros (Balanced Diet):</strong>
<div class="macro-item">
<span>Protein (30%):</span>
<strong id="macro-protein">0g</strong>
</div>
<div class="macro-item">
<span>Carbs (40%):</span>
<strong id="macro-carbs">0g</strong>
</div>
<div class="macro-item">
<span>Fats (30%):</span>
<strong id="macro-fats">0g</strong>
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
<h5 class="modal-title" id="helpModalLabel">Calorie Calculator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>Calculate your daily calorie needs based on age, gender, weight, height, and activity level. Get personalized goals for weight loss, maintenance, or gain.</p>
<h6>Calculations</h6>
<ul>
<li><strong>BMR:</strong> Basal Metabolic Rate - calories burned at rest</li>
<li><strong>TDEE:</strong> Total Daily Energy Expenditure - total calories burned daily</li>
</ul>
<h6>Activity Levels</h6>
<ul>
<li><strong>Sedentary:</strong> Desk job, little exercise</li>
<li><strong>Lightly Active:</strong> Light exercise 1-3 days/week</li>
<li><strong>Moderately Active:</strong> Moderate exercise 3-5 days/week</li>
<li><strong>Very Active:</strong> Hard exercise 6-7 days/week</li>
<li><strong>Extremely Active:</strong> Physical job + training</li>
</ul>
<h6>About</h6>
<p>Uses Mifflin-St Jeor Equation for BMR calculation. Macros based on balanced 30/40/30 split. Consult a healthcare professional for personalized advice.</p>
</div>
</div>
</div>
</div>
