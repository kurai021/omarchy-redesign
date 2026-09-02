<script>
  export let href = "https://omarchy.org/news/2026/08/omacom-foundation-launches-with-8-million";
  export let text = "Omacom Foundation launches with $12.6 million";

  const storageKey = `omarchy-announcement-dismissed:${href}`;

  let visible = true;

  if (typeof window !== "undefined") {
    visible = window.localStorage.getItem(storageKey) !== "1";
  }

  function dismiss() {
    visible = false;
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch (err) {
      // localStorage no disponible (modo privado, etc.) — no bloquea el dismiss visual
    }
  }
</script>

{#if visible}
  <div
    class="flex items-center justify-center gap-3 border-b border-border bg-background-storm/80 px-4 py-2 text-xs text-text-muted sm:text-sm"
  >
    <a
      href={href}
      class="group flex items-center gap-1.5 truncate text-text transition-colors duration-fast hover:text-highlight"
    >
      <span class="truncate">{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="size-3.5 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5"
      >
        <path
          fill-rule="evenodd"
          d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </a>

    <button
      type="button"
      onclick={dismiss}
      aria-label="Cerrar aviso"
      class="shrink-0 text-text-muted transition-colors duration-fast hover:text-text"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </div>
{/if}
