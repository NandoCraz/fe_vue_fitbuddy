<template>
  <div class="timer-page">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          <span
            class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent"
          >
            Workout Timer
          </span>
        </h1>
        <p class="text-gray-600">
          Kelola waktu workout dengan mudah dan pantau kalori terbakar secara
          real-time
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Settings Panel -->
        <div class="lg:col-span-1">
          <div class="glass rounded-2xl p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i class="fas fa-cog text-bright-blue mr-2"></i>
              Settings
            </h3>

            <!-- Activity Selection -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-running text-lime mr-2"></i>
                Pilih Aktivitas
              </label>

              <!-- Category Filter -->
              <select
                v-model="selectedCategory"
                :disabled="isRunning"
                class="w-full px-4 py-3 mb-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
              >
                <option value="">Semua Kategori</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>

              <!-- Activity Select with Search -->
              <div class="relative">
                <input
                  v-model="activitySearch"
                  :disabled="isRunning"
                  type="text"
                  placeholder="Cari aktivitas..."
                  class="w-full px-4 py-3 mb-2 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                />
                <i
                  class="fas fa-search absolute right-4 top-4 text-gray-400"
                ></i>
              </div>

              <select
                v-model="selectedActivity"
                @change="updateCaloriesPerHour"
                :disabled="isRunning"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none transition-colors"
              >
                <option value="">Pilih Aktivitas</option>
                <option
                  v-for="activity in filteredActivities"
                  :key="activity.key"
                  :value="activity.key"
                >
                  {{ activity.name }} ({{ activity.met_value }} MET)
                </option>
              </select>

              <!-- Selected Activity Info -->
              <div
                v-if="currentActivityInfo"
                class="mt-3 p-3 bg-bright-blue bg-opacity-10 rounded-xl"
              >
                <div class="flex items-start space-x-3">
                  <div
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="getIntensityClass(currentActivityInfo.intensity)"
                  >
                    {{ currentActivityInfo.intensity }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ currentActivityInfo.name }}
                    </p>
                    <p class="text-xs text-gray-600 mt-1">
                      <i class="fas fa-fire text-orange-500 mr-1"></i>
                      {{ caloriesPerHour.toFixed(0) }} kcal/jam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Duration -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-clock text-bright-blue mr-2"></i>
                Durasi (menit)
              </label>
              <input
                v-model.number="duration"
                type="number"
                :disabled="isRunning"
                @change="resetTimer"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                min="1"
                max="180"
              />
            </div>

            <!-- Sets -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-redo text-bright-blue mr-2"></i>
                Jumlah Set
              </label>
              <input
                v-model.number="sets"
                type="number"
                :disabled="isRunning"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                min="1"
                max="10"
              />
            </div>

            <!-- Rest Duration -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-bed text-bright-blue mr-2"></i>
                Istirahat (menit)
              </label>
              <input
                v-model.number="restDuration"
                type="number"
                :disabled="isRunning"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                min="1"
                max="10"
              />
            </div>

            <!-- Weight -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-weight text-bright-blue mr-2"></i>
                Berat Badan (kg)
              </label>
              <input
                v-model.number="weight"
                type="number"
                @change="updateCaloriesPerHour"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bright-blue focus:outline-none"
                min="30"
                max="200"
              />
            </div>
          </div>
        </div>

        <!-- Timer Display -->
        <div class="lg:col-span-2">
          <div class="glass rounded-2xl p-8 mb-6">
            <!-- Set Indicator -->
            <div class="text-center mb-6">
              <span class="text-2xl font-bold">
                <span v-if="isRestMode" class="text-lime">
                  <i class="fas fa-bed mr-2"></i>Istirahat
                </span>
                <span v-else class="text-bright-blue">
                  <i class="fas fa-dumbbell mr-2"></i>Set {{ currentSet }} /
                  {{ sets }}
                </span>
              </span>
            </div>

            <!-- Timer Circle -->
            <div class="relative w-72 h-72 mx-auto mb-6">
              <svg class="w-full h-full transform -rotate-90">
                <circle
                  cx="144"
                  cy="144"
                  r="136"
                  stroke="#e5e7eb"
                  stroke-width="12"
                  fill="none"
                />
                <circle
                  cx="144"
                  cy="144"
                  r="136"
                  :stroke="isRestMode ? '#84cc16' : '#0ea5e9'"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  class="transition-all duration-1000"
                />
              </svg>
              <div
                class="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div class="text-6xl font-bold text-gray-900 mb-2">
                  {{ formattedTime }}
                </div>
                <div class="text-xl text-gray-500">
                  {{ progress.toFixed(0) }}%
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-orange-50 rounded-xl p-4 text-center">
                <i class="fas fa-fire text-3xl text-orange-500 mb-2"></i>
                <div class="text-3xl font-bold text-gray-900">
                  {{ caloriesBurned.toFixed(0) }}
                </div>
                <div class="text-sm text-gray-600 font-medium">
                  Kalori Terbakar
                </div>
              </div>
              <div class="bg-blue-50 rounded-xl p-4 text-center">
                <i class="fas fa-clock text-3xl text-blue-500 mb-2"></i>
                <div class="text-3xl font-bold text-gray-900">
                  {{ formatTime(totalElapsed) }}
                </div>
                <div class="text-sm text-gray-600 font-medium">Total Waktu</div>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex justify-center gap-4">
              <button
                v-if="!isRunning"
                @click="startTimer"
                :disabled="!selectedActivity"
                class="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl hover:shadow-xl transition-all text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fas fa-play"></i>
                {{ isPaused ? "Resume" : "Start" }}
              </button>
              <button
                v-else
                @click="pauseTimer"
                class="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all text-lg font-semibold"
              >
                <i class="fas fa-pause"></i>
                Pause
              </button>
              <button
                @click="resetTimer"
                class="flex items-center gap-2 px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all text-lg font-semibold"
              >
                <i class="fas fa-redo"></i>
                Reset
              </button>
            </div>

            <!-- Warning if no activity selected -->
            <div
              v-if="!selectedActivity"
              class="mt-4 text-center text-sm text-gray-500"
            >
              <i class="fas fa-info-circle mr-1"></i>
              Pilih aktivitas terlebih dahulu
            </div>
          </div>

          <!-- History -->
          <div class="glass rounded-2xl p-6">
            <button
              @click="showHistory = !showHistory"
              class="flex items-center justify-between w-full text-xl font-bold text-gray-900 mb-4"
            >
              <span>
                <i class="fas fa-history text-bright-blue mr-2"></i>
                Riwayat Workout ({{ history.length }})
              </span>
              <i
                :class="
                  showHistory ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                "
                class="text-gray-400"
              ></i>
            </button>

            <div v-if="showHistory" class="space-y-3">
              <p
                v-if="history.length === 0"
                class="text-gray-500 text-center py-8"
              >
                <i class="fas fa-clipboard text-4xl text-gray-300 mb-3"></i>
                <br />
                Belum ada riwayat workout
              </p>
              <div
                v-for="workout in history"
                :key="workout.id"
                class="bg-white bg-opacity-50 rounded-xl p-4 hover:bg-opacity-70 transition-all"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 mb-1">
                      {{ workout.activity }}
                    </div>
                    <div class="text-sm text-gray-600">
                      <i class="fas fa-clock mr-1"></i
                      >{{ workout.duration }} menit × {{ workout.sets }} set
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      <i class="fas fa-calendar mr-1"></i
                      >{{ formatDate(workout.date) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div
                      class="flex items-center gap-1 text-orange-600 font-bold text-xl"
                    >
                      <i class="fas fa-fire"></i>
                      {{ workout.caloriesBurned }}
                    </div>
                    <div class="text-xs text-gray-500">kalori</div>
                  </div>
                </div>
              </div>

              <button
                v-if="history.length > 0"
                @click="clearHistory"
                class="w-full py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
              >
                <i class="fas fa-trash mr-2"></i>Hapus Semua Riwayat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const API_URL = "https://fitbuddy.pythonanywhere.com";

// State
const duration = ref(30);
const sets = ref(3);
const restDuration = ref(2);
const weight = ref(70);
const selectedActivity = ref("");
const selectedCategory = ref("");
const activitySearch = ref("");
const caloriesPerHour = ref(0);

const isRunning = ref(false);
const isPaused = ref(false);
const isRestMode = ref(false);
const currentSet = ref(1);
const timeLeft = ref(duration.value * 60);
const caloriesBurned = ref(0);

const showHistory = ref(false);
const history = ref([]);
const activities = ref([]);

let intervalId = null;

// Computed
const categories = computed(() => {
  const cats = [...new Set(activities.value.map((a) => a.category))];
  return cats.sort();
});

const filteredActivities = computed(() => {
  let filtered = activities.value;

  if (selectedCategory.value) {
    filtered = filtered.filter((a) => a.category === selectedCategory.value);
  }

  if (activitySearch.value) {
    const search = activitySearch.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search)
    );
  }

  return filtered;
});

