---
layout: "app"
title: "Random Number Generator"
date: 2025-09-30
draft: false
tags: ["Random", "Generator", "Utilities", "Numbers", "Dice"]
description: "Generate random numbers, roll dice, flip coins. Cryptographically secure random number generator with statistics."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Random Number Generator</h1>
</div>
<div class="card-body">
<div class="form-container">
<div class="row g-2 mb-3">
<div class="col-6">
<label class="form-label">Minimum:</label>
<input type="number" class="form-control" id="min-value" value="1">
</div>
<div class="col-6">
<label class="form-label">Maximum:</label>
<input type="number" class="form-control" id="max-value" value="100">
</div>
</div>

<div class="mb-3">
<label class="form-label">How many numbers: <span id="count-display">1</span></label>
<input type="range" class="form-range" id="count-slider" min="1" max="100" value="1">
</div>

<div class="mb-3">
<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="unique-numbers">
<label class="form-check-label" for="unique-numbers">Unique numbers only (no duplicates)</label>
</div>
</div>

<div class="preset-buttons mb-3">
<button class="btn btn-outline-primary btn-sm" data-preset="1,10">1-10</button>
<button class="btn btn-outline-primary btn-sm" data-preset="1,100">1-100</button>
<button class="btn btn-outline-primary btn-sm" data-preset="1,6">🎲 Dice</button>
<button class="btn btn-outline-primary btn-sm" data-preset="0,1">🪙 Coin</button>
<button class="btn btn-outline-primary btn-sm" data-preset="1,1000">1-1000</button>
</div>

<button class="btn btn-success btn-lg w-100 mb-3" id="generate-btn">
<i class="fas fa-sync-alt me-2"></i>Generate
</button>

<div class="result-display" id="result-display"></div>

<div id="stats-display" style="display:none;" class="stats-box mt-3">
<strong>Statistics:</strong>
<div class="stat-grid">
<div>Sum: <span id="stat-sum">0</span></div>
<div>Average: <span id="stat-avg">0</span></div>
<div>Min: <span id="stat-min">0</span></div>
<div>Max: <span id="stat-max">0</span></div>
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
<h5 class="modal-title" id="helpModalLabel">Random Number Generator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>Generate random numbers for games, statistics, decision-making, and more. Uses cryptographically secure randomness.</p>
<h6>How to Use</h6>
<ul>
<li>Set minimum and maximum values</li>
<li>Choose how many numbers to generate (1-100)</li>
<li>Enable "Unique numbers only" to avoid duplicates</li>
<li>Click presets for quick options (Dice, Coin, etc.)</li>
<li>Click Generate to create random numbers</li>
<li>View statistics when generating multiple numbers</li>
</ul>
<h6>Use Cases</h6>
<ul>
<li>Roll dice for board games</li>
<li>Pick lottery numbers</li>
<li>Make random selections</li>
<li>Generate test data</li>
<li>Random sampling for statistics</li>
<li>Flip coins for decisions</li>
</ul>
<h6>About</h6>
<p>Uses crypto.getRandomValues() for cryptographically secure random number generation. All processing is done locally.</p>
</div>
</div>
</div>
</div>
