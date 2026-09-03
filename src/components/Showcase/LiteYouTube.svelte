<script>
	export let videoId;
	export let title = "Video";
	export let useModal = false;

	let playing = false;
	let modalOpen = false;
	let triggerEl;

	function play() {
		if (useModal) {
			modalOpen = true;
		} else {
			playing = true;
		}
	}

	function closeModal() {
		modalOpen = false;
		triggerEl?.focus(); // devuelve el foco al botón que abrió el modal
	}

	function handleKeydown(event) {
		if (event.key === "Escape") closeModal();
	}
</script>

<svelte:window on:keydown={modalOpen ? handleKeydown : undefined} />

<div class="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
	{#if playing}
		<iframe
			class="absolute inset-0 h-full w-full"
			src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<button
			type="button"
			bind:this={triggerEl}
			on:click={play}
			class="group absolute inset-0 h-full w-full"
			aria-label={`Play video: ${title}`}
		>
			<img
				src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
				alt=""
				class="h-full w-full object-cover"
				loading="lazy"
			/>
			<span
				class="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-fast group-hover:bg-black/10"
			>
				<span
					class="flex size-16 items-center justify-center rounded-full bg-accent/90 text-black shadow-lg transition-transform duration-fast group-hover:scale-105 sm:size-20"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="ml-1 size-7 sm:size-9"
					>
						<path
							d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
						/>
					</svg>
				</span>
			</span>
		</button>
	{/if}
</div>

{#if useModal && modalOpen}
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center bg-background-night/80 backdrop-blur-md p-4"
		role="dialog"
		aria-modal="true"
		aria-label={title}
		on:click={closeModal}
	>
		<div
			class="relative aspect-video w-full"
			on:click={(e) => e.stopPropagation()}
		>
			<div class="flex">
				<button
					type="button"
					on:click={closeModal}
					aria-label="Cerrar modal"
					class="ml-auto group relative flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background-storm/40 text-text-muted transition-all duration-200 hover:border-accent hover:bg-background-storm hover:text-accent hover:shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.3)] focus:outline-none focus:ring-2 focus:ring-accent"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-5 transition-transform duration-200 group-hover:rotate-90"
					>
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</button>
			</div>
			<iframe
				class="h-full w-full rounded-lg"
				src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
				{title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
{/if}