const currentActivityInfo = computed(() => {
  return activities.value.find((a) => a.key === selectedActivity.value);
});

const circumference = computed(() => 2 * Math.PI * 136);

const progress = computed(() => {
  const total = isRestMode.value
    ? restDuration.value * 60
    : duration.value * 60;
  return ((total - timeLeft.value) / total) * 100;
});

const strokeDashoffset = computed(() => {
  return circumference.value * (1 - progress.value / 100);
});

const formattedTime = computed(() => formatTime(timeLeft.value));

const totalElapsed = computed(() => {
  const workTime = duration.value * 60 - timeLeft.value;
  const restTime = restDuration.value * 60 * (currentSet.value - 1);
  if (isRestMode.value) {
    return workTime + restTime + (restDuration.value * 60 - timeLeft.value);
  }
  return workTime + restTime;
});

// Methods
async function fetchActivities() {
  try {
    const response = await fetch(`${API_URL}/api/activities`);
    const data = await response.json();

    if (data.success) {
      activities.value = data.activities;
    }
  } catch (err) {
    console.error("Failed to fetch activities:", err);
  }
}

const updateCaloriesPerHour = () => {
  if (!currentActivityInfo.value) {
    caloriesPerHour.value = 0;
    return;
  }
  const met = currentActivityInfo.value.met_value;
  caloriesPerHour.value = met * weight.value * 1.05;
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getIntensityClass = (intensity) => {
  const classes = {
    light: "bg-green-100 text-green-700",
    moderate: "bg-blue-100 text-blue-700",
    vigorous: "bg-orange-100 text-orange-700",
    very_vigorous: "bg-red-100 text-red-700",
  };
  return classes[intensity] || "bg-gray-100 text-gray-700";
};

const startTimer = () => {
  if (!selectedActivity.value) {
    alert("Pilih aktivitas terlebih dahulu!");
    return;
  }

  isRunning.value = true;
  isPaused.value = false;

  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;

      if (!isRestMode.value) {
        const caloriesPerSecond = caloriesPerHour.value / 3600;
        caloriesBurned.value += caloriesPerSecond;
      }
    } else {
      handleTimerComplete();
    }
  }, 1000);
};

