<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 sm:space-x-3">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-bright-blue to-lime rounded-xl flex items-center justify-center"
          >
            <i class="fas fa-dumbbell text-white text-lg sm:text-xl"></i>
          </div>
          <span
            class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
          >
            FitBuddy
          </span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Home
          </router-link>
          <router-link
            to="/calorie-predictor"
            class="text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Hitung Kalori
          </router-link>
          <router-link
            to="/workout-plan"
            class="text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Rencana Latihan
          </router-link>
          <router-link
            to="/timer"
            class="text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Timer
          </router-link>
          <!-- <router-link
            to="/track"
            class="text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Track
          </router-link> -->

          <!-- Jika Belum Login -->
          <div
            v-if="!authStore.isAuthenticated"
            class="flex items-center space-x-3"
          >
            <router-link
              to="/login"
              class="px-5 py-2 text-bright-blue hover:text-lime transition-colors font-semibold"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-6 py-2.5 bg-gradient-to-r from-bright-blue to-lime text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Jika Sudah Login -->
          <div v-else class="relative">
            <button
              @click="toggleDropdown"
              class="flex items-center space-x-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <div
                class="w-9 h-9 bg-gradient-to-br from-bright-blue to-lime rounded-full flex items-center justify-center text-white font-semibold"
              >
                {{ userInitial }}
              </div>
              <span class="text-gray-700 font-medium">{{
                authStore.userName
              }}</span>
              <i
                class="fas fa-chevron-down text-gray-500 text-xs transition-transform"
                :class="{ 'rotate-180': showDropdown }"
              ></i>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showDropdown"
              class="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-900">
                  {{ authStore.userName }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ authStore.userEmail }}
                </p>
              </div>

              <router-link
                to="/profile"
                @click="showDropdown = false"
                class="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <i class="fas fa-user w-5"></i>
                <span class="font-medium">Profile</span>
              </router-link>

              <hr class="my-2 border-gray-100" />

              <button
                @click="handleLogout"
                class="w-full flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
              >
                <i class="fas fa-sign-out-alt w-5"></i>
                <span class="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-gray-700">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="showMobileMenu"
        class="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
      >
        <div class="px-4 py-4 space-y-3">
          <router-link
            to="/"
            @click="showMobileMenu = false"
            class="block py-2 text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Home
          </router-link>
          <router-link
            to="/calorie-predictor"
            @click="showMobileMenu = false"
            class="block py-2 text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Hitung Kalori
          </router-link>
          <router-link
            to="/workout-plan"
            @click="showMobileMenu = false"
            class="block py-2 text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Rencana Latihan
          </router-link>
          <router-link
            to="/timer"
            @click="showMobileMenu = false"
            class="block py-2 text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Timer
          </router-link>
          <!-- <router-link
            to="/track"
            @click="showMobileMenu = false"
            class="block py-2 text-gray-700 hover:text-bright-blue transition-colors font-medium"
          >
            Track
          </router-link> -->

          <!-- Mobile Auth Buttons -->
          <div
            v-if="!authStore.isAuthenticated"
            class="pt-3 border-t border-gray-100 space-y-2"
          >
            <router-link
              to="/login"
              @click="showMobileMenu = false"
              class="block text-center py-2.5 text-bright-blue font-semibold hover:bg-gray-50 rounded-lg transition-colors"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              @click="showMobileMenu = false"
              class="block text-center py-2.5 bg-gradient-to-r from-bright-blue to-lime text-white rounded-lg font-semibold"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile User Menu -->
          <div v-else class="pt-3 border-t border-gray-100 space-y-2">
            <div class="flex items-center space-x-3 px-3 py-2">
              <div
                class="w-10 h-10 bg-gradient-to-br from-bright-blue to-lime rounded-full flex items-center justify-center text-white font-semibold"
              >
                {{ userInitial }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">
                  {{ authStore.userName }}
                </p>
                <p class="text-xs text-gray-500">{{ authStore.userEmail }}</p>
              </div>
            </div>

            <router-link
              to="/profile"
              @click="showMobileMenu = false"
              class="flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <i class="fas fa-user w-5"></i>
              <span class="font-medium">Profile</span>
            </router-link>

            <button
              @click="handleLogout"
              class="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <i class="fas fa-sign-out-alt w-5"></i>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/useAuth";

const router = useRouter();
const authStore = useAuthStore();

const showDropdown = ref(false);
const showMobileMenu = ref(false);

const userInitial = computed(() => {
  const name = authStore.userName;
  return name ? name.charAt(0).toUpperCase() : "U";
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

async function handleLogout() {
  showDropdown.value = false;
  showMobileMenu.value = false;

  const result = await authStore.logout();

  if (result.success) {
    router.push("/");
  }
}

// Close dropdown saat klik di luar
function handleClickOutside(event) {
  const dropdown = event.target.closest(".relative");
  if (!dropdown && showDropdown.value) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  authStore.init();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}
</style>
