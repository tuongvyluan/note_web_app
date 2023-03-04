<template>
  <MyButton v-if="isButton" :id="idButton" :data-dropdown-toggle="idMenu" type="action">
    <slot name="button"></slot>
  </MyButton>
  <button
    v-else
    :id="idButton"
    :data-dropdown-toggle="idMenu"
    class="flex justify-between items-center gap-2 text-left focus:shadow-soft-lg text-sm leading-5.6 ease-soft block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 transition-all focus:border-blue-600 focus:outline-none focus:transition-shadow"
    type="button">
    <slot name="button"></slot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      class="h-5 w-5 text-gray-600">
      <path
        fill-rule="evenodd"
        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
        clip-rule="evenodd"></path>
    </svg>
  </button>
  <div :id="idMenu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
    <slot name="menu"></slot>
  </div>
</template>

<script setup>
import { initDropdowns } from 'flowbite'

onMounted(() => {
  initDropdowns()
})

defineProps({
  isButton: {
    type: Boolean,
    default: false,
  },
  idButton: {
    type: String,
    default: 'dropdownDefaultButton',
  },
  idMenu: {
    type: String,
    default: 'dropdown',
  },
})
</script>
