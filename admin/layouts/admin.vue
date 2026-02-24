<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b">
        <NuxtLink to="/" class="text-xl font-bold gradient-text">管理后台</NuxtLink>
      </div>

      <!-- Nav Menu -->
      <nav class="p-4 space-y-2">
        <NuxtLink
          to="/admin/dashboard"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          📊 仪表盘
        </NuxtLink>
        <NuxtLink
          to="/admin/projects"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          🏞️ 项目管理
        </NuxtLink>
        <NuxtLink
          to="/admin/articles"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          📝 文章管理
        </NuxtLink>
        <NuxtLink
          to="/admin/photography"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          📷 摄影作品
        </NuxtLink>
        <NuxtLink
          to="/admin/messages"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          💬 留言管理
        </NuxtLink>
        <NuxtLink
          to="/admin/events"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          🎉 活动管理
        </NuxtLink>
        <NuxtLink
          to="/admin/users"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          active-class="bg-purple-50 text-purple-600"
        >
          👥 用户管理
        </NuxtLink>
      </nav>

      <!-- Back to Site -->
      <div class="absolute bottom-20 left-0 right-0 p-4">
        <NuxtLink
          to="/"
          target="_blank"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition text-center"
        >
          🌐 返回前台
        </NuxtLink>
      </div>

      <!-- Logout -->
      <div class="absolute bottom-4 left-0 right-0 p-4">
        <button
          @click="handleLogout"
          class="w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition text-center"
        >
          🚪 退出登录
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="ml-64">
      <!-- Top Bar -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">
        <h1 class="text-xl font-semibold text-gray-800">
          <slot name="header-title">管理后台</slot>
        </h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ authStore.userEmail }}</span>
          <span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">管理员</span>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
