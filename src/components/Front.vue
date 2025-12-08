<template>
  <section class="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div data-aos="fade-right" data-aos-duration="1000">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            Pendamping
            <span
              class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
              >Kebugaran Anda</span
            >
          </h1>
          <p class="text-lg sm:text-xl text-gray-600 mb-8">
            Ubah perjalanan fitness kamu dengan rekomendasi personal dari pendamping cerdas,
            perencanaan makanan pintar, dan komunitas yang solid dari para pecinta fitness.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Show different buttons based on auth status -->
            <template v-if="!authStore.isAuthenticated">
              <router-link
                to="/register"
                class="px-8 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
              >
                <i class="fas fa-rocket"></i>
                <span>Get Started Free</span>
              </router-link>
              <router-link
                to="/login"
                class="px-8 py-4 glass-dark text-bright-blue rounded-full font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <i class="fas fa-sign-in-alt"></i>
                <span>Sign In</span>
              </router-link>
            </template>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1000" class="relative">
          <div class="relative mx-auto w-full max-w-sm animate-float">
            <div
              class="absolute inset-0 bg-gradient-to-r from-bright-blue to-lime rounded-3xl blur-3xl opacity-30"
            ></div>
            <div class="relative glass rounded-3xl p-6 shadow-2xl">
              <div
                class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl"
              >
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <p class="text-gray-400 text-sm">Good Morning,</p>
                    <h3 class="text-white text-xl font-bold">
                      {{
                        authStore.isAuthenticated
                          ? authStore.userName
                          : "Guest"
                      }}!
                    </h3>
                  </div>
                  <div
                    v-if="authStore.isAuthenticated"
                    class="w-12 h-12 bg-gradient-to-br from-bright-blue to-lime rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-lime"
                  >
                    {{ userInitial }}
                  </div>
                  <img
                    v-else
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    class="w-12 h-12 rounded-full border-2 border-lime"
                    alt="Profile"
                  />
                </div>
                <div class="glass rounded-xl p-4 mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm">Daily Calories</span>
                    <span class="text-lime font-bold">1,847 / 2,200</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-bright-blue to-lime h-2 rounded-full"
                      style="width: 84%"
                    ></div>
                  </div>
                </div>
                <div class="glass rounded-xl p-4 mb-4">
                  <div class="flex items-center space-x-3 mb-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-bright-blue to-lime rounded-lg flex items-center justify-center"
                    >
                      <i class="fas fa-brain text-white"></i>
                    </div>
                    <div>
                      <p class="text-white font-semibold">AI Recommendation</p>
                      <p class="text-gray-400 text-xs">Personalized for you</p>
                    </div>
                  </div>
                  <p class="text-gray-300 text-sm">
                    Try 30-min HIIT workout today! Perfect for your fitness
                    level.
                  </p>
                </div>
                <div class="glass rounded-xl p-4">
                  <div class="flex items-center space-x-2 mb-2">
                    <i class="fas fa-lightbulb text-yellow-400"></i>
                    <span class="text-white font-semibold text-sm"
                      >Health Fun Fact</span
                    >
                  </div>
                  <p class="text-gray-300 text-xs">
                    Walking 10,000 steps burns approximately 400-500 calories!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute -top-6 -right-6 w-24 h-24 bg-lime rounded-full opacity-20 animate-pulse-slow"
          ></div>
          <div
            class="absolute -bottom-6 -left-6 w-32 h-32 bg-bright-blue rounded-full opacity-20 animate-pulse-slow"
          ></div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="features"
    class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-50"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Fitur
          <span
            class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
            >FitBuddy</span
          >
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Semua yang kamu butuhkan untuk mencapai goal fitness kamu
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Calorie Predictor -->
        <router-link
          to="/calorie-predictor"
          data-aos="fade-up"
          data-aos-delay="100"
          class="glass rounded-2xl p-6 hover:shadow-2xl transition-all group cursor-pointer"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-fire text-white text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Kalkulator Kalori
          </h3>
          <p class="text-gray-600 text-sm">
            Prediksi kebutuhan kalori harian berdasarkan data tubuh dan
            aktivitas kamu
          </p>
        </router-link>

        <!-- Workout Plan -->
        <router-link
          to="/workout-plan"
          data-aos="fade-up"
          data-aos-delay="200"
          class="glass rounded-2xl p-6 hover:shadow-2xl transition-all group cursor-pointer"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-bright-blue to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-clipboard-list text-white text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Rencana Workout</h3>
          <p class="text-gray-600 text-sm">
            Buat workout plan kustom dengan 100+ pilihan aktivitas dan
            rekomendasi AI
          </p>
        </router-link>

        <!-- Workout Timer -->
        <router-link
          to="/timer"
          data-aos="fade-up"
          data-aos-delay="300"
          class="glass rounded-2xl p-6 hover:shadow-2xl transition-all group cursor-pointer"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-stopwatch text-white text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Workout Timer</h3>
          <p class="text-gray-600 text-sm">
            Timer dengan multi-set support, auto rest, dan tracking kalori
            real-time
          </p>
        </router-link>

        <!-- Running Tracker -->
      </div>
    </div>
  </section>

  <!-- Why Choose FitBuddy -->
  <section class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Kenapa Pilih
          <span
            class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
            >FitBuddy?</span
          >
        </h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          class="glass rounded-xl p-6"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-bright-blue bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-database text-bright-blue text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                100+ Aktivitas Olahraga
              </h3>
              <p class="text-gray-600 text-sm">
                Database lengkap dengan MET values untuk tracking kalori akurat
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          class="glass rounded-xl p-6"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-lime bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-brain text-lime text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Rekomendasi Cerdas
              </h3>
              <p class="text-gray-600 text-sm">
                AI memberikan rekomendasi aktivitas paling efisien untuk goal
                kamu
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          class="glass rounded-xl p-6"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-orange-500 bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-chart-line text-orange-500 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Tracking Otomatis
              </h3>
              <p class="text-gray-600 text-sm">
                Kalori, split times, dan semua stats terekam otomatis
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          class="glass rounded-xl p-6"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-mobile-alt text-blue-500 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p class="text-gray-600 text-sm">
                Akses dari HP, tablet, atau komputer dengan tampilan optimal
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          class="glass rounded-xl p-6"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-12 h-12 bg-green-500 bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-shield-alt text-green-500 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Data Aman</h3>
              <p class="text-gray-600 text-sm">
                Authentication dengan Supabase dan data tersimpan aman
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Cara
          <span
            class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
            >Menggunakan</span
          >
        </h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div data-aos="zoom-in" data-aos-delay="100" class="text-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-bright-blue to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
          >
            1
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Hitung Kalori Harian
          </h3>
          <p class="text-gray-600">
            Input data tubuh kamu di Kalkulator Kalori untuk mendapatkan
            kebutuhan kalori maintenance, cutting, atau bulking
          </p>
        </div>

        <div data-aos="zoom-in" data-aos-delay="200" class="text-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
          >
            2
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Buat Workout Plan
          </h3>
          <p class="text-gray-600">
            Pilih aktivitas yang kamu suka dan buat workout plan dengan target
            kalori yang ingin dicapai
          </p>
        </div>

        <div data-aos="zoom-in" data-aos-delay="300" class="text-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-lime to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
          >
            3
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Mulai Workout</h3>
          <p class="text-gray-600">
            Gunakan Workout Timer untuk melacak waktu workout kamu dan pantau kalori yang terbakar secara real-time
          </p>
        </div>
      </div>
    </div>
  </section>

  <section
    class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-bright-blue to-lime"
  >
    <div class="max-w-4xl mx-auto text-center" data-aos="fade-up">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
        Siap Mulai Perjalanan Fitness Kamu?
      </h2>
      <p class="text-lg sm:text-xl text-white text-opacity-90 mb-8">
        Bergabung dengan FitBuddy dan capai goal fitness kamu dengan tools yang
        powerful dan mudah digunakan
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="px-8 py-4 bg-white text-bright-blue rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
        >
          <i class="fas fa-user-plus"></i>
          <span>Daftar Sekarang</span>
        </router-link>
        <router-link
          v-else
          to="/calorie-predictor"
          class="px-8 py-4 bg-white text-bright-blue rounded-full font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
        >
          <i class="fas fa-fire"></i>
          <span>Mulai Hitung Kalori</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/store/useAuth";
import AOS from "aos";
import "aos/dist/aos.css";

const authStore = useAuthStore();

const userInitial = computed(() => {
  const name = authStore.userName;
  return name ? name.charAt(0).toUpperCase() : "U";
});

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes glow-dot {
  0%,
  100% {
    box-shadow: 0 0 20px currentColor;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px currentColor;
    transform: scale(1.5);
  }
}

.glow-dot {
  animation: glow-dot 3s ease-in-out infinite;
}
</style>
