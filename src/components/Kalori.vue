<template>
  <div class="calorie-page">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          <span
            class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
          >
            Kalkulator Kalori Harian
          </span>
        </h1>
        <p class="text-gray-600">
          Hitung kebutuhan kalori harian kamu berdasarkan data tubuh
        </p>
      </div>

      <!-- Form Card -->
      <div class="glass rounded-2xl p-6 sm:p-8 mb-6">
        <form @submit.prevent="predictCalories">
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Tinggi Badan -->
            <div class="form-group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-ruler-vertical text-bright-blue mr-2"></i>
                Tinggi Badan (cm)
              </label>
              <input
                v-model.number="form.tinggi_badan"
                type="number"
                min="100"
                max="250"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
                placeholder="170"
              />
            </div>

            <!-- Berat Badan -->
            <div class="form-group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-weight text-bright-blue mr-2"></i>
                Berat Badan (kg)
              </label>
              <input
                v-model.number="form.berat_badan"
                type="number"
                min="30"
                max="200"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
                placeholder="70"
              />
            </div>

            <!-- Umur -->
            <div class="form-group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-birthday-cake text-bright-blue mr-2"></i>
                Umur (tahun)
              </label>
              <input
                v-model.number="form.umur"
                type="number"
                min="10"
                max="100"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
                placeholder="25"
              />
            </div>

            <!-- Gender -->
            <div class="form-group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-venus-mars text-bright-blue mr-2"></i>
                Jenis Kelamin
              </label>
              <select
                v-model="form.gender"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </select>
            </div>

            <!-- Activity Level -->
            <div class="form-group sm:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-running text-bright-blue mr-2"></i>
                Level Aktivitas
              </label>
              <select
                v-model="form.activity_level"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
              >
                <option value="rendah">Rendah (Jarang olahraga)</option>
                <option value="ringan">Ringan (1-2x seminggu)</option>
                <option value="sedang">Sedang (3-5x seminggu)</option>
                <option value="tinggi">Tinggi (6-7x seminggu)</option>
                <option value="sangat tinggi">Sangat Tinggi (Atlet)</option>
              </select>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-6 px-6 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <i class="fas fa-calculator mr-2"></i>
            {{ loading ? "Menghitung..." : "Hitung Kalori" }}
          </button>
        </form>
      </div>

      <!-- Results -->
      <div v-if="result" class="space-y-6">
        <!-- BMI Card -->
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">
              <i class="fas fa-heartbeat text-red-500 mr-2"></i>
              Status BMI
            </h3>
            <span
              class="px-4 py-2 rounded-full text-sm font-semibold"
              :class="getBMIColorClass(result.data.metrics.bmi)"
            >
              {{ result.data.metrics.bmi_category }}
            </span>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-bright-blue mb-2">
              {{ result.data.metrics.bmi }}
            </div>
            <p class="text-gray-600">
              {{ result.data.metrics.bmi_description }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-[50px]">
            <h3 class="text-xl font-bold text-gray-900">
              <i class="fas fa-fire text-red-500 mr-2"></i>
              Kalori Keluar/Hari
            </h3>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-500 mb-2">
              {{ result.data.hasil.kalori_keluar_per_hari }}
            </div>
          </div>
        </div>

        <!-- Kalori Cards -->
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="glass rounded-xl p-5 text-center">
            <div class="flex items-center justify-center mb-3 space-x-2">
              <i class="fas fa-fire text-orange-500 text-3xl"></i>
              <span class="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full">Maintenance</span>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">
              {{ result.data.hasil.kalori_keluar_per_hari }}
            </div>
            <p class="text-sm text-gray-600 font-medium">Kalori Masuk / Hari</p>
            <p class="text-xs text-gray-500 mt-1">(Untuk mempertahankan berat)</p>
          </div>

          <div class="glass rounded-xl p-5 text-center border-2 border-bright-blue">
            <div class="flex items-center justify-center mb-3 space-x-2">
              <i class="fas fa-cut text-bright-blue text-3xl"></i>
              <span class="text-xs px-2 py-1 bg-blue-50 text-bright-blue rounded-full">Defisit</span>
            </div>
            <div class="text-2xl font-bold text-bright-blue mb-1">
              {{ result.data.hasil.rekomendasi.cutting }}
            </div>
            <p class="text-sm text-gray-600 font-medium">Cutting (Kalori Masuk)</p>
            <p class="text-xs text-gray-500 mt-1">(Untuk menurunkan berat badan)</p>
          </div>

          <div class="glass rounded-xl p-5 text-center border-2 border-lime">
            <div class="flex items-center justify-center mb-3 space-x-2">
              <i class="fas fa-dumbbell text-lime text-3xl"></i>
              <span class="text-xs px-2 py-1 bg-lime-50 text-lime-700 rounded-full">Surplus</span>
            </div>
            <div class="text-2xl font-bold text-lime mb-1">
              {{ result.data.hasil.rekomendasi.bulking }}
            </div>
            <p class="text-sm text-gray-600 font-medium">Bulking (Kalori Masuk)</p>
            <p class="text-xs text-gray-500 mt-1">(Untuk menambah massa/berat)</p>
          </div>
        </div>

        <!-- Tips -->
        <div class="glass rounded-2xl p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
            Tips untuk Kamu
          </h3>
          <div class="space-y-3">
            <div
              v-for="(tip, index) in result.data.tips"
              :key="index"
              class="flex items-start space-x-3 p-3 bg-white bg-opacity-50 rounded-lg"
            >
              <div class="text-2xl">{{ tip.split(" ")[0] }}</div>
              <p class="text-gray-700 flex-1">
                {{ tip.substring(tip.indexOf(" ") + 1) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <router-link
          to="/workout-plan"
          class="block w-full px-6 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl font-semibold text-lg text-center hover:shadow-xl transition-all"
        >
          <i class="fas fa-running mr-2"></i>
          Buat Rencana Workout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const API_URL = "http://127.0.0.1:5000";

const form = reactive({
  tinggi_badan: "",
  berat_badan: "",
  umur: "",
  gender: "",
  activity_level: "sedang",
});

const loading = ref(false);
const error = ref("");
const result = ref(null);

async function predictCalories() {
  loading.value = true;
  error.value = "";
  result.value = null;

  try {
    const response = await fetch(`${API_URL}/api/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Terjadi kesalahan");
    }

    result.value = data;
  } catch (err) {
    error.value =
      err.message ||
      "Gagal menghubungi server. Pastikan API berjalan di http://127.0.0.1:5000";
  } finally {
    loading.value = false;
  }
}

function getBMIColorClass(bmi) {
  if (bmi < 18.5) return "bg-blue-100 text-blue-700";
  if (bmi < 25) return "bg-green-100 text-green-700";
  if (bmi < 30) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}
</script>

<style scoped>
.calorie-page {
  min-height: calc(100vh - 80px);
  padding-top: 100px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}
</style>
