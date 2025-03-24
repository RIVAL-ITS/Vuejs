<script setup>
import { onMounted } from "vue";

const requestFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Gagal masuk fullscreen: ${err.message}`);
    });
  }
};

onMounted(() => {
  document.addEventListener("click", requestFullscreen, { once: true });
});
</script>

<template>
  <router-view />
</template>
