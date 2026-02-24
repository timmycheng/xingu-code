import { defineStore } from 'pinia'
import type { Profile } from '~/types/database'

interface AuthState {
  user: Profile | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: true,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userEmail: (state) => state.user?.email,
    userName: (state) => state.user?.full_name,
  },

  actions: {
    setUser(user: Profile | null) {
      this.user = user
      this.isAuthenticated = !!user
      this.loading = false
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async logout() {
      this.setUser(null)
      const { supabase } = await import('~/supabase/client')
      await supabase.auth.signOut()
      await navigateTo('/login')
    },
  },
})
