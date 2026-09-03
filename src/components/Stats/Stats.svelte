<script>
  import { onMount } from 'svelte';

  // Props recibidas desde Astro (Server-Side)
  export let stars = 34300;
  export let forks = 3500;
  export let commits = 6222;
  export let plugins = 1900;

  let sectionElement;
  let isVisible = false;

  // Valores reactivos animables
  let currentStars = 0;
  let currentForks = 0;
  let currentCommits = 0;
  let currentMoney = 0; // Para los $12.6M
  let currentPlugins = 0;

  const TARGET_MONEY = 12.6; // En millones

  function formatCompact(n) {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(Math.floor(n));
  }

  function animateValues(duration = 2000) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de suavizado (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      currentStars = stars * easeProgress;
      currentForks = forks * easeProgress;
      currentCommits = commits * easeProgress;
      currentMoney = TARGET_MONEY * easeProgress;
      currentPlugins = plugins * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          isVisible = true;
          animateValues(2200); // Duración de la animación en ms
          observer.disconnect(); // Se ejecuta una sola vez
        }
      },
      { threshold: 0.2 } // Se activa cuando el 20% del elemento es visible
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionElement} class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
  <div class="mx-auto text-center">
    <h2 class="text-xl font-semibold text-text-strong sm:text-5xl">
      Real numbers, not adjectives
    </h2>
    <p class="mt-3 text-text-muted">
      Pulled straight from the repo and the Foundation's own numbers.
    </p>
  </div>

  <div class="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-5">
    <div class="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-storm/40 py-6 text-center">
      <span class="font-display text-3xl font-bold text-accent sm:text-4xl">
        ${currentMoney.toFixed(1)}M
      </span>
      <span class="text-xs text-text-muted sm:text-sm">Raised for the Foundation</span>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-storm/40 py-6 text-center">
      <span class="font-display text-3xl font-bold text-accent sm:text-4xl">
        {formatCompact(currentStars)}
      </span>
      <span class="text-xs text-text-muted sm:text-sm">GitHub stars</span>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-storm/40 py-6 text-center">
      <span class="font-display text-3xl font-bold text-accent sm:text-4xl">
        {formatCompact(currentForks)}
      </span>
      <span class="text-xs text-text-muted sm:text-sm">Forks</span>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-storm/40 py-6 text-center">
      <span class="font-display text-3xl font-bold text-accent sm:text-4xl">
        {formatCompact(currentCommits)}
      </span>
      <span class="text-xs text-text-muted sm:text-sm">Commits on Quattro</span>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border border-border bg-background-storm/40 py-6 text-center">
      <span class="font-display text-3xl font-bold text-accent sm:text-4xl">
        {formatCompact(currentPlugins)}
      </span>
      <span class="text-xs text-text-muted sm:text-sm">Plugins on Marketplace</span>
    </div>

  </div>
</section>
