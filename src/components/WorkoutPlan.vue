<template>
  <div class="workout-page">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          <span class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent">
            Rencana Workout Kustom
          </span>
        </h1>
        <p class="text-gray-600">Buat rencana workout untuk mencapai target kalori kamu</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Form Section -->
        <div class="lg:col-span-2">
          <div class="glass rounded-2xl p-6 sm:p-8">
            <form @submit.prevent="calculateWorkout">
              <!-- User Data -->
              <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">
                  <i class="fas fa-user text-bright-blue mr-2"></i>
                  Data Diri
                </h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Tinggi Badan (cm)
                    </label>
                    <input
                      v-model.number="form.tinggi_badan"
                      type="number"
                      min="100"
                      max="250"
                      required
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Berat Badan (kg)
                    </label>
                    <input
                      v-model.number="form.berat_badan"
                      type="number"
                      min="30"
                      max="200"
                      required
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Umur (tahun)
                    </label>
                    <input
                      v-model.number="form.umur"
                      type="number"
                      min="10"
                      max="100"
                      required
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Jenis Kelamin
                    </label>
                    <select
                      v-model="form.gender"
                      required
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                    >
                      <option value="">Pilih</option>
                      <option value="pria">Pria</option>
                      <option value="wanita">Wanita</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Activity Selection -->
              <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">
                  <i class="fas fa-running text-lime mr-2"></i>
                  Pilih Aktivitas
                </h3>
                
                <!-- Category Filter -->
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori Olahraga
                  </label>
                  <select
                    v-model="selectedCategory"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                  >
                    <option value="">Semua Kategori</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                </div>

                <!-- Activity Select -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Jenis Olahraga
                  </label>
                  <select
                    v-model="form.aktivitas_olahraga"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                  >
                    <option value="">Pilih Olahraga</option>
                    <option 
                      v-for="activity in filteredActivities" 
                      :key="activity.key" 
                      :value="activity.key"
                    >
                      {{ activity.name }} - {{ activity.intensity }} ({{ activity.met_value }} MET)
                    </option>
                  </select>
                </div>

                <!-- Selected Activity Info -->
                <div v-if="selectedActivity" class="mt-4 p-4 bg-bright-blue bg-opacity-10 rounded-xl">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-gray-900">{{ selectedActivity.name }}</p>
                      <p class="text-sm text-gray-600">
                        Intensitas: <span class="font-medium">{{ selectedActivity.intensity }}</span>
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-bright-blue">{{ selectedActivity.calories_per_hour_70kg }}</p>
                      <p class="text-xs text-gray-500">kcal/jam (70kg)</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Target & Limits -->
              <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">
                  <i class="fas fa-bullseye text-orange-500 mr-2"></i>
                  Target & Batasan
                </h3>
                <div class="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Target Kalori/Hari
                    </label>
                    <input
                      v-model.number="form.target_kalori_per_hari"
                      type="number"
                      min="100"
                      max="2000"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Max Hari/Minggu
                    </label>
                    <input
                      v-model.number="form.max_hari_per_minggu"
                      type="number"
                      min="1"
                      max="7"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Max Jam/Sesi
                    </label>
                    <input
                      v-model.number="form.max_jam_per_sesi"
                      type="number"
                      min="0.5"
                      max="5"
                      step="0.5"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                      placeholder="2"
                    />
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
                <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full px-6 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <i class="fas fa-calculator mr-2"></i>
                {{ loading ? 'Menghitung...' : 'Buat Rencana Workout' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Results Section -->
        <div class="lg:col-span-1">
          <div v-if="result" class="glass rounded-2xl p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              <i class="fas fa-clipboard-list text-bright-blue mr-2"></i>
              Rencana Kamu
            </h3>

            <!-- Activity Name -->
            <div class="mb-4 p-4 bg-gradient-to-r from-bright-blue to-lime rounded-xl text-white">
              <p class="text-sm opacity-90 mb-1">Aktivitas</p>
              <p class="text-xl font-bold">{{ result.input.aktivitas }}</p>
            </div>

            <!-- Stats -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-calendar text-bright-blue"></i>
                  <span class="text-sm text-gray-600">Frekuensi</span>
                </div>
                <span class="font-bold text-gray-900">
                  {{ result.workout_plan.rekomendasi_hari_per_minggu }}x/minggu
                </span>
              </div>

              <div class="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-clock text-bright-blue"></i>
                  <span class="text-sm text-gray-600">Durasi</span>
                </div>
                <span class="font-bold text-gray-900">
                  {{ result.workout_plan.durasi_per_sesi.menit }} menit
                </span>
              </div>

              <div class="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-fire text-orange-500"></i>
                  <span class="text-sm text-gray-600">Per Sesi</span>
                </div>
                <span class="font-bold text-orange-600">
                  {{ result.workout_plan.kalori_terbakar.per_sesi }} kcal
                </span>
              </div>

              <div class="flex items-center justify-between p-3 bg-bright-blue bg-opacity-10 rounded-lg border-2 border-bright-blue">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-chart-line text-bright-blue"></i>
                  <span class="text-sm font-semibold text-gray-700">Per Minggu</span>
                </div>
                <span class="font-bold text-bright-blue text-lg">
                  {{ result.workout_plan.kalori_terbakar.per_minggu }} kcal
                </span>
              </div>
            </div>

            <!-- Intensity Badge -->
            <div class="text-center py-3 px-4 bg-lime bg-opacity-20 rounded-lg">
              <p class="text-xs text-gray-600 mb-1">Intensitas</p>
              <p class="text-sm font-bold text-gray-900 uppercase">
                {{ result.workout_plan.intensitas }}
              </p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else-if="loading" class="glass rounded-2xl p-6">
            <div class="text-center">
              <i class="fas fa-spinner fa-spin text-4xl text-bright-blue mb-4"></i>
              <p class="text-gray-600">Menghitung...</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="glass rounded-2xl p-6 text-center">
            <i class="fas fa-clipboard text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Isi form untuk melihat rencana workout</p>
          </div>
        </div>
      </div>

      <!-- Tips Section (after result) -->
      <div v-if="result" class="mt-6 glass rounded-2xl p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
          Tips Workout
        </h3>
        <div class="grid sm:grid-cols-2 gap-3">
          <div 
            v-for="(tip, index) in result.tips" 
            :key="index"
            class="flex items-start space-x-3 p-3 bg-white bg-opacity-50 rounded-lg"
          >
            <div class="text-xl">{{ tip.split(' ')[0] }}</div>
            <p class="text-sm text-gray-700 flex-1">{{ tip.substring(tip.indexOf(' ') + 1) }}</p>
          </div>
        </div>
      </div>

      <!-- Activity Recommendations Section -->
      <div class="mt-6">
        <div class="glass rounded-2xl p-6 sm:p-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900">
                <i class="fas fa-star text-yellow-400 mr-2"></i>
                Rekomendasi Aktivitas Terbaik
              </h3>
              <p class="text-gray-600 text-sm mt-1">
                Aktivitas paling efisien untuk mencapai target kalori kamu
              </p>
            </div>
            <button
              v-if="form.berat_badan && form.target_kalori_per_hari"
              @click="getRecommendations"
              :disabled="loadingRecommendations"
              class="px-6 py-3 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              <i class="fas fa-sync-alt mr-2" :class="{ 'fa-spin': loadingRecommendations }"></i>
              {{ loadingRecommendations ? 'Loading...' : 'Cari Rekomendasi' }}
            </button>
          </div>

          <!-- Recommendations List -->
          <div v-if="recommendations.length > 0" class="space-y-4">
            <div
              v-for="(rec, index) in recommendations"
              :key="index"
              class="relative overflow-hidden rounded-xl border-2 transition-all hover:shadow-xl cursor-pointer"
              :class="index === 0 ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' : 
                      index === 1 ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100' : 
                      index === 2 ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50' : 
                      'border-gray-200 bg-white'"
              @click="selectRecommendation(rec)"
            >
              <!-- Rank Badge -->
              <div 
                class="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                :class="index === 0 ? 'bg-yellow-400' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-400' : 
                        'bg-bright-blue'"
              >
                {{ index + 1 }}
              </div>

              <div class="p-6 pl-20">
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <!-- Activity Info -->
                  <div class="lg:col-span-2">
                    <h4 class="text-lg font-bold text-gray-900 mb-1">
                      {{ rec.activity_name }}
                    </h4>
                    <div class="flex items-center space-x-3 text-sm">
                      <span 
                        class="px-3 py-1 rounded-full font-semibold"
                        :class="getIntensityClass(rec.intensity)"
                      >
                        {{ rec.intensity }}
                      </span>
                      <span class="text-gray-600">
                        <i class="fas fa-bolt text-yellow-500 mr-1"></i>
                        {{ rec.met_value }} MET
                      </span>
                      <span class="text-gray-600">
                        <i class="fas fa-trophy text-bright-blue mr-1"></i>
                        Score: {{ rec.efficiency_score }}
                      </span>
                    </div>
                  </div>

                  <!-- Frequency -->
                  <div class="text-center p-3 bg-white bg-opacity-60 rounded-lg">
                    <div class="text-2xl font-bold text-bright-blue">
                      {{ rec.days_per_week }}x
                    </div>
                    <p class="text-xs text-gray-600 mt-1">per minggu</p>
                  </div>

                  <!-- Duration -->
                  <div class="text-center p-3 bg-white bg-opacity-60 rounded-lg">
                    <div class="text-2xl font-bold text-lime">
                      {{ rec.minutes_with_rest }}
                    </div>
                    <p class="text-xs text-gray-600 mt-1">menit/sesi</p>
                  </div>
                </div>

                <!-- Stats Row -->
                <div class="mt-4 grid grid-cols-3 gap-3">
                  <div class="text-center p-2 bg-white bg-opacity-40 rounded-lg">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ rec.calories_per_session }}
                    </p>
                    <p class="text-xs text-gray-600">kcal/sesi</p>
                  </div>
                  <div class="text-center p-2 bg-white bg-opacity-40 rounded-lg">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ rec.total_calories_per_week }}
                    </p>
                    <p class="text-xs text-gray-600">kcal/minggu</p>
                  </div>
                  <div class="text-center p-2 bg-white bg-opacity-40 rounded-lg">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ rec.calories_per_hour }}
                    </p>
                    <p class="text-xs text-gray-600">kcal/jam</p>
                  </div>
                </div>

                <!-- Click to apply hint -->
                <div class="mt-3 text-center">
                  <p class="text-xs text-gray-500">
                    <i class="fas fa-hand-pointer mr-1"></i>
                    Klik untuk gunakan aktivitas ini
                  </p>
                </div>
              </div>

              <!-- Best Badge -->
              <div v-if="index === 0" class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg">
                  <i class="fas fa-crown mr-1"></i>TERBAIK
                </span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!loadingRecommendations" class="text-center py-12">
            <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-500 mb-4">
              Isi berat badan dan target kalori untuk melihat rekomendasi
            </p>
          </div>

          <!-- Loading State -->
          <div v-else class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-bright-blue mb-4"></i>
            <p class="text-gray-600">Mencari aktivitas terbaik...</p>
          </div>
        </div>
      </div>

      <!-- Info Box - Penjelasan Frekuensi -->
      <div class="mt-6 glass rounded-xl p-6 border-l-4 border-bright-blue">
        <h4 class="font-bold text-gray-900 mb-3 flex items-center">
          <i class="fas fa-info-circle text-bright-blue mr-2"></i>
          Kenapa Frekuensi Bisa Lebih dari Max Hari/Minggu?
        </h4>
        <div class="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Algoritma API</strong> menghitung frekuensi optimal berdasarkan target kalori dan durasi maksimal per sesi.
          </p>
          <p>
            <strong>Contoh:</strong> Jika target kalori sangat tinggi dan durasi per sesi dibatasi (misal 2 jam max), 
            API akan meningkatkan frekuensi hingga 7 hari untuk mencapai target, meskipun kamu set max 5 hari.
          </p>
          <p class="pt-2 border-t border-gray-200">
            <strong>Solusi:</strong> 
            <span class="inline-flex space-x-2 ml-2">
              <span class="px-2 py-1 bg-bright-blue bg-opacity-10 rounded">Turunkan target kalori</span>
              <span>atau</span>
              <span class="px-2 py-1 bg-lime bg-opacity-10 rounded">Pilih aktivitas lebih intensif (MET lebih tinggi)</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const API_URL = 'http://127.0.0.1:5000'

