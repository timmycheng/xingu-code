<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-64 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">博客文章</h1>
        <p class="text-xl opacity-90">分享景观设计的思考与见解</p>
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
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="article in filteredArticles"
            :key="article.id"
            :to="`/blog/${article.slug}`"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg group"
          >
            <!-- Cover Image -->
            <div class="h-48 bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
              <span class="text-6xl group-hover:scale-110 transition duration-300">📝</span>
              <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-purple-600">
                {{ article.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 group-hover:text-purple-600 transition">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ formatDate(article.date) }}</span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {{ article.views }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-if="filteredArticles.length === 0" class="text-center py-20">
          <span class="text-6xl mb-4 block">🔍</span>
          <p class="text-gray-600">暂无符合条件的文章</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '博客文章 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '阅读张心谷关于景观设计的思考、见解和行业动态。' }
  ]
})

const categories = ['全部', '设计思考', '项目案例', '行业动态', '摄影随笔']
const selectedCategory = ref('全部')

const articles = ref([
  { id: 1, title: '景观设计中的生态思维', slug: 'ecological-thinking', excerpt: '探讨如何在现代景观设计中融入生态学理念，创造可持续发展的景观空间。', category: '设计思考', date: '2024-01-15', views: 1234 },
  { id: 2, title: '城市公园的活力营造', slug: 'urban-park-vitality', excerpt: '分析成功城市公园的设计要素，如何通过空间布局激发城市活力。', category: '项目案例', date: '2024-01-10', views: 987 },
  { id: 3, title: '2024 年景观设计趋势展望', slug: '2024-trends', excerpt: '展望新一年景观设计行业的发展趋势和新兴理念。', category: '行业动态', date: '2024-01-05', views: 2156 },
  { id: 4, title: '光影之间的园林意境', slug: 'light-shadow-garden', excerpt: '从摄影角度解读中国传统园林的光影运用和意境营造。', category: '摄影随笔', date: '2023-12-28', views: 756 },
  { id: 5, title: '雨水花园的设计实践', slug: 'rain-garden-practice', excerpt: '分享雨水花园项目的设计经验和实施要点。', category: '设计思考', date: '2023-12-20', views: 1089 },
  { id: 6, title: '社区景观的参与式设计', slug: 'participatory-design', excerpt: '探讨如何让社区居民参与到景观设计过程中来。', category: '设计思考', date: '2023-12-15', views: 892 },
])

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    return selectedCategory.value === '全部' || article.category === selectedCategory.value
  })
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
