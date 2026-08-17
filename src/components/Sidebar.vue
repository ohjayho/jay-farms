<script setup lang="ts">
defineOptions({ name: 'AppSidebar' })

const inventoryItems = ['Machinery & Equipment', 'Structures', 'Tools', 'Chemicals']
</script>

<template>
  <aside class="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
    <nav aria-label="Primary navigation" class="py-6">
      <div class="mt-1 border-l-3 border-orange-500 bg-slate-100 py-2">
        <div class="flex items-center gap-3 px-6 py-2 text-sm font-semibold text-slate-700">
          <span class="w-5 text-center text-lg text-slate-500">⚙</span>Inventory
        </div>
        <button
          v-for="item in inventoryItems"
          :key="item"
          class="focus-ring block w-full py-2 pr-3 pl-14 text-left text-sm"
          :class="
            item === 'Machinery & Equipment'
              ? 'font-semibold text-orange-600'
              : 'font-medium text-slate-500 hover:text-slate-700'
          "
          :aria-current="item === 'Machinery & Equipment' ? 'page' : undefined"
        >
          {{ item }}
        </button>
      </div>
    </nav>
    <div class="mt-auto border-t border-slate-100 p-7">
      <div class="font-bold text-navy-950">
        <span class="mr-2 text-orange-500">◆</span>JAY FARMS
      </div>
      <div class="mt-1 pl-7 text-xs text-slate-400">Safety System</div>
    </div>
  </aside>
</template>
