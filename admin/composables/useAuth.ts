import { supabase } from '~/supabase/client'
import type { Profile } from '~/types/database'

export function useAuth() {
  const authStore = useAuthStore()
  const user = ref<Profile | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          user.value = profile
          authStore.setUser(profile)
        }
      } else {
        authStore.setUser(null)
      }
    } catch (error) {
      console.error('Session check error:', error)
      authStore.setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profile) {
        user.value = profile
        authStore.setUser(profile)
      }
    }

    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    user.value = null
    authStore.setUser(null)
    await navigateTo('/login')
  }

  return {
    user,
    isAuthenticated,
    checkSession,
    login,
    logout,
  }
}
