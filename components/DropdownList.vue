<template>
  <div class="relative">
    <button :id="idButton" :data-dropdown-toggle="idMenu" type="button" class="w-full">
      <slot name="button"></slot>
    </button>
    <div :id="idMenu" class="z-10 hidden bg-white divide-y divide-gray-100 w-full pl-3">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script setup>
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

defineProps({
  idButton: {
    type: String,
    default: 'dropdownListDefaultButton',
  },
  idMenu: {
    type: String,
    default: 'dropdownList',
  },
})
</script>
