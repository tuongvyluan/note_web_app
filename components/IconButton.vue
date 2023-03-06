<template>
  <div class="flex items-center p-4 cursor-pointer hover:scale-110">
    <slot name="pre-text"></slot>
    <div class="mr-2">
      <slot name="icon"></slot>
    </div>
    <slot name="post-text"></slot>
  </div>
</template>
<script setup></script>
