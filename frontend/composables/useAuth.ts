import type { Profile } from '~/types/database'

export function useAuth() {
  const authStore = useAuthStore()
  const supabase = useSupabaseClient()
  const user = ref<Profile | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  // 检查当前会话
  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        // 获取用户资料
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

  // 登录
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // 获取用户资料
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

  // 注册
  const register = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    return data
  }

  // 登出
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    user.value = null
    authStore.setUser(null)
    await navigateTo('/')
  }

  // 监听认证状态变化
  const setupAuthListener = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          user.value = profile
          authStore.setUser(profile)
        }
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        authStore.setUser(null)
      }
    })
  }

  return {
    user,
    isAuthenticated,
    checkSession,
    login,
    register,
    logout,
    setupAuthListener,
  }
}
