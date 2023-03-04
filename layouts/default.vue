<template>
  <div class="w-full flex justify-start gap-x-2 h-screen relative overflow-y-hidden">
    <SectionSideBarSection class="rounded-3xl" :is-active="1" />
    <slot />
  </div>
</template>
