<template>
  <div :class="[hDiv]">
    <Button
      v-if="type === constants.buttonTypes.ACTION && !disabled"
      :class="[w, h]"
      gradient="purple-blue"
      class="py-1"
      @click="emit('onClick')">
      <slot />
    </Button>
    <Button
      v-if="type === constants.buttonTypes.OUTLINE && !disabled"
      :class="w"
      gradient="purple-blue"
      outline
      @click="emit('onClick')">
      <slot />
    </Button>
    <Button v-if="type === constants.buttonTypes.ACTION && disabled" gradient="purple-blue" :class="w" disabled>
      <slot />
    </Button>
    <Button
      v-if="type === constants.buttonTypes.OUTLINE && disabled"
      gradient="purple-blue"
      outline
      disabled
      :class="w">
      <slot />
    </Button>
  </div>
</template>
<script setup>
import { Button } from 'flowbite-vue'
import constants from '~~/common/constants'

const emit = defineEmits(['onClick'])

defineProps({
  type: {
    type: String,
    default: 'action',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  w: {
    type: String,
    default: 'w-fit',
  },
  h: {
    type: String,
    default: 'h-[40px]',
  },
  hDiv: {
    type: String,
    default: 'h-fit',
  },
})
</script>
