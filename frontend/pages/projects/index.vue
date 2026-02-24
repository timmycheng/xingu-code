<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-64 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">项目作品</h1>
        <p class="text-xl opacity-90">探索精心设计的景观作品</p>
      </div>
    </section>

    <!-- Filter & Search -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition',
                selectedCategory === cat
                  ? 'gradient-btn text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索项目..."
              class="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="project in filteredProjects"
            :key="project.id"
            :to="`/projects/${project.slug}`"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg group"
          >
            <!-- Cover Image -->
            <div class="h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
              <span class="text-6xl group-hover:scale-110 transition duration-300">🏞️</span>
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {{ project.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-purple-600 transition">{{ project.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ project.location }}
                </span>
                <span>{{ project.year }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-20">
          <span class="text-6xl mb-4 block">🔍</span>
          <p class="text-gray-600">暂无符合条件的项目</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '项目作品 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '浏览张心谷的景观设计作品集，包括公园景观、商业景观、居住区景观等各类优秀作品。' }
  ]
})

// 分类
const categories = ['全部', '公园景观', '商业景观', '居住区景观', '庭院设计', '城市规划']
const selectedCategory = ref('全部')
const searchQuery = ref('')

// 模拟项目数据
const projects = ref([
  { id: 1, title: '城市中央公园景观设计', slug: 'central-park', description: '一个融合自然与城市的大型中央公园设计', category: '公园景观', location: '上海', year: 2023 },
  { id: 2, title: '商业综合体景观', slug: 'commercial-complex', description: '现代商业综合体的户外空间营造', category: '商业景观', location: '北京', year: 2023 },
  { id: 3, title: '高端住宅区景观设计', slug: 'residential-area', description: '打造宜居的高品质居住环境', category: '居住区景观', location: '杭州', year: 2022 },
  { id: 4, title: '私家庭院设计', slug: 'private-garden', description: '为私人定制的精致庭院空间', category: '庭院设计', location: '苏州', year: 2022 },
  { id: 5, title: '滨江绿道规划', slug: 'riverside-greenway', description: '城市滨江绿道的整体规划设计', category: '城市规划', location: '南京', year: 2021 },
  { id: 6, title: '科技园区景观', slug: 'tech-park', description: '科技创新园区的景观设计', category: '商业景观', location: '深圳', year: 2023 },
])

// 筛选项目
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchCategory = selectedCategory.value === '全部' || project.category === selectedCategory.value
    const matchSearch = !searchQuery.value || project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})
</script>
