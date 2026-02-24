<template>
  <div v-if="project" class="bg-white">
    <!-- Hero Image -->
    <section class="relative h-96 md:h-[500px] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <span class="text-9xl">🏞️</span>
      </div>
      <div class="absolute inset-0 bg-black/20"></div>
    </section>

    <!-- Content -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/projects" class="text-purple-600 hover:text-purple-500 text-sm mb-4 inline-block">
          ← 返回项目列表
        </NuxtLink>
        <h1 class="text-4xl font-bold gradient-text mb-4">{{ project.title }}</h1>
        <div class="flex flex-wrap gap-4 text-gray-600">
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {{ project.location }}
          </span>
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ project.year }}
          </span>
          <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
            {{ project.category }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div class="prose max-w-none mb-12">
        <p class="text-xl text-gray-700 leading-relaxed mb-6">{{ project.description }}</p>
        <div class="text-gray-600 leading-relaxed whitespace-pre-line">{{ project.content }}</div>
      </div>

      <!-- Image Gallery -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">项目图片</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 6" :key="i" class="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition">
            <span class="text-4xl">📷</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-8">相关项目</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="i in 3"
            :key="i"
            :to="`/projects/related-${i}`"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span class="text-5xl">🏞️</span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-2">相关项目 {{ i }}</h3>
              <p class="text-sm text-gray-600">项目简介描述...</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="loading-gradient w-16 h-16 rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 模拟项目数据
const project = ref({
  id: 1,
  title: '城市中央公园景观设计',
  slug: 'central-park',
  description: '一个融合自然与城市的大型中央公园设计，旨在为城市居民提供一个亲近自然的休闲空间。',
  content: `设计亮点：

1. 生态优先：保留原有植被，引入本土植物，建立完整的生态系统

2. 功能复合：包含休闲草坪、儿童游乐区、健身步道、水上花园等多个功能区域

3. 文化融合：融入当地文化元素，打造具有地域特色的景观节点

4. 可持续设计：采用雨水收集系统、太阳能照明等绿色技术

项目占地面积约 50 公顷，历时两年完成设计并投入使用。`,
  category: '公园景观',
  location: '上海',
  year: 2023,
  images: []
})

useHead({
  title: `${project.value?.title} - 张心谷景观设计师`,
  meta: [
    { name: 'description', content: project.value?.description }
  ]
})
</script>
