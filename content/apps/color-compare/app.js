(function () {
	'use strict';

	const gridEl = document.getElementById('grid');
	const addBtn = document.getElementById('addCol');
	const removeBtn = document.getElementById('removeCol');
	const statusEl = document.getElementById('status');
	const toolbarEl = document.getElementById('toolbar');

	const STORAGE_KEY = 'color-compare:v1';

	let state = {
		grid: [['#808080']] // default 1x1
	};

	// Utilities
	function setToolbarHeightVar() {
		const h = toolbarEl.offsetHeight || 56;
		document.documentElement.style.setProperty('--toolbar-h', `${h}px`);
	}
	window.addEventListener('resize', setToolbarHeightVar);
	window.addEventListener('load', setToolbarHeightVar);
	document.addEventListener('DOMContentLoaded', setToolbarHeightVar);

	function saveState() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid: state.grid }));
			updateStatus();
		} catch {}
	}

	function loadState() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed?.grid) && parsed.grid.length && Array.isArray(parsed.grid[0])) {
				state.grid = parsed.grid;
			} else if (Array.isArray(parsed?.colors) && parsed.colors.length) {
				// migrate legacy 1D colors -> single row grid
				state.grid = [parsed.colors];
			}
		} catch {}
	}

	function updateStatus() {
		const rows = state.grid.length;
		const cols = state.grid[0]?.length || 0;
		statusEl.textContent = `${cols} column${cols === 1 ? '' : 's'} × ${rows} row${rows === 1 ? '' : 's'}`;
	}

	// URL state management
	function encodeStateToUrl() {
		const compressed = state.grid.map(row => row.map(color => 
			color.startsWith('#') ? color.slice(1) : color
		));
		const urlParams = new URLSearchParams();
		urlParams.set('grid', JSON.stringify(compressed));
		return `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
	}

	function loadStateFromUrl() {
		const urlParams = new URLSearchParams(window.location.search);
		const gridParam = urlParams.get('grid');
		if (gridParam) {
			try {
				const parsed = JSON.parse(gridParam);
				if (Array.isArray(parsed) && parsed.length && Array.isArray(parsed[0])) {
					state.grid = parsed.map(row => row.map(color => 
						color.startsWith('#') ? color : `#${color}`
					));
					return true;
				}
			} catch {}
		}
		return false;
	}

	function randomizeColors() {
		const rows = state.grid.length;
		const cols = state.grid[0]?.length || 0;
		
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
				state.grid[r][c] = randomColor;
			}
		}
		saveState();
		render();
	}

	function resetGrid() {
		state.grid = [['#808080']];
		saveState();
		render();
	}

	function isValidCssColor(value) {
		if (!value || typeof value !== 'string') return false;
		return CSS.supports && CSS.supports('color', value.trim());
	}

	function rgbStringToRgb(rgbStr) {
		// rgb(12, 34, 56) or rgba(12, 34, 56, a)
		const m = rgbStr.replace(/\s+/g, '').match(/^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,[^)]+)?\)$/i);
		if (!m) return null;
		return { r: +m[1], g: +m[2], b: +m[3] };
	}

	function rgbToHex({ r, g, b }) {
		const toHex = (n) => n.toString(16).padStart(2, '0');
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	}

	function rgbToHsl({ r, g, b }) {
		// Convert 0-255 to 0-1
		let R = r / 255, G = g / 255, B = b / 255;
		const max = Math.max(R, G, B), min = Math.min(R, G, B);
		let h, s, l = (max + min) / 2;

		if (max === min) {
			h = s = 0;
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case R: h = (G - B) / d + (G < B ? 6 : 0); break;
				case G: h = (B - R) / d + 2; break;
				case B: h = (R - G) / d + 4; break;
			}
			h /= 6;
		}
		return {
			h: Math.round(h * 360),
			s: Math.round(s * 100),
			l: Math.round(l * 100)
		};
	}

	function parseToRgb(cssColor) {
		// Use a temporary element to get computed rgb
		const el = document.createElement('span');
		el.style.color = cssColor;
		document.body.appendChild(el);
		const comp = getComputedStyle(el).color;
		document.body.removeChild(el);
		return rgbStringToRgb(comp);
	}

	function relativeLuminance({ r, g, b }) {
		const srgb = [r, g, b].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
		return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
	}

	function shouldUseDarkUI(rgb) {
		// Return true if background is dark -> use light text UI
		// WCAG recommended threshold using Y > 0.179 => prefer dark text, else light text
		const Y = relativeLuminance(rgb);
		return Y <= 0.179; // dark bg -> ui-dark (light text)
	}

	function buildFormatsText(rgb) {
		const hex = rgbToHex(rgb);
		const hsl = rgbToHsl(rgb);
		return {
			hex,
			rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
			hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
		};
	}

	// Adjust to address cell by row and column
	function createSwatchEl(rowIndex, colIndex, initialColor) {
		const swatch = document.createElement('div');
		swatch.className = 'swatch';
		swatch.setAttribute('role', 'gridcell');
		swatch.dataset.row = String(rowIndex);
		swatch.dataset.col = String(colIndex);

		const controls = document.createElement('div');
		controls.className = 'controls';

		// Text input
		const textInput = document.createElement('input');
		textInput.type = 'text';
		textInput.className = 'form-control form-control-sm color-input';
		textInput.placeholder = 'Enter CSS color (e.g. #00A, rgb, hsl, blue)';
		textInput.setAttribute('aria-label', 'Color value');

		// Color picker
		const picker = document.createElement('input');
		picker.type = 'color';
		picker.className = 'form-control form-control-color color-picker';
		picker.setAttribute('aria-label', 'Open color picker');

		// Copy button
		const copyBtn = document.createElement('button');
		copyBtn.type = 'button';
		copyBtn.className = 'btn btn-outline-secondary btn-sm';
		copyBtn.textContent = 'Copy';
		copyBtn.setAttribute('aria-label', 'Copy color value');

		// Formats line
		const formats = document.createElement('div');
		formats.className = 'formats';
		formats.setAttribute('aria-live', 'polite');

		controls.appendChild(textInput);
		controls.appendChild(picker);
		controls.appendChild(copyBtn);
		controls.appendChild(formats);

		swatch.appendChild(controls);

		function applyColor(cssColor, from) {
			if (!isValidCssColor(cssColor)) {
				textInput.classList.add('is-invalid');
				return false;
			}
			textInput.classList.remove('is-invalid');

			// Update background color
			swatch.style.backgroundColor = cssColor;

			// Compute rgb and formats
			const rgb = parseToRgb(cssColor);
			if (!rgb) return false;

			// Contrast class
			const darkUI = shouldUseDarkUI(rgb);
			swatch.classList.toggle('ui-dark', darkUI);
			swatch.classList.toggle('ui-light', !darkUI);

			// Sync picker to hex
			const hex = rgbToHex(rgb);
			if (picker.value.toUpperCase() !== hex) {
				picker.value = hex;
			}

			// Sync text input if update came from picker or internal normalization
			if (from === 'picker') {
				textInput.value = hex;
			}

			// Formats text
			const fmt = buildFormatsText(rgb);
			formats.textContent = `${fmt.hex}  |  ${fmt.rgb}  |  ${fmt.hsl}`;

			// Persist state
			const r = Number(swatch.dataset.row);
			const c = Number(swatch.dataset.col);
			state.grid[r][c] = textInput.value || hex;
			saveState();

			return true;
		}

		// Wire events
		textInput.addEventListener('input', () => {
			const val = textInput.value.trim();
			applyColor(val, 'text');
		});
		picker.addEventListener('input', () => {
			applyColor(picker.value, 'picker');
		});
		copyBtn.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(textInput.value || picker.value);
				copyBtn.textContent = 'Copied';
				setTimeout(() => (copyBtn.textContent = 'Copy'), 1000);
			} catch {}
		});

		// Initialize
		textInput.value = initialColor;
		applyColor(initialColor, 'init');

		// Keyboard accessibility for the swatch area to focus input
		swatch.tabIndex = 0;
		swatch.addEventListener('keydown', (e) => {
			if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === swatch) {
				e.preventDefault();
				textInput.focus();
			}
		});
		swatch.addEventListener('focus', () => textInput.focus());

		return swatch;
	}

	function render() {
		gridEl.innerHTML = '';

		// Keep grid flex layout; render columns, each stacking rows equally
		const rows = state.grid.length;
		const cols = state.grid[0]?.length || 0;

		gridEl.style.display = 'flex';
		gridEl.style.alignItems = 'stretch';
		gridEl.style.justifyContent = 'stretch';

		for (let c = 0; c < cols; c++) {
			const colEl = document.createElement('div');
			colEl.style.display = 'flex';
			colEl.style.flexDirection = 'column';
			colEl.style.flex = '1 1 0';
			colEl.style.minWidth = '140px';

			for (let r = 0; r < rows; r++) {
				const color = state.grid[r][c] ?? '#808080';
				const sw = createSwatchEl(r, c, color);
				colEl.appendChild(sw);
			}
			gridEl.appendChild(colEl);
		}
		updateStatus();
	}

	function addColumn() {
		const rows = state.grid.length;
		for (let r = 0; r < rows; r++) {
			const row = state.grid[r];
			const fallback = row.length ? row[row.length - 1] : '#808080';
			row.push(fallback);
		}
		saveState();
		render();
	}

	function removeColumn() {
		const cols = state.grid[0]?.length || 0;
		if (cols <= 1) return;
		for (let r = 0; r < state.grid.length; r++) {
			state.grid[r].pop();
		}
		saveState();
		render();
	}

	function addRow() {
		const cols = state.grid[0]?.length || 1;
		const lastRow = state.grid[state.grid.length - 1];
		const newRow = lastRow ? lastRow.slice() : Array.from({ length: cols }, () => '#808080');
		state.grid.push(newRow);
		saveState();
		render();
	}

	function removeRow() {
		if (state.grid.length <= 1) return;
		state.grid.pop();
		saveState();
		render();
	}

	// Init - check URL first, then localStorage
	if (!loadStateFromUrl()) {
		loadState();
	}
	render();

	// Replace toolbar buttons with new layout
	function setupToolbar() {
		// Hide original buttons
		if (addBtn) addBtn.style.display = 'none';
		if (removeBtn) removeBtn.style.display = 'none';

		// Find or create button container
		let buttonContainer = toolbarEl.querySelector('.button-container');
		if (!buttonContainer) {
			buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container d-flex align-items-center gap-2';
			
			// Insert before status if it exists
			if (statusEl && toolbarEl.contains(statusEl)) {
				toolbarEl.insertBefore(buttonContainer, statusEl);
			} else {
				toolbarEl.appendChild(buttonContainer);
			}
		}

		// Columns controls
		const colGroup = document.createElement('div');
		colGroup.className = 'btn-group btn-group-sm';
		colGroup.setAttribute('role', 'group');
		colGroup.setAttribute('aria-label', 'Column controls');

		const colMinus = document.createElement('button');
		colMinus.type = 'button';
		colMinus.className = 'btn btn-outline-light';
		colMinus.textContent = '−';
		colMinus.setAttribute('aria-label', 'Remove column');
		colMinus.addEventListener('click', removeColumn);

		const colLabel = document.createElement('button');
		colLabel.type = 'button';
		colLabel.className = 'btn btn-outline-light';
		colLabel.textContent = 'Columns';
		colLabel.style.pointerEvents = 'none';

		const colPlus = document.createElement('button');
		colPlus.type = 'button';
		colPlus.className = 'btn btn-outline-light';
		colPlus.textContent = '+';
		colPlus.setAttribute('aria-label', 'Add column');
		colPlus.addEventListener('click', addColumn);

		colGroup.appendChild(colMinus);
		colGroup.appendChild(colLabel);
		colGroup.appendChild(colPlus);

		// Rows controls
		const rowGroup = document.createElement('div');
		rowGroup.className = 'btn-group btn-group-sm';
		rowGroup.setAttribute('role', 'group');
		rowGroup.setAttribute('aria-label', 'Row controls');

		const rowMinus = document.createElement('button');
		rowMinus.type = 'button';
		rowMinus.className = 'btn btn-outline-light';
		rowMinus.textContent = '−';
		rowMinus.setAttribute('aria-label', 'Remove row');
		rowMinus.addEventListener('click', removeRow);

		const rowLabel = document.createElement('button');
		rowLabel.type = 'button';
		rowLabel.className = 'btn btn-outline-light';
		rowLabel.textContent = 'Rows';
		rowLabel.style.pointerEvents = 'none';

		const rowPlus = document.createElement('button');
		rowPlus.type = 'button';
		rowPlus.className = 'btn btn-outline-light';
		rowPlus.textContent = '+';
		rowPlus.setAttribute('aria-label', 'Add row');
		rowPlus.addEventListener('click', addRow);

		rowGroup.appendChild(rowMinus);
		rowGroup.appendChild(rowLabel);
		rowGroup.appendChild(rowPlus);

		// Reset button
		const resetBtn = document.createElement('button');
		resetBtn.type = 'button';
		resetBtn.className = 'btn btn-warning btn-sm';
		resetBtn.textContent = 'Reset Grid';
		resetBtn.setAttribute('aria-label', 'Reset to 1x1 grid');
		resetBtn.addEventListener('click', resetGrid);

		// Randomize button
		const randomBtn = document.createElement('button');
		randomBtn.type = 'button';
		randomBtn.className = 'btn btn-info btn-sm';
		randomBtn.textContent = 'Randomize Colors';
		randomBtn.setAttribute('aria-label', 'Randomize all colors');
		randomBtn.addEventListener('click', randomizeColors);

		// Share button
		const shareBtn = document.createElement('button');
		shareBtn.type = 'button';
		shareBtn.className = 'btn btn-success btn-sm';
		shareBtn.textContent = 'Share Link';
		shareBtn.setAttribute('aria-label', 'Copy share URL to clipboard');
		shareBtn.addEventListener('click', async () => {
			try {
				const url = encodeStateToUrl();
				await navigator.clipboard.writeText(url);
				shareBtn.textContent = 'Link copied to clipboard';
				setTimeout(() => (shareBtn.textContent = 'Share'), 2500);
			} catch {
				// Fallback for browsers without clipboard API
				const url = encodeStateToUrl();
				window.prompt('Copy this URL to share:', url);
			}
		});

		// Add all controls to container
		buttonContainer.appendChild(colGroup);
		buttonContainer.appendChild(rowGroup);
		buttonContainer.appendChild(resetBtn);
		buttonContainer.appendChild(randomBtn);
		buttonContainer.appendChild(shareBtn);

		console.log('3 Toolbar setup complete');
	}

	setupToolbar();
	updateStatus();
})();
