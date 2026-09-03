<script>
  import InstallCommand from "./InstallCommand.svelte";

  // TODO: si el ISO se versiona automáticamente en el build real, reemplazar
  // este string fijo por el dato que venga del pipeline de releases en vez
  // de hardcodear "4.0.2" acá.
  export let isoVersion = "4.0.2";
  export let isoUrl = `https://iso.omarchy.org/omarchy-${isoVersion}.iso`;
  export let command = "curl -fsSL https://omarchy.org/install | bash";
</script>

<div class="flex w-full flex-col items-center gap-3">
  <a
    href={isoUrl}
    class="group flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background-night transition-colors duration-fast hover:bg-accent-hover sm:w-auto sm:min-w-[420px] sm:text-base"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 shrink-0">
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
    Download ISO ({isoVersion})
  </a>

  <div class="flex items-center gap-3 text-xs text-text-muted">
    <span class="h-px w-8 bg-border"></span>
    <span>or, if you're already on Arch</span>
    <span class="h-px w-8 bg-border"></span>
  </div>

  <div class="sm:min-w-[420px]">
    <InstallCommand {command} />
  </div>
  <p class="text-xs text-text-muted">
    The curl script assumes an existing Arch install — Arch only. The ISO boots and installs on any machine.
  </p>
</div>
