<template>
  <div class="relative px-1 h-screen">
    <button
      v-if="activateButton"
      :data-drawer-toggle="props.idDefine"
      :data-drawer-target="props.idDefine"
      data-drawer-backdrop="false"
      data-drawer-edge="false"
      type="button"
      class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-yellow-100 hover:text-gray-900 focus:outline-none"
      @click="openAside">
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>
    <aside
      v-if="isActive"
      :id="props.idDefine"
      class="z-40 md:block hidden py-2 -translate-x-full md:translate-x-0 absolute top-0 w-52 md:relative"
      :class="[props.h]"
      aria-label="Sidebar">
      <button
        type="button"
        :data-drawer-hide="props.idDefine"
        :aria-controls="props.idDefine"
        class="block md:hidden text-gray-400 bg-transparent hover:bg-yellow-100 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
        @click="closeAside()">
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="h-full px-3 py-4 md:py-0 overflow-y-auto bg-gray-50 rounded-2xl">
        <slot></slot>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initDrawers } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initDrawers()
})
const props = defineProps({
  h: {
    type: String,
    default: 'h-full',
  },
  activateButton: {
    type: Boolean,
    default: true,
  },
  idDefine: {
    type: String,
    required: true,
  },
})

const closeAside = () => {
  const asideElement = document.getElementById(props.idDefine)
  if (asideElement != null) {
    asideElement.classList.add('hidden')
  }
}

const openAside = () => {
  const asideElement = document.getElementById(props.idDefine)
  if (asideElement != null) {
    asideElement.classList.remove('hidden')
  }
}

const isActive = ref(true)
</script>
