<script setup>
const props = defineProps(['modelValue', 'width', 'height'])
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function calculateDenseMode() {
  if (++value.value > 2) {
    value.value = 0
  }
}

const classArray = ref([
  'bg-[#ccc]',
  'bg-gradient-to-tl from-purple-400 to-blue-300',
  'bg-gradient-to-tl from-purple-600 to-blue-500',
])
</script>
<template>
  <div class="flex items-center">
    <div class="cursor-pointer rounded-xl switch-toggle h-5 switch-3 switch-candy" :class="classArray[value]">
      <input v-model.number="value" class="cursor-pointer" :value="0" type="radio" />
      <label for="0" class="cursor-pointer" @click="value = 0"></label>

      <input v-model.number="value" class="cursor-pointer" :value="1" type="radio" />
      <label for="1" class="cursor-pointer" @click="value = 1"></label>

      <input v-model.number="value" class="cursor-pointer" :value="2" type="radio" />
      <label for="2" class="cursor-pointer" @click="value = 2"></label>
    </div>
    <div
      class="ml-2 mb-[0.05rem] whitespace-nowrap inline-block py-3 font-semibold text-center uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-md ease-soft-in tracking-tight-soft hover:scale-102"
      @click="calculateDenseMode()">
      Toolbar
    </div>
  </div>
</template>
<style scoped>
.switch-toggle {
  float: left;
}
.switch-toggle input {
  position: absolute;
  opacity: 0;
}
.switch-toggle input + label {
  padding: 7px;
  float: left;
  color: #fff;
  width: 1.25rem;
}
.switch-toggle input:checked + label {
  background-color: rgb(240, 238, 238);
  border-radius: 3rem;
  height: 1.24rem;
}
</style>
