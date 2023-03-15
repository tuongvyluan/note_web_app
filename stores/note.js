import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
  state: () => ({
    noteList: [],
    currentNoteId: '',
  }),
  actions: {
    getNoteList() {
      return this.noteList
    },
    setNoteList(newList) {
      this.noteList = newList
    },
    addNote(newNote) {
      this.noteList.push(newNote)
    },
    removeNote(noteId) {
      const index = this.noteList.findIndex(n => n._id === noteId)
      if (index > -1) {
        this.noteList.splice(index, 1)
      }
    },
    setCurrentNoteId(noteId) {
      this.currentNoteId = noteId
    },
  },
})
