<template>
  <NuxtLayout name="admin">
    <template #header-title>仪表盘</template>

    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">项目作品</p>
              <p class="text-3xl font-bold gradient-text">{{ stats.projects }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">🏞️</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">博客文章</p>
              <p class="text-3xl font-bold gradient-text">{{ stats.articles }}</p>
            </div>
            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">摄影作品</p>
              <p class="text-3xl font-bold gradient-text">{{ stats.photos }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">📷</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">待审核留言</p>
              <p class="text-3xl font-bold gradient-text">{{ stats.pendingMessages }}</p>
            </div>
            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">💬</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Messages -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-semibold mb-4">最近留言</h3>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="border-b pb-3 last:border-0">
              <div class="flex items-center justify-between">
                <span class="font-medium">访客 {{ i }}</span>
                <span class="text-xs text-gray-500">2024-01-15</span>
              </div>
              <p class="text-sm text-gray-600 mt-1 truncate">这是一条留言内容示例...</p>
              <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded mt-1 inline-block">待审核</span>
            </div>
          </div>
          <NuxtLink to="/admin/messages" class="text-purple-600 hover:text-purple-500 text-sm mt-4 inline-block">
            查看全部 →
          </NuxtLink>
        </div>

        <!-- Recent Events -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-semibold mb-4">最近活动</h3>
          <div class="space-y-4">
            <div v-for="i in 3" :key="i" class="border-b pb-3 last:border-0">
              <div class="flex items-center justify-between">
                <span class="font-medium">活动名称 {{ i }}</span>
                <span class="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">进行中</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">2024-01-20 ~ 2024-01-25</p>
              <p class="text-sm text-gray-500 mt-1">已报名：15 / 30 人</p>
            </div>
          </div>
          <NuxtLink to="/admin/events" class="text-purple-600 hover:text-purple-500 text-sm mt-4 inline-block">
            查看全部 →
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-4">快速操作</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            to="/admin/projects/new"
            class="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center hover:shadow-md transition"
          >
            <span class="text-2xl">➕</span>
            <p class="text-sm font-medium mt-2">新建项目</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/articles/new"
            class="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center hover:shadow-md transition"
          >
            <span class="text-2xl">✍️</span>
            <p class="text-sm font-medium mt-2">新建文章</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/photography/new"
            class="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center hover:shadow-md transition"
          >
            <span class="text-2xl">📸</span>
            <p class="text-sm font-medium mt-2">上传作品</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/events/new"
            class="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center hover:shadow-md transition"
          >
            <span class="text-2xl">📅</span>
            <p class="text-sm font-medium mt-2">创建活动</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '仪表盘 - 管理后台'
})

// 模拟数据
const stats = ref({
  projects: 24,
  articles: 18,
  photos: 156,
  pendingMessages: 5
})
</script>
