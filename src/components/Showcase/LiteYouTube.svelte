<script>
  export let videoId;
  export let title = "Video";

  let playing = false;

  function play() {
    playing = true;
  }
</script>

<div class="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
  {#if playing}
    <iframe
      class="absolute inset-0 h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  {:else}
    <button
      type="button"
      onclick={play}
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="ml-1 size-7 sm:size-9">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </span>
      </span>
    </button>
  {/if}
</div>