const form = reactive({
  tinggi_badan: '',
  berat_badan: '',
  umur: '',
  gender: '',
  aktivitas_olahraga: '',
  target_kalori_per_hari: 500,
  max_hari_per_minggu: 5,
  max_jam_per_sesi: 2
})

const loading = ref(false)
const error = ref('')
const result = ref(null)
const activities = ref([])
const selectedCategory = ref('')
const recommendations = ref([])
const loadingRecommendations = ref(false)

const categories = computed(() => {
  const cats = [...new Set(activities.value.map(a => a.category))]
  return cats.sort()
})

const filteredActivities = computed(() => {
  if (!selectedCategory.value) return activities.value
  return activities.value.filter(a => a.category === selectedCategory.value)
})

const selectedActivity = computed(() => {
  return activities.value.find(a => a.key === form.aktivitas_olahraga)
})

async function fetchActivities() {
  try {
    const response = await fetch(`${API_URL}/api/activities`)
    const data = await response.json()
    
    if (data.success) {
      activities.value = data.activities
    }
  } catch (err) {
    console.error('Failed to fetch activities:', err)
  }
}

async function calculateWorkout() {
  loading.value = true
  error.value = ''
  result.value = null

  try {
    const response = await fetch(`${API_URL}/api/workout-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Terjadi kesalahan')
    }

    result.value = data
  } catch (err) {
    error.value = err.message || 'Gagal menghubungi server. Pastikan API berjalan di http://127.0.0.1:5000'
  } finally {
    loading.value = false
  }
}

async function getRecommendations() {
  if (!form.berat_badan || !form.target_kalori_per_hari) {
    alert('Isi berat badan dan target kalori terlebih dahulu')
    return
  }

  loadingRecommendations.value = true

  try {
    const response = await fetch(`${API_URL}/api/activity-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        berat_badan: form.berat_badan,
        target_kalori_per_hari: form.target_kalori_per_hari,
        max_hari_per_minggu: form.max_hari_per_minggu,
        max_jam_per_sesi: form.max_jam_per_sesi,
        top_n: 10
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mendapatkan rekomendasi')
    }

    recommendations.value = data.top_recommendations
  } catch (err) {
    alert(err.message || 'Gagal mendapatkan rekomendasi')
  } finally {
    loadingRecommendations.value = false
  }
}

function selectRecommendation(rec) {
  // Auto-fill form dengan rekomendasi yang dipilih
  form.aktivitas_olahraga = rec.activity_key
  
  // Scroll ke form
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // Optional: Auto submit
  if (form.tinggi_badan && form.berat_badan && form.umur && form.gender) {
    setTimeout(() => {
      calculateWorkout()
    }, 500)
  }
}

function getIntensityClass(intensity) {
  const classes = {
    'light': 'bg-green-100 text-green-700',
    'moderate': 'bg-blue-100 text-blue-700',
    'vigorous': 'bg-orange-100 text-orange-700',
    'very_vigorous': 'bg-red-100 text-red-700'
  }
  return classes[intensity] || 'bg-gray-100 text-gray-700'
}

onMounted(() => {
  fetchActivities()
})
</script>

<style scoped>
.workout-page {
  min-height: calc(100vh - 80px);
  padding-top: 100px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}
</style>