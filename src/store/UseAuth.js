import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
    loading: false,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => state.user?.email || '',
    userName: (state) => state.profile?.full_name || state.user?.email || 'User'
  },

  actions: {
    async init() {
      if (this.initialized) return
      
      await this.checkAuth()
      
      // Listen untuk perubahan auth state
      supabase.auth.onAuthStateChange(async (event, session) => {
        this.user = session?.user || null
        if (this.user) {
          await this.loadProfile()
        } else {
          this.profile = null
        }
      })
      
      this.initialized = true
    },

    async register(email, password, fullName) {
      this.loading = true
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        })
        
        if (error) throw error
        
        // Supabase kadang perlu email confirmation
        // Cek apakah user langsung bisa login atau perlu konfirmasi
        if (data.user && !data.session) {
          return { 
            success: true, 
            needsConfirmation: true,
            message: 'Silakan cek email untuk konfirmasi akun' 
          }
        }
        
        this.user = data.user
        await this.loadProfile()
        
        return { success: true, needsConfirmation: false }
      } catch (error) {
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        this.user = data.user
        await this.loadProfile()
        
        return { success: true, user: data.user }
      } catch (error) {
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        this.user = null
        this.profile = null
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async checkAuth() {
      const { data } = await supabase.auth.getSession()
      this.user = data.session?.user || null
      
      if (this.user) {
        await this.loadProfile()
      }
    },

    async loadProfile() {
      // Ambil metadata dari user (full_name disimpan di user metadata)
      if (this.user?.user_metadata) {
        this.profile = {
          full_name: this.user.user_metadata.full_name || '',
          email: this.user.email
        }
      }
    },

    async updateProfile(fullName) {
      this.loading = true
      try {
        const { data, error } = await supabase.auth.updateUser({
          data: { full_name: fullName }
        })
        
        if (error) throw error
        
        this.user = data.user
        await this.loadProfile()
        
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    }
  }
})