<template>
  <div class="p-4 min-w-[22rem]">
    <SectionTitle title="Filters" class="mb-2">
      <template #buttons>
        <div class="flex justify-end gap-3">
          <h6 class="p-0 m-0 cursor-pointer hover:text-blue-600 hover:underline">Reset</h6>
          <h6 class="p-0 m-0 cursor-pointer hover:text-blue-600 hover:underline">Clear</h6>
        </div>
      </template>
    </SectionTitle>
    <!-- start filterList -->
    <ul>
      <li v-for="filter in $props.filterList" :key="filter.value">
        <div class="flex items-center font-bold text-sm py-2 w-full whitespace-nowrap bg-transparent text-gray-700">
          <span>{{ filter.label }}</span>
        </div>
        <!-- start filterList items -->
        <ul class="flex flex-row flex-wrap z-100">
          <li v-for="(item, index) in filter.items" :key="index">
            <div class="flex items-center p-1 rounded">
              <div
                aria-hidden="true"
                :class="
                  filter.default === index
                    ? `filter-checkbox cursor-pointer inline-block px-3 py-1 rounded-3xl whitespace-nowrap w-fit text-center border-[0.1rem]  bg-blue-100 text-blue-700 border-blue-700 drop-shadow-md font-semibold text-xs`
                    : `filter-checkbox cursor-pointer inline-block px-3 py-1 rounded-3xl whitespace-nowrap w-fit text-center border-[0.1rem] text-gray-600 border-gray-600 text-xs`
                ">
                {{ item }}
              </div>
            </div>
          </li>
        </ul>
        <!-- end filterList items -->
      </li>
    </ul>
    <!-- end filterList -->
  </div>
</template>
<script setup>
defineProps({
  filterList: {
    type: Array,
    required: true,
  },
})
</script>
