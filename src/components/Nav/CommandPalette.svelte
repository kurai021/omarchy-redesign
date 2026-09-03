<script>
	import { onMount } from "svelte";

	// Cada entrada es o bien un link (href) o una acción en la propia página
	// (scroll a un id). No usamos router: todo vive en index.astro.
	const commands = [
		{ label: "Home", hint: "Top of page", href: "#top" },
		{ label: "Why Omarchy", hint: "Section", targetId: "why-omarchy" },
		{
			label: "See Quattro in action",
			hint: "Showcase video",
			targetId: "showcase",
		},
		{
			label: "Creator Spotlight",
			hint: "Section",
			targetId: "creator-spotlight",
		},
		{ label: "Community", hint: "Tweets / reviews", targetId: "community" },
		{
			label: "Resources",
			hint: "Manual, GitHub, Discord…",
			targetId: "resources",
		},
		{
			label: "Read the Manual",
			hint: "omarchy.org/manual",
			href: "https://omarchy.org/manual",
		},
		{
			label: "Download ISO",
			hint: "iso.omarchy.org",
			href: "https://iso.omarchy.org/omarchy-4.0.2.iso",
		},
		{
			label: "View on GitHub",
			hint: "github.com/omacom/omarchy",
			href: "https://github.com/omacom/omarchy",
			external: true,
		},
		{
			label: "Join Discord",
			hint: "Community",
			href: "https://discord.gg/tXFUdasqhY",
			external: true,
		},
	];

	let open = false;
	let query = "";
	let activeIndex = 0;
	let inputEl;

	$: filtered =
		query.trim() === ""
			? commands
			: commands.filter((c) =>
					`${c.label} ${c.hint ?? ""}`
						.toLowerCase()
						.includes(query.trim().toLowerCase()),
				);

	$: if (activeIndex >= filtered.length)
		activeIndex = Math.max(0, filtered.length - 1);

	function openPalette() {
		open = true;
		query = "";
		activeIndex = 0;
		queueMicrotask(() => inputEl?.focus());
	}

	function closePalette() {
		open = false;
	}

	function run(command) {
		if (!command) return;
		if (command.targetId) {
			document
				.getElementById(command.targetId)
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		} else if (command.href) {
			if (command.external) {
				window.open(command.href, "_blank", "noopener,noreferrer");
			} else {
				window.location.href = command.href;
			}
		}
		closePalette();
	}

	function handleGlobalKeydown(event) {
		const isMeta = event.metaKey || event.ctrlKey;
		if (isMeta && event.key.toLowerCase() === "k") {
			event.preventDefault();
			open ? closePalette() : openPalette();
			return;
		}
		if (open && event.key === "Escape") {
			closePalette();
		}
	}

	function handleInputKeydown(event) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			activeIndex = Math.max(activeIndex - 1, 0);
		} else if (event.key === "Enter") {
			event.preventDefault();
			run(filtered[activeIndex]);
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleGlobalKeydown);
		return () => window.removeEventListener("keydown", handleGlobalKeydown);
	});
</script>

<button
	type="button"
	onclick={openPalette}
	class="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-border bg-background-storm/80 px-3 py-2 text-xs text-text-muted shadow-lg backdrop-blur transition-colors duration-fast hover:border-link hover:text-text"
	aria-label="Open command palette"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		class="size-4"
	>
		<path
			fill-rule="evenodd"
			d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
			clip-rule="evenodd"
		/>
	</svg>
	<span>Search</span>
	<kbd
		class="rounded border border-border px-1 font-mono text-[10px] text-text-muted"
		>Ctrl K</kbd
	>
</button>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh]"
		onclick={closePalette}
	>
		<div
			class="overflow-hidden rounded-lg border border-border bg-win shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			onclick={(e) => e.stopPropagation()}
		>
			<div
				class="flex items-center gap-2 border-b border-border px-4 py-3"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="size-4 shrink-0 text-text-muted"
				>
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleInputKeydown}
					type="text"
					placeholder="Where do you want to go?"
					class="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
				/>
				<kbd
					class="shrink-0 rounded border border-border px-1 font-mono text-[10px] text-text-muted"
					>Esc</kbd
				>
			</div>

			<ul class="max-h-80 overflow-y-auto py-2">
				{#each filtered as command, i}
					<li>
						<button
							type="button"
							onclick={() => run(command)}
							onmouseenter={() => (activeIndex = i)}
							class="flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition-colors duration-fast"
							class:bg-background-storm={i === activeIndex}
							class:text-text-strong={i === activeIndex}
							class:text-text={i !== activeIndex}
						>
							<span>{command.label}</span>
							{#if command.hint}
								<span class="shrink-0 text-xs text-text-muted"
									>{command.hint}</span
								>
							{/if}
						</button>
					</li>
				{:else}
					<li class="px-4 py-6 text-center text-sm text-text-muted">
						No results.
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
