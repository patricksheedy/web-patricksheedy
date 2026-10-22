---
layout: "app"
title: "Image Viewer"
date: 2026-10-21
draft: false
tags: ["JavaScript", "CSS3", "HTML5"]
description: "Drop images into five targets to view them side by side."
---

<style>
	html, body {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}

	.viewer {
		display: flex;
		width: 100vw;
		height: 100vh;
	}

	.viewer-left {
		width: 50vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 2.5vw;
		box-sizing: border-box;
	}

	.viewer-right {
		width: 50vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.drop-target {
		position: relative;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.03);
		border: 2px dashed #495057;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.drop-target.primary {
		width: 45vw;
		aspect-ratio: 1 / 1;
	}

	.drop-target.primary img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.viewer-right .drop-target img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.drop-target .placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: #6c757d;
		user-select: none;
		pointer-events: none;
	}

	.drop-target .placeholder i {
		font-size: 2.5rem;
	}

	.drop-target.dragover {
		border-color: #0d6efd;
		background: rgba(13, 110, 253, 0.1);
	}

	.drop-target img {
		display: none;
	}

	.drop-target.has-image img {
		display: block;
	}

	.drop-target.has-image .placeholder {
		display: none;
	}
</style>

<main class="viewer">
	<div class="viewer-left">
		<div class="drop-target primary" data-target>
			<div class="placeholder">
				<i class="fas fa-image"></i>
				<span>Drop image here</span>
			</div>
			<img alt="" draggable="true" />
		</div>
	</div>
	<div class="viewer-right">
		<div class="drop-target" data-target>
			<div class="placeholder">
				<i class="fas fa-image"></i>
				<span>Drop image here</span>
			</div>
			<img alt="" draggable="true" />
		</div>
		<div class="drop-target" data-target>
			<div class="placeholder">
				<i class="fas fa-image"></i>
				<span>Drop image here</span>
			</div>
			<img alt="" draggable="true" />
		</div>
		<div class="drop-target" data-target>
			<div class="placeholder">
				<i class="fas fa-image"></i>
				<span>Drop image here</span>
			</div>
			<img alt="" draggable="true" />
		</div>
		<div class="drop-target" data-target>
			<div class="placeholder">
				<i class="fas fa-image"></i>
				<span>Drop image here</span>
			</div>
			<img alt="" draggable="true" />
		</div>
	</div>
</main>

<script>
(function () {
	const targets = document.querySelectorAll('[data-target]');

	targets.forEach(target => {
		const img = target.querySelector('img');

		img.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text/plain', img.src);
			e.dataTransfer.effectAllowed = 'copyMove';
		});

		target.addEventListener('dragover', e => {
			e.preventDefault();
			e.stopPropagation();
			e.dataTransfer.dropEffect = e.dataTransfer.types.includes('Files') ? 'copy' : 'move';
			target.classList.add('dragover');
		});

		target.addEventListener('dragleave', e => {
			e.preventDefault();
			target.classList.remove('dragover');
		});

		target.addEventListener('drop', e => {
			e.preventDefault();
			e.stopPropagation();
			target.classList.remove('dragover');

			const file = e.dataTransfer.files && e.dataTransfer.files[0];
			if (file && file.type.startsWith('image/')) {
				setImage(img, URL.createObjectURL(file));
				return;
			}

			const src = e.dataTransfer.getData('text/plain');
			if (src) setImage(img, src);
		});
	});

	function setImage(img, src) {
		if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
		img.src = src;
		img.closest('.drop-target').classList.add('has-image');
	}
})();
</script>
