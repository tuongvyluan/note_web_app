<template>
  <div class="pt-3 px-2 overflow-auto h-full w-full max-w-full min-w-[315px]">
    <input v-model="cardName" type="text" class="text-4xl font-bold w-full" />
    <QuillEditor class="pt-2" content="cardContent" theme="snow"></QuillEditor>
  </div>
</template>
<script setup>
import debounce from 'lodash.debounce'
const cardName = ref('')
const cardContent = ref('')
const debounceWatchName = debounce(newValue => {
  console.log(newValue)
}, 500)
const debounceWatchContent = debounce(newValue => {
  console.log(newValue)
}, 500)
watch(cardName, newValue => debounceWatchName(newValue))
watch(cardContent, newValue => debounceWatchContent(newValue))
</script>
