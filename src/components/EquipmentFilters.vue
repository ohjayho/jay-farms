<script setup lang="ts">
defineProps<{
  search: string
  selectedType: string
  selectedCategory: string
  selectedStatus: string
  types: string[]
  categories: string[]
  statuses: string[]
  allVisibleSelected: boolean
  partiallySelected: boolean
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:selectedType': [value: string]
  'update:selectedCategory': [value: string]
  'update:selectedStatus': [value: string]
  toggleAll: []
}>()
</script>

<template>
  <div
    class="flex flex-col gap-4 border-t border-slate-200 bg-white px-5 py-5 xl:flex-row xl:items-end"
  >
    <label class="relative block min-w-64 flex-1 xl:max-w-80">
      <span class="sr-only">Search equipment</span>
      <span
        class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
        >S</span
      >
      <input
        :value="search"
        type="search"
        placeholder="Search keyword"
        class="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white pr-3 pl-9 text-sm placeholder:text-slate-400"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </label>
    <div class="hidden pb-2 text-sm font-medium text-slate-600 xl:block">Filter by</div>
    <div class="grid flex-[2] grid-cols-1 gap-3 sm:grid-cols-3">
      <label class="block">
        <span class="mb-1 block text-xs font-medium text-slate-500">Type</span>
        <select
          aria-label="Type"
          :value="selectedType"
          class="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
          @change="emit('update:selectedType', ($event.target as HTMLSelectElement).value)"
        >
          <option value="All">All</option>
          <option v-for="value in types" :key="value" :value="value">{{ value }}</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1 block text-xs font-medium text-slate-500">Category</span>
        <select
          aria-label="Category"
          :value="selectedCategory"
          class="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
          @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
        >
          <option value="All">All</option>
          <option v-for="value in categories" :key="value" :value="value">{{ value }}</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1 block text-xs font-medium text-slate-500">Status</span>
        <select
          aria-label="Status"
          :value="selectedStatus"
          class="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
          @change="emit('update:selectedStatus', ($event.target as HTMLSelectElement).value)"
        >
          <option value="All">All</option>
          <option v-for="value in statuses" :key="value" :value="value">{{ value }}</option>
        </select>
      </label>
    </div>
    <label
      class="flex h-11 shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700"
    >
      <input
        type="checkbox"
        aria-label="Select all visible equipment"
        :checked="allVisibleSelected"
        :indeterminate.prop="partiallySelected"
        class="h-5 w-5 rounded border-slate-300 accent-orange-500"
        @change="emit('toggleAll')"
      />
      Select all
    </label>
  </div>
</template>
