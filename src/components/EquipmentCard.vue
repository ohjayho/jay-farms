<script setup lang="ts">
import type { Equipment } from '@/data/equipment'
import { formatMaintenanceDate, isMaintenanceOverdue } from '@/data/equipment'
import AppIcon from './AppIcon.vue'
defineProps<{ item: Equipment; selected: boolean }>()
const emit = defineEmits<{ toggle: [id: number] }>()
const palette: Record<string, string> = {
  Tractor: 'from-emerald-900 via-emerald-700 to-lime-500',
  Harvester: 'from-amber-800 via-orange-600 to-yellow-400',
  Aerial: 'from-sky-700 via-cyan-500 to-sky-200',
  Utility: 'from-slate-700 via-slate-500 to-slate-300',
  Sprayer: 'from-blue-800 via-blue-500 to-cyan-200',
  Earthmoving: 'from-yellow-700 via-amber-500 to-yellow-300',
}
</script>

<template>
  <article
    class="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    :class="selected ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200'"
    :aria-label="item.name"
  >
    <div
      class="relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br"
      :class="palette[item.category] ?? 'from-slate-500 to-slate-200'"
    >
      <div
        class="absolute inset-0 opacity-15"
        style="
          background-image:
            radial-gradient(circle at 20% 30%, white 0 2px, transparent 3px),
            linear-gradient(165deg, transparent 60%, white 61% 62%, transparent 63%);
        "
      ></div>
      <span
        class="relative text-7xl drop-shadow-lg"
        role="img"
        :aria-label="`${item.category} illustration`"
        >{{ item.image ?? '⚙️' }}</span
      >
      <label
        class="absolute top-3 left-3 grid h-7 w-7 cursor-pointer place-items-center rounded-md bg-white shadow"
        ><span class="sr-only">Select {{ item.name }}</span
        ><input
          type="checkbox"
          :checked="selected"
          :aria-label="`Select ${item.name}`"
          class="h-5 w-5 accent-orange-500"
          @change="emit('toggle', item.id)"
      /></label>
      <span
        v-if="isMaintenanceOverdue(item.nextMaintenance)"
        class="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-sm font-black text-white shadow"
        aria-hidden="true"
        >!</span
      >
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-bold text-navy-950">{{ item.name }}</h3>
        <button
          class="focus-ring -mr-1 shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100"
          :aria-label="`More options for ${item.name}`"
        >
          <AppIcon name="menu" />
        </button>
      </div>
      <p
        v-if="isMaintenanceOverdue(item.nextMaintenance)"
        class="mt-3 text-sm font-semibold text-orange-600"
      >
        Maintenance overdue: {{ formatMaintenanceDate(item.nextMaintenance!) }}
      </p>
      <p v-else class="mt-3 text-sm text-slate-600">
        <span class="font-semibold">Next maintenance:</span>
        {{ item.nextMaintenance ? formatMaintenanceDate(item.nextMaintenance) : 'Not specified' }}
      </p>
      <p v-if="item.odometer !== undefined" class="mt-1 text-xs text-slate-500">
        <span class="font-semibold">Odometer:</span>
        {{ item.odometer.toLocaleString('en-AU') }} hours
      </p>
      <span
        class="mt-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold"
        :class="
          item.status === 'Operational'
            ? 'bg-emerald-50 text-emerald-700'
            : item.status === 'Maintenance due'
              ? 'bg-orange-50 text-orange-700'
              : 'bg-slate-100 text-slate-600'
        "
        >{{ item.status }}</span
      >
    </div>
  </article>
</template>