const pauseTimer = () => {
  isRunning.value = false;
  isPaused.value = true;
  if (intervalId) {
    clearInterval(intervalId);
  }
};

const resetTimer = () => {
  isRunning.value = false;
  isPaused.value = false;
  isRestMode.value = false;
  currentSet.value = 1;
  timeLeft.value = duration.value * 60;
  caloriesBurned.value = 0;

  if (intervalId) {
    clearInterval(intervalId);
  }
};

const handleTimerComplete = () => {
  isRunning.value = false;

  if (intervalId) {
    clearInterval(intervalId);
  }

  if (isRestMode.value) {
    if (currentSet.value < sets.value) {
      currentSet.value++;
      isRestMode.value = false;
      timeLeft.value = duration.value * 60;

      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSAKN"
      );
      audio.play().catch(() => {});

      alert(`Istirahat selesai! Memulai set ${currentSet.value}`);
      startTimer();
    } else {
      saveWorkout();
      alert("🎉 Workout selesai! Kerja bagus!");
    }
  } else {
    if (currentSet.value < sets.value) {
      isRestMode.value = true;
      timeLeft.value = restDuration.value * 60;

      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSAKN"
      );
      audio.play().catch(() => {});

      alert(`Set ${currentSet.value} selesai! Waktunya istirahat.`);
      startTimer();
    } else {
      saveWorkout();
      alert("🎉 Workout selesai! Kerja bagus!");
    }
  }
};

const saveWorkout = () => {
  const workout = {
    id: Date.now(),
    date: new Date().toISOString(),
    activity: currentActivityInfo.value.name,
    duration: duration.value,
    sets: sets.value,
    caloriesBurned: Math.round(caloriesBurned.value),
  };

  history.value = [workout, ...history.value].slice(0, 20);
  localStorage.setItem("workoutTimerHistory", JSON.stringify(history.value));
};

const clearHistory = () => {
  if (confirm("Hapus semua riwayat workout?")) {
    history.value = [];
    localStorage.removeItem("workoutTimerHistory");
  }
};

// Lifecycle
onMounted(() => {
  fetchActivities();

  const saved = localStorage.getItem("workoutTimerHistory");
  if (saved) {
    history.value = JSON.parse(saved);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

watch(duration, () => {
  if (!isRunning.value && !isPaused.value) {
    timeLeft.value = duration.value * 60;
  }
});

watch(selectedActivity, () => {
  updateCaloriesPerHour();
});
</script>

<style scoped>
.timer-page {
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
