<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <UHeader :links="headerLinks" class="bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <!-- Logo -->
      <template #logo>
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            <span class="text-white text-xl">🌿</span>
          </div>
          <div>
            <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">张心谷景观</span>
            <span class="text-xs text-gray-500 block -mt-1">Landscape Designer</span>
          </div>
        </NuxtLink>
      </template>

      <!-- Desktop Navigation -->
      <template #center>
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 rounded-full text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm font-medium"
            active-class="text-purple-600 bg-purple-50"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </template>

      <!-- User Menu -->
      <template #right>
        <template v-if="authStore.isAuthenticated">
          <NuxtLink to="/profile" class="text-gray-700 hover:text-purple-600 transition text-sm font-medium">
            {{ authStore.userName || '个人中心' }}
          </NuxtLink>
          <UButton
            variant="ghost"
            color="gray"
            size="sm"
            @click="handleLogout"
          >
            退出
          </UButton>
        </template>
        <template v-else>
          <UButton
            to="/login"
            variant="ghost"
            color="gray"
            size="sm"
            class="hidden sm:flex"
          >
            登录
          </UButton>
          <UButton
            to="/register"
            variant="solid"
            color="purple"
            size="sm"
          >
            注册
          </UButton>
        </template>
      </template>
    </UHeader>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span class="text-white text-xl">🌿</span>
              </div>
              <span class="text-xl font-bold">张心谷景观设计</span>
            </div>
            <p class="text-gray-400 mb-6 max-w-md">
              专注于创造自然与艺术完美融合的景观空间，让每一处风景都成为心灵的栖息地。
            </p>
            <!-- Social Links -->
            <div class="flex gap-3">
              <UButton
                v-for="social in socialLinks"
                :key="social.label"
                :to="social.url"
                :aria-label="social.label"
                variant="ghost"
                color="white"
                size="lg"
                class="hover:bg-purple-500 transition-colors"
              >
                <UIcon :name="social.icon" class="w-5 h-5" />
              </UButton>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold mb-4 text-lg">快速链接</h4>
            <ul class="space-y-3">
              <li v-for="item in footerLinks" :key="item.to">
                <NuxtLink :to="item.to" class="text-gray-400 hover:text-purple-400 transition">
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold mb-4 text-lg">联系方式</h4>
            <ul class="space-y-3 text-gray-400">
              <li v-for="contact in contactInfo" :key="contact.label" class="flex items-center gap-2">
                <UIcon :name="contact.icon" class="w-5 h-5" />
                <span>{{ contact.value }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} 张心谷景观设计。All rights reserved.</p>
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

const navItems = [
  { label: '首页', to: '/' },
  { label: '关于', to: '/about' },
  { label: '项目', to: '/projects' },
  { label: '博客', to: '/blog' },
  { label: '摄影', to: '/photography' },
  { label: '留言', to: '/messages' },
]

const headerLinks = [
  { label: '首页', to: '/' },
  { label: '关于', to: '/about' },
  { label: '项目', to: '/projects' },
  { label: '博客', to: '/blog' },
  { label: '摄影', to: '/photography' },
  { label: '留言', to: '/messages' },
]

const footerLinks = [
  { label: '作品集', to: '/projects' },
  { label: '博客', to: '/blog' },
  { label: '摄影', to: '/photography' },
  { label: '关于我', to: '/about' },
]

const socialLinks = [
  { label: 'Weibo', url: '#', icon: 'i-simple-icons-sina-weibo' },
  { label: 'Instagram', url: '#', icon: 'i-simple-icons-instagram' },
  { label: 'WeChat', url: '#', icon: 'i-simple-icons-wechat' },
]

const contactInfo = [
  { label: 'Email', value: 'contact@zhangxingu.com', icon: 'i-heroicons-envelope' },
  { label: 'Phone', value: '+86 123 4567 8900', icon: 'i-heroicons-phone' },
  { label: 'Address', value: '中国上海市', icon: 'i-heroicons-map-pin' },
]
</script>
