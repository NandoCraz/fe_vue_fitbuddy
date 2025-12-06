<template>
  <div class="tracker-page">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          <span class="bg-gradient-to-r from-bright-blue to-lime bg-clip-text text-transparent">
            Running Tracker
          </span>
        </h1>
        <p class="text-gray-600">
          Track jarak, kecepatan, dan kalori dengan GPS real-time
        </p>
      </div>

      <!-- GPS Status -->
      <div class="glass rounded-xl p-4 mb-6">
        <div v-if="gpsError" class="flex items-center justify-center gap-2 text-yellow-700">
          <i class="fas fa-exclamation-triangle"></i>
          <span class="font-medium">GPS: {{ gpsError }}</span>
        </div>
        <div v-else-if="currentPosition" class="flex items-center justify-center gap-2 text-green-700">
          <i class="fas fa-satellite-dish animate-pulse"></i>
          <span class="font-medium">GPS Terhubung • {{ route.length }} titik terekam</span>
        </div>
        <div v-else class="flex items-center justify-center gap-2 text-gray-500">
          <i class="fas fa-satellite-dish"></i>
          <span class="font-medium">Menunggu GPS...</span>
        </div>
      </div>

      <!-- Map View -->
      <div class="glass rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900 flex items-center">
            <i class="fas fa-map-marked-alt text-bright-blue mr-2"></i>
            Route Map
          </h3>
          <button
            v-if="route.length > 0"
            @click="centerMap"
            class="px-4 py-2 bg-bright-blue text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all"
          >
            <i class="fas fa-crosshairs mr-2"></i>Center Map
          </button>
        </div>
        
        <!-- Map Container -->
        <div 
          id="map" 
          class="w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200"
          :class="{ 'opacity-50': !currentPosition }"
        ></div>

        <!-- Map Legend -->
        <div v-if="route.length > 0" class="mt-4 flex items-center justify-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-bright-blue rounded-full"></div>
            <span class="text-gray-600">Start</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-1 bg-lime"></div>
            <span class="text-gray-600">Route</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-500 rounded-full"></div>
            <span class="text-gray-600">Current</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span class="text-gray-600">Split</span>
          </div>
        </div>

        <p v-if="!currentPosition" class="text-center text-gray-500 mt-4 text-sm">
          <i class="fas fa-info-circle mr-1"></i>
          Map akan muncul setelah GPS terhubung
        </p>
      </div>

      <!-- Main Display -->
      <div class="glass rounded-2xl p-8 mb-6">
        <!-- Time Display -->
        <div class="text-center mb-8">
          <div class="text-6xl sm:text-7xl font-bold text-gray-900 mb-2">
            {{ formattedTime }}
          </div>
          <div class="text-gray-500 text-lg">Durasi</div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <!-- Distance -->
          <div class="bg-blue-50 rounded-xl p-4 text-center">
            <i class="fas fa-route text-3xl text-blue-500 mb-2"></i>
            <div class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ formatDistance(distance) }}
            </div>
            <div class="text-sm text-gray-600 font-medium">Jarak</div>
          </div>

          <!-- Current Pace -->
          <div class="bg-purple-50 rounded-xl p-4 text-center">
            <i class="fas fa-tachometer-alt text-3xl text-purple-500 mb-2"></i>
            <div class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ formatPace(currentPace) }}
            </div>
            <div class="text-sm text-gray-600 font-medium">Pace Saat Ini</div>
          </div>

          <!-- Average Pace -->
          <div class="bg-indigo-50 rounded-xl p-4 text-center">
            <i class="fas fa-chart-line text-3xl text-indigo-500 mb-2"></i>
            <div class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ formatPace(avgPace) }}
            </div>
            <div class="text-sm text-gray-600 font-medium">Pace Rata-rata</div>
          </div>

          <!-- Calories -->
          <div class="bg-orange-50 rounded-xl p-4 text-center">
            <i class="fas fa-fire text-3xl text-orange-500 mb-2"></i>
            <div class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ caloriesBurned.toFixed(0) }}
            </div>
            <div class="text-sm text-gray-600 font-medium">Kalori</div>
          </div>
        </div>

        <!-- Additional Stats -->
        <div class="grid grid-cols-3 gap-3 mb-6 text-center text-sm">
          <div class="p-3 bg-white bg-opacity-50 rounded-lg">
            <div class="text-gray-600">Kecepatan</div>
            <div class="font-bold text-gray-900 text-lg">
              {{ (currentSpeed * 3.6).toFixed(1) }}
            </div>
            <div class="text-xs text-gray-500">km/jam</div>
          </div>
          <div class="p-3 bg-white bg-opacity-50 rounded-lg">
            <div class="text-gray-600">Kec. Rata-rata</div>
            <div class="font-bold text-gray-900 text-lg">
              {{ (averageSpeed * 3.6).toFixed(1) }}
            </div>
            <div class="text-xs text-gray-500">km/jam</div>
          </div>
          <div class="p-3 bg-white bg-opacity-50 rounded-lg">
            <div class="text-gray-600">Ketinggian</div>
            <div class="font-bold text-gray-900 text-lg">
              {{ altitude.toFixed(0) }}
            </div>
            <div class="text-xs text-gray-500">meter</div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-if="!isRunning && !isPaused"
            @click="startRun"
            class="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-blue to-lime text-white rounded-xl hover:shadow-xl transition-all text-lg font-semibold"
          >
            <i class="fas fa-play"></i>
            Mulai Lari
          </button>

          <button
            v-if="isRunning"
            @click="pauseRun"
            class="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all text-lg font-semibold"
          >
            <i class="fas fa-pause"></i>
            Pause
          </button>

          <button
            v-if="isPaused"
            @click="resumeRun"
            class="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-lg font-semibold"
          >
            <i class="fas fa-play"></i>
            Resume
          </button>

          <button
            v-if="isRunning || isPaused"
            @click="stopRun"
            class="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-lg font-semibold"
          >
            <i class="fas fa-stop"></i>
            Stop & Simpan
          </button>
        </div>
      </div>

      <!-- Split Times -->
      <div v-if="splits.length > 0" class="glass rounded-2xl p-6 mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i class="fas fa-flag-checkered text-purple-600 mr-2"></i>
          Split Times
        </h3>
        <div class="space-y-2">
          <div
            v-for="(split, idx) in splits"
            :key="idx"
            class="flex justify-between items-center bg-white bg-opacity-50 rounded-lg p-4"
          >
            <div class="font-bold text-gray-900 flex items-center">
              <span class="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                {{ split.km }}
              </span>
              KM {{ split.km }}
            </div>
            <div class="flex gap-6 text-sm">
              <div>
                <span class="text-gray-600">Waktu: </span>
                <span class="font-bold text-gray-900">{{ formatTime(split.time) }}</span>
              </div>
              <div>
                <span class="text-gray-600">Pace: </span>
                <span class="font-bold text-gray-900">{{ formatPace(split.pace) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Run History -->
      <div class="glass rounded-2xl p-6">
        <button
          @click="showHistory = !showHistory"
          class="flex items-center justify-between w-full text-xl font-bold text-gray-900 mb-4"
        >
          <span>
            <i class="fas fa-history text-bright-blue mr-2"></i>
            Riwayat Lari ({{ history.length }})
          </span>
          <i :class="showHistory ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400"></i>
        </button>

        <div v-if="showHistory" class="space-y-3">
          <p v-if="history.length === 0" class="text-gray-500 text-center py-8">
            <i class="fas fa-running text-4xl text-gray-300 mb-3"></i>
            <br />
            Belum ada riwayat lari
          </p>
          <div
            v-for="run in history"
            :key="run.id"
            class="bg-white bg-opacity-50 rounded-xl p-4 hover:bg-opacity-70 transition-all"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-lg mb-1">
                  {{ formatDistance(run.distance) }}
                </div>
                <div class="text-sm text-gray-600 space-x-3">
                  <span>
                    <i class="fas fa-clock mr-1"></i>{{ formatTime(run.duration) }}
                  </span>
                  <span>
                    <i class="fas fa-tachometer-alt mr-1"></i>{{ formatPace(run.averagePace) }} /km
                  </span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  <i class="fas fa-calendar mr-1"></i>{{ formatDate(run.date) }}
                </div>
                <div v-if="run.splits && run.splits.length > 0" class="text-xs text-gray-500 mt-1">
                  <i class="fas fa-flag-checkered mr-1"></i>{{ run.splits.length }} split
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center gap-1 text-orange-600 font-bold text-xl mb-2">
                  <i class="fas fa-fire"></i>
                  {{ run.caloriesBurned }}
                </div>
                <button
                  @click="exportRun(run)"
                  class="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                >
                  <i class="fas fa-download"></i>
                  Export
                </button>
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

      <!-- Tips -->
      <div class="glass rounded-xl p-4 mt-6 border-l-4 border-bright-blue">
        <h4 class="font-bold text-gray-900 mb-2 flex items-center">
          <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
          Tips Running
        </h4>
        <ul class="space-y-1 text-sm text-gray-700">
          <li><i class="fas fa-check text-green-600 mr-2"></i>Aktifkan GPS untuk tracking jarak akurat</li>
          <li><i class="fas fa-check text-green-600 mr-2"></i>Simpan HP di armband atau saku yang aman</li>
          <li><i class="fas fa-check text-green-600 mr-2"></i>Pace menunjukkan menit per kilometer (lebih rendah = lebih cepat)</li>
          <li><i class="fas fa-check text-green-600 mr-2"></i>Split time otomatis terekam setiap 1km</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const weight = ref(70)

const isRunning = ref(false)
const isPaused = ref(false)
const elapsedTime = ref(0)
const distance = ref(0)
const currentSpeed = ref(0)
const averageSpeed = ref(0)
const caloriesBurned = ref(0)

const currentPosition = ref(null)
const route = ref([])
const gpsError = ref(null)
const altitude = ref(0)

const splits = ref([])
const lastSplitDistance = ref(0)
const lastSplitTime = ref(0)

const history = ref([])
const showHistory = ref(false)

// Map variables
let map = null
let routePolyline = null
let currentMarker = null
let startMarker = null
const splitMarkers = []

let intervalId = null
let watchId = null
let lastPosition = null

const formattedTime = computed(() => formatTime(elapsedTime.value))

const currentPace = computed(() => {
  if (currentSpeed.value === 0) return 0
  const kmh = currentSpeed.value * 3.6
  return 60 / kmh
})

const avgPace = computed(() => {
  if (averageSpeed.value === 0) return 0
  const kmh = averageSpeed.value * 3.6
  return 60 / kmh
})

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c
}

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatPace = (pace) => {
  if (!pace || pace === Infinity || isNaN(pace)) return '--:--'
  const mins = Math.floor(pace)
  const secs = Math.floor((pace % 1) * 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(2)}km`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Map functions
const initMap = () => {
  if (map) return

  // Initialize map centered on default location
  map = L.map('map').setView([-7.2575, 112.7521], 15) // Surabaya default

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Fix for marker icons
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

const updateMap = (position) => {
  if (!map) {
    initMap()
  }

  const { lat, lng } = position

  // Update route polyline
  if (route.value.length > 1) {
    const latLngs = route.value.map(p => [p.lat, p.lng])
    
    if (routePolyline) {
      routePolyline.setLatLngs(latLngs)
    } else {
      routePolyline = L.polyline(latLngs, {
        color: '#84cc16',
        weight: 4,
        opacity: 0.8
      }).addTo(map)
    }
  }

  // Add start marker (only once)
  if (route.value.length === 1 && !startMarker) {
    startMarker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#0ea5e9',
      color: '#fff',
      weight: 2,
      fillOpacity: 0.9
    }).addTo(map).bindPopup('Start')
  }

  // Update current position marker
  if (currentMarker) {
    currentMarker.setLatLng([lat, lng])
  } else {
    currentMarker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#ef4444',
      color: '#fff',
      weight: 2,
      fillOpacity: 0.9
    }).addTo(map).bindPopup('Current Position')
  }

  // Center map on current position
  if (isRunning.value) {
    map.setView([lat, lng], map.getZoom())
  }
}

const addSplitMarker = (position, km) => {
  if (!map) return

  const marker = L.circleMarker([position.lat, position.lng], {
    radius: 6,
    fillColor: '#a855f7',
    color: '#fff',
    weight: 2,
    fillOpacity: 0.9
  }).addTo(map).bindPopup(`Split ${km}km`)

  splitMarkers.push(marker)
}

const centerMap = () => {
  if (!map || route.value.length === 0) return

  const latLngs = route.value.map(p => [p.lat, p.lng])
  const bounds = L.latLngBounds(latLngs)
  map.fitBounds(bounds, { padding: [50, 50] })
}

const clearMapMarkers = () => {
  if (routePolyline) {
    map.removeLayer(routePolyline)
    routePolyline = null
  }
  if (currentMarker) {
    map.removeLayer(currentMarker)
    currentMarker = null
  }
  if (startMarker) {
    map.removeLayer(startMarker)
    startMarker = null
  }
  splitMarkers.forEach(marker => map.removeLayer(marker))
  splitMarkers.length = 0
}

const startRun = () => {
  isRunning.value = true
  isPaused.value = false

  intervalId = setInterval(() => {
    elapsedTime.value++

    if (elapsedTime.value > 0) {
      averageSpeed.value = distance.value / elapsedTime.value
      const distanceKm = distance.value / 1000
      caloriesBurned.value = distanceKm * weight.value
    }
  }, 1000)

  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude || 0,
          timestamp: position.timestamp
        }

        currentPosition.value = newPos
        altitude.value = newPos.altitude
        gpsError.value = null

        // Initialize map on first position
        if (!map) {
          initMap()
          map.setView([newPos.lat, newPos.lng], 16)
        }

        if (lastPosition && !isPaused.value) {
          const dist = calculateDistance(
            lastPosition.lat,
            lastPosition.lng,
            newPos.lat,
            newPos.lng
          )

          if (dist < 100) {
            distance.value += dist

            const timeDiff = (newPos.timestamp - lastPosition.timestamp) / 1000
            if (timeDiff > 0) {
              currentSpeed.value = dist / timeDiff
            }

            route.value.push(newPos)
            updateMap(newPos)

            const currentKm = Math.floor((distance.value - dist) / 1000)
            const newKm = Math.floor(distance.value / 1000)
            if (newKm > currentKm) {
              recordSplit(newKm)
              addSplitMarker(newPos, newKm)
            }
          }
        } else if (!lastPosition) {
          route.value.push(newPos)
          updateMap(newPos)
        }

        lastPosition = newPos
      },
      (error) => {
        gpsError.value = error.message
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    )
  } else {
    gpsError.value = 'Geolocation tidak didukung'
  }
}

const pauseRun = () => {
  isRunning.value = false
  isPaused.value = true

  if (intervalId) {
    clearInterval(intervalId)
  }
}

const resumeRun = () => {
  isRunning.value = true
  isPaused.value = false

  intervalId = setInterval(() => {
    elapsedTime.value++

    if (elapsedTime.value > 0) {
      averageSpeed.value = distance.value / elapsedTime.value
      const distanceKm = distance.value / 1000
      caloriesBurned.value = distanceKm * weight.value
    }
  }, 1000)
}

const stopRun = () => {
  if (elapsedTime.value === 0) return

  isRunning.value = false

  const run = {
    id: Date.now(),
    date: new Date().toISOString(),
    duration: elapsedTime.value,
    distance: distance.value,
    averagePace: avgPace.value,
    caloriesBurned: Math.round(caloriesBurned.value),
    splits: [...splits.value],
    route: route.value.length > 0 ? [...route.value] : null
  }

  history.value = [run, ...history.value].slice(0, 50)
  localStorage.setItem('runHistory', JSON.stringify(history.value))

  resetRun()
}

const resetRun = () => {
  elapsedTime.value = 0
  distance.value = 0
  currentSpeed.value = 0
  averageSpeed.value = 0
  caloriesBurned.value = 0
  route.value = []
  splits.value = []
  lastSplitDistance.value = 0
  lastSplitTime.value = 0
  currentPosition.value = null
  lastPosition = null
  isPaused.value = false

  clearMapMarkers()

  if (intervalId) {
    clearInterval(intervalId)
  }

  if (watchId) {
    navigator.geolocation.clearWatch(watchId)
  }
}

const recordSplit = (km) => {
  const splitTime = elapsedTime.value - lastSplitTime.value
  const splitDistance = distance.value - lastSplitDistance.value

  const split = {
    km,
    time: splitTime,
    pace: splitTime / (splitDistance / 1000)
  }

  splits.value.push(split)
  lastSplitDistance.value = distance.value
  lastSplitTime.value = elapsedTime.value
}

const exportRun = (run) => {
  const data = JSON.stringify(run, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `run_${new Date(run.date).toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const clearHistory = () => {
  if (confirm('Hapus semua riwayat lari?')) {
    history.value = []
    localStorage.removeItem('runHistory')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('runHistory')
  if (saved) {
    history.value = JSON.parse(saved)
  }

  // Initialize empty map
  setTimeout(() => {
    initMap()
  }, 100)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (watchId) {
    navigator.geolocation.clearWatch(watchId)
  }
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.tracker-page {
  min-height: calc(100vh - 80px);
  padding-top: 100px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>