export default defineNuxtRouteMiddleware(async (to) => {
  const { user, isAuthenticated } = useAuth()

  // 如果路由需要认证
  if (to.meta.requiresAuth) {
    // 如果用户未登录，重定向到登录页
    if (!isAuthenticated.value) {
      return navigateTo('/login')
    }
  }

  // 如果用户已登录，访问登录/注册页时重定向到首页
  if (isAuthenticated.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/')
  }
})
