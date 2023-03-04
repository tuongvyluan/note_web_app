<template>
  <div class="container flex flex-wrap items-center justify-between mx-auto gap-1">
    <h1 class="text-2xl font-bold mb-2 sm:mb-0">{{ title }}</h1>
    <div
      class="flex justify-start lg:justify-end items-center gap-x-1 sm:gap-x-6 flex-wrap lg:flex-nowrap gap-y-3 mb-0 sm:mb-2">
      <slot name="buttons" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
