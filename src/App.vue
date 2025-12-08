<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import BlankLayout from "@/layouts/BlankLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { useAuthStore } from "@/store/useAuth";

export default {
  components: {
    BlankLayout,
    AppLayout,
  },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();

    const layoutComponent = computed(() => {
      return route.meta.layout === "blank" ? "BlankLayout" : "AppLayout";
    });

    // Init auth state saat app pertama kali load
    onMounted(async () => {
      await authStore.init();
    });

    return { layoutComponent };
  },
};
</script>
