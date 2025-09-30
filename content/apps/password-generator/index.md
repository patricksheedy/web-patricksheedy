---
layout: "app"
title: "Password Generator"
date: 2025-09-30
draft: false
tags: ["Security", "Password", "Generator", "Utilities", "Privacy"]
description: "Generate strong, secure, random passwords with customizable length and character options. Free online password generator tool."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
<button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
<i class="fas fa-question fa-lg text-primary"></i>
</button>
<div class="calc-wrap">
<section class="card shadow-lg border-0 h-100">
<div class="card-header bg-transparent">
<h1 class="h4 mb-0 text-center">Secure Password Generator</h1>
</div>
<div class="card-body">
<div class="password-display-container mb-3">
<div class="password-output" id="password-output">Click Generate</div>
<button class="btn btn-primary" id="copy-btn" title="Copy to clipboard">
<i class="fas fa-copy"></i>
</button>
</div>

<div class="strength-container mb-4">
<div class="d-flex justify-content-between mb-1">
<span class="strength-label">Password Strength:</span>
<span class="strength-text" id="strength-text">-</span>
</div>
<div class="progress" style="height: 8px;">
<div class="progress-bar" id="strength-bar" role="progressbar" style="width: 0%"></div>
</div>
<small class="text-muted" id="entropy-text"></small>
</div>

<div class="form-container">
<div class="mb-3">
<label for="length-slider" class="form-label">Length: <span id="length-value">16</span></label>
<input type="range" class="form-range" id="length-slider" min="8" max="128" value="16">
</div>

<div class="mb-3">
<label class="form-label">Character Types:</label>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="uppercase" checked>
<label class="form-check-label" for="uppercase">Uppercase (A-Z)</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="lowercase" checked>
<label class="form-check-label" for="lowercase">Lowercase (a-z)</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="numbers" checked>
<label class="form-check-label" for="numbers">Numbers (0-9)</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="symbols" checked>
<label class="form-check-label" for="symbols">Symbols (!@#$%^&*)</label>
</div>
</div>

<div class="mb-3">
<div class="form-check">
<input class="form-check-input" type="checkbox" id="avoid-ambiguous">
<label class="form-check-label" for="avoid-ambiguous">Avoid ambiguous characters (0, O, l, 1, I)</label>
</div>
</div>

<div class="mb-3">
<label for="batch-count" class="form-label">Generate: <span id="batch-value">1</span> password(s)</label>
<input type="range" class="form-range" id="batch-count" min="1" max="10" value="1">
</div>

<button id="generate-btn" class="btn btn-success btn-lg w-100 mb-2">
<i class="fas fa-sync-alt me-2"></i>Generate Password
</button>
</div>

<div id="batch-results" class="batch-results mt-3"></div>
</div>
</section>
</div>
</main>

<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="helpModalLabel">Password Generator Help</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h6>Overview</h6>
<p>
The Secure Password Generator creates strong, random passwords to help protect your online accounts. 
Customize length and character types to meet specific password requirements.
</p>
<h6>How to Use</h6>
<ul>
<li><strong>Adjust Length:</strong> Use the slider to set password length (8-128 characters).</li>
<li><strong>Select Character Types:</strong> Check boxes to include uppercase, lowercase, numbers, or symbols.</li>
<li><strong>Avoid Ambiguous Characters:</strong> Enable this to exclude confusing characters like 0/O and 1/l/I.</li>
<li><strong>Batch Generation:</strong> Generate multiple passwords at once (up to 10).</li>
<li><strong>Copy:</strong> Click the copy button to copy passwords to your clipboard.</li>
</ul>
<h6>Password Strength Levels</h6>
<ul>
<li><strong>Weak:</strong> Less than 50 bits of entropy - Not recommended</li>
<li><strong>Fair:</strong> 50-65 bits - Acceptable for low-security accounts</li>
<li><strong>Good:</strong> 65-80 bits - Good for most accounts</li>
<li><strong>Strong:</strong> 80-100 bits - Excellent security</li>
<li><strong>Very Strong:</strong> 100+ bits - Maximum security</li>
</ul>
<h6>Security Tips</h6>
<ul>
<li>Use unique passwords for each account</li>
<li>Longer passwords are exponentially more secure</li>
<li>Include multiple character types for better security</li>
<li>Store passwords in a reputable password manager</li>
<li>Never share passwords or write them down</li>
<li>Change passwords regularly, especially after security breaches</li>
</ul>
<h6>About</h6>
<p>
All passwords are generated locally in your browser using cryptographically secure random number generation. 
No passwords are sent to any server or stored anywhere.
</p>
</div>
</div>
</div>
</div>
