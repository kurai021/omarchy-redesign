<script>
  import { onMount } from 'svelte';

  // Recibe la lista de tuits desde el servidor (Astro)
  export let tweets = [];

  let sectionElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          isVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionElement) observer.observe(sectionElement);

    return () => observer.disconnect();
  });
</script>

  <div bind:this={sectionElement} class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
    {#each tweets as tweet, i}
      <div 
        class="flex flex-col justify-between rounded-lg border border-border bg-(--color-win) p-6 transition-all duration-700 ease-out"
        class:opacity-0={!isVisible}
        class:translate-y-6={!isVisible}
        style="transition-delay: {i * 150}ms;"
      >
        <p class="text-sm text-text-strong leading-relaxed mb-6">
          "{tweet.text}"
        </p>

        <div class="flex items-center justify-between pt-4 border-t border-border/40">
          <div class="flex items-center gap-3">
            <img 
              src={tweet.avatar} 
              alt={tweet.authorName} 
              class="w-10 h-10 rounded-full bg-border"
              loading="lazy"
            />
            <div class="flex flex-col text-left">
              <span class="text-sm font-semibold text-text-strong">{tweet.authorName}</span>
              <span class="text-xs text-text-muted">@{tweet.username}</span>
            </div>
          </div>

          <a 
            href={tweet.url} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-xs text-accent hover:underline font-medium"
          >
            View on X
          </a>
        </div>
      </div>
    {/each}
  </div>

