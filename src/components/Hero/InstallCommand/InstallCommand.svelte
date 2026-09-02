<script>
  export let command = 'curl -fsSL https://omarchy.org/install | bash';

  let copied = false;
  let timeoutId;

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      copied = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => (copied = false), 1800);
    } catch (err) {
      console.error('No se pudo copiar el comando:', err);
    }
  }
</script>

<button
  type="button"
  onclick={copyCommand}
  class="group flex w-full items-center justify-between gap-4 rounded-md border border-border bg-background-storm/60 px-4 py-3 text-left transition-colors duration-fast hover:border-accent sm:w-auto"
  aria-live="polite"
>
  <span class="flex items-center gap-2 truncate font-mono text-sm text-text sm:text-base">
    <span class="text-accent select-none">$</span>
    <span class="truncate">{command}</span>
  </span>

  <span class="flex shrink-0 items-center gap-1.5 text-xs text-text-muted group-hover:text-accent">
    {#if copied}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 text-accent">
        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
      </svg>
      Copiado
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
      </svg>
      Copy
    {/if}
  </span>
</button>
