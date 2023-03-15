<script setup>
import { useNoteStore } from '~~/stores/note'

const noteStore = useNoteStore()
const router = useRouter()

onMounted(() => {
  const notes = noteStore.getNoteList()
  if (notes.at(0)) {
    router.push(notes.at(0).to)
    noteStore.setCurrentNoteId(notes.at(0).id)
  } else {
    router.push('/todo')
  }
})
</script>
