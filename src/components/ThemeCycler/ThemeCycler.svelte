<script>
	import { onMount } from "svelte";
	import { themes } from "./themes.js";

	let index = 0;
	let announceText = "";
	let mounted = false;

	function isTypingTarget(el) {
		if (!el) return false;
		const tag = el.tagName;
		return (
			tag === "INPUT" ||
			tag === "TEXTAREA" ||
			tag === "SELECT" ||
			el.isContentEditable
		);
	}

	function applyTheme(theme) {
    const root = document.documentElement;
		if (typeof document === "undefined") return;
		for (const [key, value] of Object.entries(theme.vars)) {
			root.style.setProperty(`--rgb-${key}`, value);
		}
		if (theme.heroImage) {
			root.style.setProperty(
				"--hero-bg-image",
				`url(${theme.heroImage})`,
			);
		}
		announceText = `Theme: ${theme.label}`;
	}

	function cycle(step = 1) {
		index = (index + step + themes.length) % themes.length;
		applyTheme(themes[index]);
		try {
			window.localStorage.setItem("omarchy-theme-index", String(index));
		} catch (err) {
			// localStorage no disponible (modo privado, etc.) — no bloquea el cycle
		}
	}

	function handleKeydown(event) {
		if (event.key !== "t" && event.key !== "T") return;
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		if (isTypingTarget(event.target)) return;
		cycle(1);
	}

	onMount(() => {
		let startIndex = 0;
		try {
			const saved = window.localStorage.getItem("omarchy-theme-index");
			if (saved !== null)
				startIndex = Math.min(Number(saved) || 0, themes.length - 1);
		} catch (err) {
			// ignore
		}
		index = startIndex;
		applyTheme(themes[index]);
		mounted = true;

		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	});
</script>

{#if mounted}
	<button
		type="button"
		onclick={() => cycle(1)}
		class="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-border bg-background-storm/80 px-3 py-2 text-xs text-text-muted shadow-lg backdrop-blur transition-colors duration-fast hover:border-link hover:text-text"
		aria-label={`Current theme: ${themes[index].label}. Press to cycle to next theme.`}
	>
		<span
			class="size-2.5 rounded-full"
			style={`background-color: rgb(${themes[index].swatch});`}
			aria-hidden="true"
		></span>
		<span>{themes[index].label}</span>
		<kbd
			class="rounded border border-border px-1 font-mono text-[10px] text-text-muted"
			>t</kbd
		>
	</button>

	<span class="sr-only" role="status" aria-live="polite">{announceText}</span>
{/if}
