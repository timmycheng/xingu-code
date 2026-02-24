<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-64 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">摄影作品</h1>
        <p class="text-xl opacity-90">用镜头记录自然与建筑的美好瞬间</p>
      </div>
    </section>

    <!-- Albums Grid -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="album in albums"
            :key="album.id"
            :to="`/photography/${album.slug}`"
            class="card-hover group cursor-pointer"
          >
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg">
              <!-- Cover Image -->
              <div class="h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
                <span class="text-7xl group-hover:scale-110 transition duration-300">📷</span>
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 group-hover:text-purple-600 transition">{{ album.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ album.description }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ album.count }} 张照片</span>
                  <span class="text-purple-600">查看详情 →</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '摄影作品 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '浏览张心谷的摄影作品，记录自然景观、建筑设计、旅行见闻等美好瞬间。' }
  ]
})

const albums = ref([
  { id: 1, title: '江南园林', slug: 'jiangnan-gardens', description: '苏州、杭州等地古典园林的光影记录', count: 45 },
  { id: 2, title: '城市天际线', slug: 'city-skyline', description: '现代都市建筑与天空的对话', count: 32 },
  { id: 3, title: '自然风光', slug: 'nature', description: '山川湖海，大自然的鬼斧神工', count: 68 },
  { id: 4, title: '旅行随笔', slug: 'travel', description: '行走在路上的风景与人文', count: 56 },
  { id: 5, title: '植物特写', slug: 'plants', description: '微观世界里的植物之美', count: 41 },
  { id: 6, title: '季节更迭', slug: 'seasons', description: '春夏秋冬，时光的印记', count: 52 },
])
</script>
