<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-card mt-[50px]">
        <div class="profile-header">
          <div class="avatar-large">
            {{ userInitial }}
          </div>
          <h2>{{ authStore.userName }}</h2>
          <p class="email">{{ authStore.userEmail }}</p>
        </div>

        <div class="profile-content">
          <div v-if="!isEditing" class="profile-info">
            <div class="info-group">
              <label>Nama Lengkap</label>
              <p>{{ authStore.profile?.full_name || "-" }}</p>
            </div>

            <div class="info-group">
              <label>Email</label>
              <p>{{ authStore.userEmail }}</p>
            </div>

            <div class="info-group">
              <label>Member Sejak</label>
              <p>{{ memberSince }}</p>
            </div>

            <button @click="isEditing = true" class="btn-edit">
              Edit Profile
            </button>
          </div>

          <div v-else class="profile-edit">
            <form @submit.prevent="handleUpdate">
              <div class="form-group">
                <label for="fullName">Nama Lengkap</label>
                <input
                  id="fullName"
                  v-model="editForm.fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div v-if="error" class="error-message">
                {{ error }}
              </div>

              <div v-if="success" class="success-message">
                {{ success }}
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  @click="cancelEdit"
                  class="btn-cancel"
                  :disabled="authStore.loading"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="btn-save"
                  :disabled="authStore.loading"
                >
                  {{ authStore.loading ? "Menyimpan..." : "Simpan" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/store/useAuth";

const authStore = useAuthStore();

const isEditing = ref(false);
const error = ref("");
const success = ref("");

const editForm = reactive({
  fullName: "",
});

const userInitial = computed(() => {
  const name = authStore.userName;
  return name ? name.charAt(0).toUpperCase() : "U";
});

const memberSince = computed(() => {
  if (!authStore.user?.created_at) return "-";

  const date = new Date(authStore.user.created_at);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

function cancelEdit() {
  isEditing.value = false;
  error.value = "";
  success.value = "";
  editForm.fullName = authStore.profile?.full_name || "";
}

async function handleUpdate() {
  error.value = "";
  success.value = "";

  const result = await authStore.updateProfile(editForm.fullName);

  if (result.success) {
    success.value = "Profile berhasil diupdate!";
    setTimeout(() => {
      isEditing.value = false;
      success.value = "";
    }, 2000);
  } else {
    error.value = result.error || "Gagal update profile";
  }
}

onMounted(() => {
  editForm.fullName = authStore.profile?.full_name || "";
});
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 73px);
  background: #f9fafb;
  padding: 3rem 1rem;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.email {
  opacity: 0.9;
  font-size: 1rem;
}

.profile-content {
  padding: 2rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.info-group p {
  font-size: 1.125rem;
  color: #111827;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.btn-edit {
  width: 100%;
  margin-top: 1rem;
  padding: 0.875rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-edit:hover {
  background: #2563eb;
}

.profile-edit .form-group {
  margin-bottom: 1.5rem;
}

.profile-edit label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.profile-edit input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.profile-edit input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.success-message {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel,
.btn-save {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-save {
  background: #3b82f6;
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: #2563eb;
}

.btn-cancel:disabled,
.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
