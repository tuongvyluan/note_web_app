<template>
  <Badge v-if="props.type == 'default'" :size="props.size" class="">
    <slot></slot>
  </Badge>
  <Badge v-else :type="props.type" :size="props.size" class="">
    <slot></slot>
  </Badge>
</template>

<script setup>
import { Badge } from 'flowbite-vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'xs',
  },
})
</script>
