---
layout: "app"
title: "Countdown Timer"
date: 2025-09-30
draft: false
tags: ["Timer", "Countdown", "Productivity", "Utilities", "Pomodoro"]
description: "Free online countdown timer with presets. Perfect for cooking, workouts, studying, and productivity. Pomodoro timer included."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Countdown Timer</h1>
</div>
<div class="card-body">
<div class="timer-display-container">
<svg class="timer-circle" viewBox="0 0 200 200">
<circle class="timer-circle-bg" cx="100" cy="100" r="90"></circle>
<circle class="timer-circle-progress" id="progress-circle" cx="100" cy="100" r="90"></circle>
</svg>
<div class="timer-display" id="timer-display">00:00</div>
</div>

<div class="timer-controls mb-3">
<button class="btn btn-success btn-lg" id="start-btn">
<i class="fas fa-play"></i> Start
</button>
<button class="btn btn-warning btn-lg" id="pause-btn" style="display:none;">
<i class="fas fa-pause"></i> Pause
</button>
<button class="btn btn-danger btn-lg" id="reset-btn">
<i class="fas fa-redo"></i> Reset
</button>
</div>

<div class="form-container">
<div class="mb-3">
<label class="form-label fw-bold">Quick Presets:</label>
<div class="preset-buttons">
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="60">1 min</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="300">5 min</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="600">10 min</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="900">15 min</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="1800">30 min</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="1500">Pomodoro</button>
<button class="btn btn-outline-primary btn-sm preset-btn" data-seconds="3600">1 hour</button>
</div>
</div>

<div class="mb-3">
<label class="form-label fw-bold">Custom Time:</label>
<div class="custom-time-inputs">
<div class="time-input-group">
<input type="number" class="form-control" id="hours-input" min="0" max="23" value="0" placeholder="HH">
<small class="text-muted">Hours</small>
</div>
<span class="time-separator">:</span>
<div class="time-input-group">
<input type="number" class="form-control" id="minutes-input" min="0" max="59" value="5" placeholder="MM">
<small class="text-muted">Minutes</small>
</div>
<span class="time-separator">:</span>
<div class="time-input-group">
<input type="number" class="form-control" id="seconds-input" min="0" max="59" value="0" placeholder="SS">
<small class="text-muted">Seconds</small>
</div>
</div>
</div>

<div class="mb-2">
<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="loop-timer">
<label class="form-check-label" for="loop-timer">Loop timer automatically</label>
</div>
</div>

<div class="mb-2">
<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="sound-enabled" checked>
<label class="form-check-label" for="sound-enabled">Play sound when complete</label>
</div>
</div>

<button class="btn btn-outline-secondary btn-sm w-100" id="fullscreen-btn">
<i class="fas fa-expand"></i> Fullscreen Mode
</button>
</div>
</div>
</section>
</div>
</main>

<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="helpModalLabel">Countdown Timer Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>
A versatile countdown timer perfect for cooking, workouts, studying, meditation, and productivity techniques like Pomodoro.
</p>
<h6>How to Use</h6>
<ul>
<li><strong>Quick Presets:</strong> Click any preset button for instant timer setup.</li>
<li><strong>Custom Time:</strong> Enter hours, minutes, and seconds manually.</li>
<li><strong>Start/Pause:</strong> Click the green Start button or press Space bar.</li>
<li><strong>Reset:</strong> Click Reset button or press 'R' key to restart.</li>
<li><strong>Loop Timer:</strong> Enable to automatically restart when timer completes.</li>
<li><strong>Fullscreen:</strong> Enter fullscreen for distraction-free timing.</li>
</ul>
<h6>Keyboard Shortcuts</h6>
<ul>
<li><strong>Space:</strong> Start/Pause timer</li>
<li><strong>R:</strong> Reset timer</li>
<li><strong>F:</strong> Toggle fullscreen</li>
</ul>
<h6>Features</h6>
<ul>
<li>Visual circular progress indicator</li>
<li>Sound notification when complete</li>
<li>Pomodoro technique support (25-minute work sessions)</li>
<li>Works offline - no internet required after loading</li>
<li>Saves your last settings automatically</li>
</ul>
<h6>Use Cases</h6>
<ul>
<li><strong>Cooking:</strong> Time recipes perfectly</li>
<li><strong>Workouts:</strong> HIIT intervals, rest periods, exercise duration</li>
<li><strong>Study:</strong> Pomodoro technique for focused learning</li>
<li><strong>Meditation:</strong> Timed breathing exercises</li>
<li><strong>Productivity:</strong> Time-box tasks and meetings</li>
</ul>
<h6>About</h6>
<p>
Built with HTML5, CSS3, JavaScript, and Bootstrap 5. All functionality runs locally in your browser with no data collection.
</p>
</div>
</div>
</div>
</div>
