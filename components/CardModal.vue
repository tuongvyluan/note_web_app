<template>
  <Modal v-if="isShowModal" :size="size" position="bottom-center" @close=";(isShowModal = false), emit('close-modal')">
    <template #header>
      <slot name="header">
        <div class="flex items-center text-lg">Terms of Service</div>
      </slot>
    </template>
    <template #body>
      <slot name="body" />
    </template>
    <template #footer>
      <slot name="footer">
        <div class="flex justify-end gap-3">
          <MyButton type="outline" @on-click="emit('decline-modal')">
            {{ props.declineText }}
          </MyButton>
          <MyButton :disabled="disableAccept" @on-click="emitConfirm()">
            {{ props.acceptText }}
          </MyButton>
        </div>
      </slot>
    </template>
  </Modal>
</template>
<script setup>
import { Modal } from 'flowbite-vue'

const emit = defineEmits(['update:modelValue', 'close-modal', 'confirm-modal', 'decline-modal'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: 'xl',
  },
  declineText: {
    type: String,
    default: 'Cancel',
  },
  acceptText: {
    type: String,
    default: 'Accept',
  },
  disableAccept: {
    type: Boolean,
    default: false,
  },
})

const isShowModal = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function emitConfirm() {
  if (!props.disableAccept) {
    emit('confirm-modal')
  }
}
</script>
