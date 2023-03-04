<template>
  <th scope="col" :class="[props.px, props.py, props.w, props.minW, props.maxW]" class="whitespace-nowrap">
    <slot></slot>
  </th>
</template>

<script setup>
const props = defineProps({
  px: {
    type: String,
    default: 'px-6',
  },
  py: {
    type: String,
    default: 'py-3',
  },
  w: {
    type: String,
    default: '',
  },
  minW: {
    type: String,
    default: '',
  },
  maxW: {
    type: String,
    default: '',
  },
})
</script>
