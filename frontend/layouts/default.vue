<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="text-2xl font-bold gradient-text">
            张心谷景观
          </NuxtLink>

          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-purple-600 transition">首页</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-purple-600 transition">关于</NuxtLink>
            <NuxtLink to="/projects" class="text-gray-700 hover:text-purple-600 transition">项目</NuxtLink>
            <NuxtLink to="/blog" class="text-gray-700 hover:text-purple-600 transition">博客</NuxtLink>
            <NuxtLink to="/photography" class="text-gray-700 hover:text-purple-600 transition">摄影</NuxtLink>
            <NuxtLink to="/messages" class="text-gray-700 hover:text-purple-600 transition">留言</NuxtLink>
            <NuxtLink to="/events" class="text-gray-700 hover:text-purple-600 transition">活动</NuxtLink>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <template v-if="authStore.isAuthenticated">
              <NuxtLink to="/profile" class="text-gray-700 hover:text-purple-600 transition">
                {{ authStore.userName || '个人中心' }}
              </NuxtLink>
              <button
                @click="handleLogout"
                class="text-gray-700 hover:text-purple-600 transition"
              >
                退出
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-gray-700 hover:text-purple-600 transition">
                登录
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="gradient-btn text-white px-4 py-2 rounded-full text-sm"
              >
                注册
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold gradient-text mb-4">张心谷景观设计</h3>
            <p class="text-gray-400">
              专注于创造自然与艺术完美融合的景观空间
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">快速链接</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/projects" class="hover:text-purple-400">作品集</NuxtLink></li>
              <li><NuxtLink to="/blog" class="hover:text-purple-400">博客</NuxtLink></li>
              <li><NuxtLink to="/photography" class="hover:text-purple-400">摄影</NuxtLink></li>
              <li><NuxtLink to="/events" class="hover:text-purple-400">活动</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">联系方式</h4>
            <ul class="space-y-2 text-gray-400">
              <li>邮箱：contact@zhangxingu.com</li>
              <li>电话：+86 123 4567 8900</li>
              <li>地址：中国上海市</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 张心谷景观设计。All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
