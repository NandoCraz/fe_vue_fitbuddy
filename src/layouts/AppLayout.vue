<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/partials/Navbar.vue";
import Footer from "@/components/partials/Footer.vue";
</script>
<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
