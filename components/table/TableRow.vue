<template>
  <tr class="border-b" :class="[props.w, props.textSize, props.bgColor, props.bgColorHover]">
    <slot></slot>
  </tr>
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
    default: 'bg-white',
  },
  bgColorHover: {
    type: String,
    default: 'hover:bg-gray-50',
  },
})
</script>
