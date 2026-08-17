<script setup lang="ts">
import AppIcon from './AppIcon.vue'
defineProps<{ count: number }>()
defineEmits<{ print: []; cancel: [] }>()
</script>

<template>
  <div
    class="flex flex-col gap-3 bg-sky-50 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    role="status"
  >
    <span class="font-semibold text-navy-950"
      >{{ count }} {{ count === 1 ? 'item' : 'items' }} selected</span
    >
    <div class="flex items-center gap-2">
      <button
        class="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-sky-700 hover:bg-sky-100"
        @click="$emit('print')"
      >
        <AppIcon name="qr" :size="18" /> Print QR Code</button
      ><span class="text-slate-300">|</span
      ><button
        class="focus-ring rounded-md px-3 py-2 font-semibold text-slate-700 hover:bg-white"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
