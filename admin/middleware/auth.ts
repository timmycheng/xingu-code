export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // 检查用户是否已登录且是管理员
  if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
    return navigateTo('/login')
  }
})
