<template>
  <div class="w-full flex justify-start gap-x-2 h-screen relative overflow-y-hidden">
    <SectionSideBarSection :key="noteKey" class="rounded-3xl" :is-active="1" @show-create-note="onShowCreateNote" />
    <CardModal
      v-model="showCreateNote"
      accept-text="Save"
      decline-text="Cancel"
      :disable-accept="newNoteName.trim().length === 0"
      @close-modal="showCreateNote = false"
      @decline-modal="showCreateNote = false"
      @confirm-modal="onConfirmCreateNote()">
      <template #header>
        <SectionTitle title="Edit note name"></SectionTitle>
      </template>
      <template #body>
        <div class="flex gap-2 items-center w-full">
          <label>Note name</label>
          <MyInput v-model="newNoteName" w="w-[300px]" type="text" />
        </div>
      </template>
    </CardModal>
    <slot />
  </div>
</template>
<script setup>
import { useStorage } from 'vue3-storage'
import noteService from '~~/services/note.service'
// create note
const storage = useStorage()
const noteKey = ref(new Date().getTime())
const showCreateNote = ref(false)
const newNoteName = ref('')
function onShowCreateNote() {
  newNoteName.value = ''
  showCreateNote.value = true
}
function onConfirmCreateNote() {
  noteService
    .createNote({
      title: newNoteName.value,
      userId: storage.getStorageSync('userId'),
    })
    .then(res => res.json())
    .then(data => {
      noteKey.value = new Date().getTime()
    })
  showCreateNote.value = false
}
</script>
