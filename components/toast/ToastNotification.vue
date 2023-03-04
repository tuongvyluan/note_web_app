<template>
  <Toast class="rounded-md shadow-md" :type="props.type" :closable="props.closable">
    <slot></slot>
  </Toast>
</template>

<script setup>
import { Toast } from 'flowbite-vue'

const props = defineProps({
  type: {
    type: String,
    default: 'Empty',
  },
  closable: {
    type: Boolean,
    default: true,
  },
})
</script>
