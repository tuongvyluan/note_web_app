<template>
  <div class="pt-3 px-4 overflow-auto h-full w-full max-w-full min-w-[315px]">
    <div class="w-full pb-5 text-center flex justify-between gap-x-2">
      <div class="flex gap-x-1 items-center">
        <NuxtLink :to="'/note/1'" class="text-4xl">Note</NuxtLink>
        <div><Icon name="ep:arrow-right-bold" size="20" /></div>
        <div class="text-4xl font-bold">{{ cardName.trim().length > 0 ? cardName : 'Card' }}</div>
      </div>
      <div>
        <MyButton>Setting</MyButton>
      </div>
    </div>
    <input
      v-model="newCardName"
      placeholder="Enter card name"
      type="text"
      class="text-4xl font-bold w-full pb-5 text-center h-16" />
    <QuillEditor content="cardContent" toolbar="full" theme="snow"></QuillEditor>
  </div>
</template>
<script setup>
import debounce from 'lodash.debounce'
const cardName = ref('')
const cardContent = ref('')
const newCardName = ref('')
const newCardContent = ref('')
const debounceWatchName = debounce(newValue => {
  console.log(newValue)
}, 500)
const debounceWatchContent = debounce(newValue => {
  console.log(newValue)
}, 500)
watch(newCardName, newValue => debounceWatchName(newValue))
watch(newCardContent, newValue => debounceWatchContent(newValue))
onMounted(() => {
  newCardName.value = cardName.value
  newCardContent.value = cardContent.value
})
</script>
<style>
.ql-container {
  background-color: rgb(209, 234, 237);
  max-height: calc(100% - 182px);
}
</style>
