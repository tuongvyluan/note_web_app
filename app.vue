<template>
  <div class="notion">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  margin: 0;
  box-sizing: border-box;
}
.notion-page-cover {
  max-width: 1000px;
  box-sizing: border-box;
  border-radius: 25px;
}
.notion-link {
  cursor: pointer;
}
.notion > * {
  padding: 0;
}
</style>
