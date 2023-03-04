<template>
  <thead class="text-gray-700" :class="[props.w, props.textSize, bgColor]">
    <tr>
      <slot></slot>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  w: {
    type: String,
    default: 'w-full',
  },
  textSize: {
    type: String,
    default: 'text-sm',
  },
  bgColor: {
    type: String,
    default: 'bg-gray-100',
  },
})
</script>
