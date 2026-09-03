<script>
	import { onMount, onDestroy } from "svelte";
	import { t as CanvasPlayback } from "../../../utils/wte/playback.js";

	// Props personalizables
	export let text = "ASCII ART HERE";
	export let wasmUrl = "/omarchy-redesign/laseretch.wasm";
	export let effect = "laseretch";
	export let frameRate = 240;

	// Constantes de diseño
	const ART_COLUMNS = 81;
	const ART_ROWS = 10;
	const CELL_ASPECT = 2;
	const FONT_WAIT_MS = 1000;

	// Referencias a elementos del DOM
	let preElement;
	let canvasElement;
	let holderElement;

	// Instancias y limpiezas
	let playbackInstance = null;
	let resizeObserver = null;
	let wasmBytes = null;
	let animationFrameId = 0;

	function prefersReducedMotion() {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	async function loadWasm() {
		const response = await fetch(wasmUrl);
		if (!response.ok) {
			throw new Error(`laseretch WASM error: ${response.status}`);
		}
		wasmBytes = await response.arrayBuffer();
	}

	function getWasmUrl() {
		if (!wasmBytes) throw new Error("WASM no cargado");
		return wasmBytes;
	}

	function afterFonts() {
		if (typeof document === "undefined" || !document.fonts?.ready) {
			return Promise.resolve();
		}
		return Promise.race([
			document.fonts.ready,
			new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
		]);
	}

	function calculateNativeGrid(host) {
		const box = host.getBoundingClientRect();
		const cell = Math.max(
			1,
			Math.floor(
				Math.min(
					box.width / ART_COLUMNS,
					box.height / (ART_ROWS * CELL_ASPECT),
				),
			),
		);
		return {
			width: cell * ART_COLUMNS,
			height: cell * ART_ROWS * CELL_ASPECT,
		};
	}

	function scaleCanvas(canvas, host, nativeWidth, nativeHeight) {
		const box = host.getBoundingClientRect();
		if (box.width < 1 || box.height < 1) return;
		canvas.style.transform = `scale(${box.width / nativeWidth}, ${box.height / nativeHeight})`;
	}

	function watchSize(target, onChange) {
		const schedule = () => {
			if (animationFrameId !== 0) return;
			animationFrameId = requestAnimationFrame(() => {
				animationFrameId = 0;
				onChange();
			});
		};
		resizeObserver = new ResizeObserver(schedule);
		resizeObserver.observe(target);
	}

	onMount(async () => {
		if (prefersReducedMotion() || !preElement) return;

		const input = text.trim();
		if (!input) return;

		try {
			await afterFonts();
			await loadWasm();

			const box = preElement.getBoundingClientRect();
			if (box.width < 8 || box.height < 8) return;

			const native = calculateNativeGrid(preElement);
			canvasElement.style.width = `${native.width}px`;
			canvasElement.style.height = `${native.height}px`;
			scaleCanvas(canvasElement, preElement, native.width, native.height);

			playbackInstance = new CanvasPlayback({
				canvas: canvasElement,
				width: () => native.width,
				height: () => native.height,
				connected: () => canvasElement.isConnected,
				input: () => input,
				effect: () => effect,
				wasmUrl: getWasmUrl,
				onFinished() {},
				frameRate: () => frameRate,
			});

			watchSize(preElement, () => {
				scaleCanvas(
					canvasElement,
					preElement,
					native.width,
					native.height,
				);
			});

			const onError = (event) => {
				const message = String(event.message ?? event.error ?? "");
				if (
					/memory access out of bounds|RuntimeError|CompileError|WebAssembly/i.test(
						message,
					)
				) {
					cleanup();
				}
			};

			window.addEventListener("error", onError);
			await playbackInstance.restart();
		} catch (err) {
			console.error("Error al inicializar WTE Canvas:", err);
		}
	});

	function cleanup() {
		if (animationFrameId !== 0) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = 0;
		}
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
		if (playbackInstance) {
			playbackInstance.stop();
			playbackInstance = null;
		}
	}

	onDestroy(() => {
		cleanup();
	});
</script>

<div class="pre-container w-full h-auto relative">
	<pre bind:this={preElement}>{text}</pre>

	<div
		class="pre__wte flex items-center h-auto absolute"
		bind:this={holderElement}
	>
		<canvas
			class="flex flex-wrap"
			bind:this={canvasElement}
			aria-hidden="true"
		></canvas>
	</div>
</div>

<style>
	.pre-container {
		position: relative;
		display: inline-block;
	}

	pre {
		/*animation: wte-fallback 0s 2s forwards;*/
		visibility: hidden;
	}

	@keyframes wte-fallback {
		to {
			visibility: visible;
		}
	}

	.pre__wte {
		inset: 0;
		overflow: hidden;
	}

	canvas {
		mix-blend-mode: screen;
		transform-origin: 0;
	}
</style>
