---
layout: "app"
title: "ComfyUI Installation Script"
date: 2025-08-08
draft: false
tags: ["ComfyUI", "Script", "AI"]
description: "Easily install and manage multiple copies of ComfyUI with this script."
---

<nav id="toolbar" class="navbar navbar-dark bg-dark fixed-top shadow-sm px-3" role="navigation" aria-label="Color Compare toolbar">
	<div class="d-flex align-items-center gap-2">
		<button id="addCol" class="btn btn-primary btn-sm" type="button" aria-label="Add Column">Add Column</button>
		<button id="removeCol" class="btn btn-outline-light btn-sm" type="button" aria-label="Remove Column">Remove Column</button>
	</div>
	<div class="ms-auto text-light small" id="status" aria-live="polite"></div>
</nav>

<main id="grid" class="grid" role="grid" aria-label="Color swatches grid">
	<!-- Columns are dynamically injected -->
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./app.js"></script>
