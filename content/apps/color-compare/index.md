---
layout: "app"
title: "ComfyUI Installation Script"
date: 2025-08-08
draft: false
tags: ["ComfyUI", "Script", "AI"]
description: "Easily install and manage multiple copies of ComfyUI with this script."
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

<style>
	.grid {
		gap: 1px;
		background-color: black;
	}
	.grid > * {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem 0.5rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.2rem;
		height: 1.5rem;
		min-width: 1.5rem;
		background: white;
		color: #6c757d;
		border: 1px solid #ced4da;
	}
	.btn-icon:hover {
		background: #f8f9fa;
		color: #495057;
	}
	.input-group-copy {
		display: flex;
		border: 1px solid #ced4da;
		border-radius: 0.375rem;
		overflow: hidden;
	}
	.input-group-copy input {
		flex: 1;
		border: none;
		outline: none;
		padding: 0.375rem 0.75rem;
		background: white;
	}
	.input-group-copy .btn-copy {
		border: none;
		border-left: 1px solid #ced4da;
		border-radius: 0;
		padding: 0.375rem 0.5rem;
		background: white;
		color: #6c757d;
		cursor: pointer;
	}
	.input-group-copy .btn-copy:hover {
		background: #f8f9fa;
		color: #495057;
	}
</style>

<nav id="toolbar" class="navbar navbar-dark bg-dark fixed-top shadow-sm px-3" role="navigation" aria-label="Color Compare toolbar">
	<div class="d-flex align-items-center gap-2">
		<button id="addCol" class="btn btn-primary btn-sm" type="button" aria-label="Add Column">Add Column</button>
		<button id="removeCol" class="btn btn-outline-light btn-sm" type="button" aria-label="Remove Column">Remove Column</button>
	</div>
	<div class="ms-auto text-light small" id="status" aria-live="polite"></div>
</nav>

<main id="grid" class="grid" role="grid" aria-label="Color swatches grid">
</main>

<script>
(function () {
	function upgradeColorInputs() {
		const scope = document.getElementById('grid') || document;
		scope.querySelectorAll('input[type="color"]').forEach(input => {
			if (input.dataset.iconified === 'true') return;
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'btn btn-outline-secondary btn-icon';
			btn.setAttribute('aria-label', input.getAttribute('aria-label') || input.getAttribute('title') || 'Pick color');
			btn.innerHTML = '<span class="material-icons" aria-hidden="true">colorize</span>';
			btn.addEventListener('click', () => (input.showPicker ? input.showPicker() : input.click()));
			input.classList.add('visually-hidden');
			input.insertAdjacentElement('afterend', btn);
			input.dataset.iconified = 'true';
		});
	}

	function upgradeRGBInputs() {
		const scope = document.getElementById('grid') || document;
		scope.querySelectorAll('input[type="text"]').forEach(input => {
			// Check if this looks like an RGB/hex input
			const isRGBInput = input.placeholder && (
				input.placeholder.toLowerCase().includes('rgb') ||
				input.placeholder.toLowerCase().includes('hex') ||
				input.placeholder.startsWith('#')
			);
			
			if (!isRGBInput || input.dataset.copyified === 'true') return;
			
			const wrapper = document.createElement('div');
			wrapper.className = 'input-group-copy';
			
			const copyBtn = document.createElement('button');
			copyBtn.type = 'button';
			copyBtn.className = 'btn-copy';
			copyBtn.innerHTML = '<span class="material-icons" style="font-size: 1rem;">content_copy</span>';
			copyBtn.setAttribute('aria-label', 'Copy RGB code');
			copyBtn.addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(input.value);
					copyBtn.innerHTML = '<span class="material-icons" style="font-size: 1rem;">check</span>';
					setTimeout(() => {
						copyBtn.innerHTML = '<span class="material-icons" style="font-size: 1rem;">content_copy</span>';
					}, 1000);
				} catch (err) {
					// Fallback for older browsers
					input.select();
					document.execCommand('copy');
				}
			});
			
			input.parentNode.insertBefore(wrapper, input);
			wrapper.appendChild(input);
			wrapper.appendChild(copyBtn);
			
			// Remove existing classes that might interfere
			input.classList.remove('form-control');
			input.dataset.copyified = 'true';
		});
	}

	function upgradeAllInputs() {
		upgradeColorInputs();
		upgradeRGBInputs();
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', upgradeAllInputs);
	else upgradeAllInputs();
	
	// Also run when new elements are added
	const observer = new MutationObserver(() => upgradeAllInputs());
	observer.observe(document.getElementById('grid') || document.body, { childList: true, subtree: true });
})();
</script>
