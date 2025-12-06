<template>
  <div
    class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl p-8 space-y-6">
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="flex justify-center">
            <div
              class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold"
            >
              L
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Selamat Datang</h1>
          <p class="text-gray-600 text-sm">Silakan masuk ke akun Anda</p>
        </div>

        <!-- Error Alert -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {{ error }}
        </div>

        <!-- Success Alert -->
        <div
          v-if="success"
          class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
        >
          {{ success }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="nama@email.com"
              required
              :disabled="authStore.loading"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Masukkan password"
              required
              :disabled="authStore.loading"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>

          <!-- Remember Me -->

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ authStore.loading ? "Memproses..." : "Masuk" }}</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="text-center space-y-3 pt-4 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <router-link
              to="/register"
              class="text-indigo-600 hover:text-indigo-700 font-medium"
              >Daftar di sini</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "./store/useAuth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");

async function handleLogin() {
  error.value = "";

  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push("/");
  } else {
    error.value = result.error;
  }
}
</script>
