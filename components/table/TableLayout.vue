<template>
  <table class="text-left table-auto text-gray-700 w-full max-w-full" :class="[props.w]">
    <slot name="table-header"></slot>
    <tbody>
      <slot name="table-body"></slot>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  w: {
    type: String,
    default: 'w-full',
  },
})
</script>
