<template>
  <div>
    <button
      :id="'dropdown-button-' + props.id"
      :data-dropdown-toggle="'dropdown-' + props.id"
      :disabled="props.disableTrigger"
      data-dropdown-placement="bottom"
      class="relative font-medium rounded-lg text-sm pr-4 py-2 min-w-[8rem]"
      :class="[props.w, getClassBaseOnStatusSelected()]"
      type="button">
      {{ getDislayTextBaseOnStatusSelected() }}
      <Icon name="heroicons:chevron-up-down" class="h-5 w-5 absolute top-2 inset-y-0 right-2 flex items-center"></Icon>
    </button>
    <div
      :id="'dropdown-' + props.id"
      class="z-50 hidden text-white border border-gray-200 rounded-lg w-min flex flex-col"
      :class="[props.wMenu]">
      <button
        type="button"
        class="relative gap-x-1 items-center w-full px-10 py-2 text-sm font-medium border-b rounded-t-lg bg-white text-green-700 hover:bg-green-300 hover:text-green-800"
        @click=";(currentStatus = low), closeDropdown()">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon v-if="currentStatus === low" class="h-5 w-5" name="heroicons:check"></Icon>
        </span>
        Low
      </button>
      <button
        type="button"
        class="relative items-center w-full px-10 py-2 text-sm font-medium rounded-b-lg bg-white text-gray-700 hover:bg-gray-300 hover:text-gray-800"
        @click=";(currentStatus = medium), closeDropdown()">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon v-if="currentStatus === medium" class="h-5 w-5" name="heroicons:check"></Icon>
        </span>
        Medium
      </button>
      <button
        v-if="props.containUnsubscribedStatus"
        type="button"
        class="relative items-center w-full px-10 py-2 text-sm font-medium rounded-b-lg bg-white text-gray-700 hover:bg-gray-300 hover:text-gray-800"
        @click="currentStatus = high">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon v-if="currentStatus === high" class="h-5 w-5" name="heroicons:check"></Icon>
        </span>
        High
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initDropdowns, Dropdown } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initDropdowns()
})

const low = 0
const medium = 1
const high = 2

const lowClass =
  'bg-green-200 text-green-700 hover:bg-green-300 hover:text-green-800 focus:ring-4 focus:outline-none focus:ring-green-100'
const mediumClass =
  'bg-yellow-100 text-yellow-300 hover:bg-yellow-300 hover:text-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-100'
const highClass =
  'bg-red-100 text-red-300 hover:bg-red-200 hover:text-red-400 focus:ring-4 focus:outline-none focus:ring-red-100'

const getClassBaseOnStatusSelected = () => {
  if (props.modelValue === low) {
    return mediumClass
  }

  if (props.modelValue === high) {
    return highClass
  }

  if (props.modelValue === low) {
    return lowClass
  }
}

const getDislayTextBaseOnStatusSelected = () => {
  if (props.modelValue === low) {
    return 'Low'
  }
  if (props.modelValue === high) {
    return 'High'
  }
  return 'Medium'
}

const props = defineProps({
  w: {
    type: String,
    default: 'w-full',
  },
  wMenu: {
    type: String,
    default: 'w-[120px]',
  },
  modelValue: {
    type: Number,
    required: true,
  },
  activeVModel: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    required: true,
  },
})

const closeDropdown = () => {
  const dropDownId = document.getElementById('dropdown-' + props.id)
  const dropDownButtonId = document.getElementById('dropdown-button-' + props.id)
  const dropdown = new Dropdown(dropDownId, dropDownButtonId)
  dropdown.hide()
}

const emit = defineEmits(['update:modelValue', 'onChangeStatus'])

const currentStatus = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (props.activeVModel) {
      emit('update:modelValue', parseInt(value))
    }
    emit('onChangeStatus', parseInt(value))
  },
})
</script>
