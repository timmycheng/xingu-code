<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background with Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 fade-in">
          张心谷
        </h1>
        <p class="text-xl md:text-2xl mb-8 fade-in" style="animation-delay: 0.2s">
          景观设计师 · Landscape Designer
        </p>
        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-12 fade-in opacity-90" style="animation-delay: 0.4s">
          专注于创造自然与艺术完美融合的景观空间，<br/>让每一处风景都充满诗意与生命力
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center fade-in" style="animation-delay: 0.6s">
          <NuxtLink
            to="/projects"
            class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            查看作品
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition"
          >
            了解更多
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">精选项目</h2>
          <p class="text-gray-600">探索精心设计的景观作品</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="i in 3"
            :key="i"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <div class="h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span class="text-white text-6xl">🏞️</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">项目名称 {{ i }}</h3>
              <p class="text-gray-600 mb-4">项目简介描述，展示项目的特色和亮点...</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">2024 年</span>
                <span class="text-purple-600 font-medium">查看详情 →</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink
            to="/projects"
            class="gradient-btn text-white px-8 py-3 rounded-full font-semibold inline-block"
          >
            查看更多项目
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">最新文章</h2>
          <p class="text-gray-600">分享景观设计的思考与见解</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="i in 3"
            :key="i"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <div class="h-48 bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
              <span class="text-white text-5xl">📝</span>
            </div>
            <div class="p-6">
              <span class="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full">设计思考</span>
              <h3 class="text-lg font-semibold mt-3 mb-2">文章标题 {{ i }}</h3>
              <p class="text-gray-600 text-sm mb-4">文章摘要描述，吸引读者繼續閱讀...</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>2024-01-15</span>
                <span>阅读更多 →</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink
            to="/blog"
            class="gradient-btn text-white px-8 py-3 rounded-full font-semibold inline-block"
          >
            查看更多文章
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-20 bg-gradient-primary">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-4xl font-bold mb-6">有项目想合作吗？</h2>
        <p class="text-xl mb-8 opacity-90">
          无论是景观设计、咨询还是其他合作机会，都欢迎与我联系
        </p>
        <NuxtLink
          to="/messages"
          class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
        >
          留言联系
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: '首页 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '张心谷景观设计师官方网站，展示精选景观设计作品、博客文章和摄影作品。' }
  ]
})
</script>
