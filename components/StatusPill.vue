<template>
  <span :class="`w-fit px-3 py-1 text-xs font-medium text-center ${color} rounded-lg`">
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'info',
  },
})
const color = computed(() => {
  switch (props.color) {
    case 'info':
      return 'bg-blue-700 text-white'
    case 'p0':
      return 'bg-red-600 text-white'
    case 'p1':
      return 'bg-amber-400 text-white'
    case 'p2':
      return 'bg-lime-400 text-white'
    case 'p3':
      return 'bg-green-500 text-white'
    default:
      return 'bg-white text-black'
  }
})
</script>
