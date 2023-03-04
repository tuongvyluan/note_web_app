<template>
  <td :class="[props.px, props.py, props.w]">
    <slot></slot>
  </td>
</template>

<script setup>
const props = defineProps({
  px: {
    type: String,
    default: 'px-6',
  },
  py: {
    type: String,
    default: 'py-2',
  },
  w: {
    type: String,
    default: '',
  },
})
</script>
