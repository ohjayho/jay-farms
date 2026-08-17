<script setup lang="ts">
import AppIcon from './AppIcon.vue'
</script>

<template>
  <header
    class="flex h-18 items-center justify-between bg-navy-950 px-5 text-white shadow-sm sm:px-7"
  >
    <div class="flex items-baseline gap-2">
      <span class="text-lg font-bold tracking-tight sm:text-xl">JAY FARMS</span
      ><span class="hidden text-xs font-semibold text-white/80 sm:inline">Safety System</span>
    </div>
    <div class="flex items-center gap-1.5 sm:gap-3">
      <button
        class="focus-ring hidden rounded-md border border-white/70 px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:block"
      >
        <span class="mr-1">⊕</span> Add Task
      </button>
      <button class="focus-ring rounded-full p-2 hover:bg-white/10" aria-label="Notifications">
        <AppIcon name="bell" />
      </button>
      <button
        class="focus-ring hidden rounded-full p-2 hover:bg-white/10 sm:block"
        aria-label="Information"
      >
        <AppIcon name="info" />
      </button>
      <button
        class="focus-ring hidden rounded-full p-2 hover:bg-white/10 sm:block"
        aria-label="Settings"
      >
        <AppIcon name="settings" />
      </button>
      <div class="ml-1 hidden h-8 w-px bg-white/20 sm:block"></div>
      <div class="ml-1 flex items-center gap-2">
        <span class="hidden text-sm font-semibold md:inline">Jay Ho Oh</span
        ><span
          class="grid h-9 w-9 place-items-center rounded-full border-2 border-white/70 bg-orange-500 text-sm font-bold"
          >JH</span
        >
      </div>
    </div>
  </header>
</template>
