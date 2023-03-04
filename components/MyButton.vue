<template>
  <div>
    <Button v-if="type === constants.buttonTypes.ACTION && !disabled" gradient="purple-blue">
      <slot />
    </Button>
    <Button v-if="type === constants.buttonTypes.OUTLINE && !disabled" gradient="purple-blue" outline><slot /> </Button>
    <Button v-if="type === constants.buttonTypes.ACTION && disabled" gradient="purple-blue" disabled>
      <slot />
    </Button>
    <Button v-if="type === constants.buttonTypes.OUTLINE && disabled" gradient="purple-blue" outline disabled>
      <slot />
    </Button>
  </div>
</template>
<script setup>
import { Button } from 'flowbite-vue'
import constants from '~~/common/constants'

defineProps({
  type: {
    type: String,
    default: 'action',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
