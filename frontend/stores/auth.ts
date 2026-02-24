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

    async fetchUser() {
      this.setLoading(true)
      try {
        const { data, error } = await useFetch<Profile>('/api/auth/user', {
          method: 'GET',
        })

        if (error.value || !data.value) {
          this.setUser(null)
          return
        }

        this.setUser(data.value)
      } catch (e) {
        this.setUser(null)
      }
    },

    async logout() {
      // 清除本地状态
      this.setUser(null)
      // 清除 Supabase session
      const { supabase } = await import('~/supabase/client')
      await supabase.auth.signOut()
      // 重定向到首页
      await navigateTo('/')
    },
  },
})
