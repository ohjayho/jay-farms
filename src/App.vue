<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import EquipmentCard from '@/components/EquipmentCard.vue'
import EquipmentFilters from '@/components/EquipmentFilters.vue'
import SelectionToolbar from '@/components/SelectionToolbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { equipment } from '@/data/equipment'

const search = ref('')
const selectedType = ref('All')
const selectedCategory = ref('All')
const selectedStatus = ref('All')
const selectedIds = ref(new Set<number>())
const qrDialogOpen = ref(false)

const valuesFor = (key: 'type' | 'category' | 'status') =>
  [...new Set(equipment.map((item) => item[key]))].sort()

const types = valuesFor('type')
const categories = valuesFor('category')
const statuses = valuesFor('status')

const visibleEquipment = computed(() => {
  const query = search.value.trim().toLocaleLowerCase()
  return equipment.filter(
    (item) =>
      item.name.toLocaleLowerCase().includes(query) &&
      (selectedType.value === 'All' || item.type === selectedType.value) &&
      (selectedCategory.value === 'All' || item.category === selectedCategory.value) &&
      (selectedStatus.value === 'All' || item.status === selectedStatus.value),
  )
})

const selectedCount = computed(() => selectedIds.value.size)
const visibleSelectedCount = computed(
  () => visibleEquipment.value.filter((item) => selectedIds.value.has(item.id)).length,
)
const allVisibleSelected = computed(
  () =>
    visibleEquipment.value.length > 0 &&
    visibleSelectedCount.value === visibleEquipment.value.length,
)
const partiallySelected = computed(
  () =>
    visibleSelectedCount.value > 0 && visibleSelectedCount.value < visibleEquipment.value.length,
)

function toggleEquipment(id: number) {
  const next = new Set(selectedIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  selectedIds.value = next
}

function toggleAllVisible() {
  const next = new Set(selectedIds.value)
  if (allVisibleSelected.value) {
    visibleEquipment.value.forEach((item) => next.delete(item.id))
  } else {
    visibleEquipment.value.forEach((item) => next.add(item.id))
  }
  selectedIds.value = next
}

function clearSelection() {
  selectedIds.value = new Set()
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="flex flex-1">
      <Sidebar />
      <main class="min-w-0 flex-1 p-4 sm:p-7 lg:p-8">
        <div class="mx-auto max-w-400">
          <nav aria-label="Breadcrumb" class="mb-7 text-sm font-medium text-slate-500">
            <span>Inventory</span><span class="mx-3 text-slate-300">/</span
            ><span aria-current="page" class="text-slate-400">Machinery &amp; Equipment</span>
          </nav>
          <h1 class="mb-7 text-3xl font-bold tracking-tight text-navy-950">
            Machinery &amp; Equipment
          </h1>

          <section
            class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            aria-labelledby="inventory-tab"
          >
            <div
              role="tablist"
              aria-label="Inventory views"
              class="flex h-18 items-end gap-2 px-5 sm:px-8"
            >
              <button
                id="inventory-tab"
                role="tab"
                aria-selected="true"
                class="focus-ring h-full border-b-3 border-orange-500 px-2 text-sm font-semibold text-navy-950 sm:px-5 sm:text-base"
              >
                Machinery &amp; Equipment
              </button>
              <button
                role="tab"
                aria-selected="false"
                disabled
                class="h-full px-3 text-sm font-medium text-slate-400 sm:px-5 sm:text-base"
              >
                All Maintenance
              </button>
            </div>
            <EquipmentFilters
              v-model:search="search"
              v-model:selected-type="selectedType"
              v-model:selected-category="selectedCategory"
              v-model:selected-status="selectedStatus"
              :types="types"
              :categories="categories"
              :statuses="statuses"
              :all-visible-selected="allVisibleSelected"
              :partially-selected="partiallySelected"
              @toggle-all="toggleAllVisible"
            />
            <SelectionToolbar
              v-if="selectedCount"
              :count="selectedCount"
              @cancel="clearSelection"
              @print="qrDialogOpen = true"
            />

            <div class="bg-slate-50 p-5 sm:p-7">
              <div class="mb-4 flex items-center justify-between">
                <p class="text-sm text-slate-500">
                  <span class="font-semibold text-slate-700">{{ visibleEquipment.length }}</span>
                  equipment records
                </p>
                <p class="text-xs text-slate-400">Updated against 17 Aug 2026</p>
              </div>
              <div
                v-if="visibleEquipment.length"
                class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >
                <EquipmentCard
                  v-for="item in visibleEquipment"
                  :key="item.id"
                  :item="item"
                  :selected="selectedIds.has(item.id)"
                  @toggle="toggleEquipment"
                />
              </div>
              <div
                v-else
                class="grid min-h-72 place-items-center rounded-lg border border-dashed border-slate-300 bg-white px-6 text-center"
              >
                <div>
                  <div
                    class="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-2xl text-slate-400"
                  >
                    ⌕
                  </div>
                  <h2 class="font-semibold text-navy-950">No equipment found</h2>
                  <p class="mt-1 text-sm text-slate-500">
                    Try a different keyword or adjust your filters.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <div
      v-if="qrDialogOpen"
      class="fixed inset-0 z-50 grid place-items-center bg-navy-950/60 p-4"
      @click.self="qrDialogOpen = false"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-dialog-title"
        class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
      >
        <div
          class="mb-4 grid h-12 w-12 place-items-center rounded-full bg-orange-50 text-2xl text-orange-600"
        >
          ▦
        </div>
        <h2 id="qr-dialog-title" class="text-xl font-bold text-navy-950">
          QR codes prepared for {{ selectedCount }} {{ selectedCount === 1 ? 'item' : 'items' }}
        </h2>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Your selected equipment is ready for the print workflow. No physical print is created in
          this demo.
        </p>
        <button
          autofocus
          class="focus-ring mt-6 w-full rounded-md bg-orange-500 px-4 py-2.5 font-semibold text-white hover:bg-orange-600"
          @click="qrDialogOpen = false"
        >
          Close
        </button>
      </section>
    </div>
  </div>
</template>
