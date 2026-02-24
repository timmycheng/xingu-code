<template>
  <div class="min-h-screen">
    <!-- Hero Section with Parallax -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div class="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <Transition name="fade-up" mode="out-in">
          <div :key="heroVisible">
            <p class="text-purple-300 text-sm md:text-base uppercase tracking-widest mb-4 font-medium">
              Landscape Designer
            </p>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span class="block">张心谷</span>
            </h1>
            <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p class="text-lg md:text-2xl mb-4 text-purple-100 font-light">
              用设计诠释自然与艺术的完美融合
            </p>
            <p class="text-base md:text-lg max-w-2xl mx-auto mb-12 text-purple-200/80 leading-relaxed">
              专注于创造有生命力的景观空间，<br class="hidden md:block" />
              让每一处风景都成为心灵的栖息地
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink
                to="/projects"
                class="group relative px-8 py-4 bg-white text-purple-900 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
              >
                <span class="relative z-10 flex items-center gap-2">
                  探索作品
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                了解更多
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div class="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span class="text-xs uppercase tracking-widest">Scroll</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="stat.label" class="text-center group">
            <Transition name="fade-up" :delay="index * 100">
              <div class="space-y-2">
                <div class="text-4xl md:text-5xl font-bold gradient-text">{{ stat.value }}</div>
                <div class="text-gray-600 text-sm">{{ stat.label }}</div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-purple-600 text-sm uppercase tracking-widest font-medium">Portfolio</span>
          <h2 class="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span class="gradient-text">精选项目</span>
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            每一个作品都是对自然与生活的独特诠释
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="project in featuredProjects"
            :key="project.id"
            :to="`/projects/${project.slug}`"
            class="group"
          >
            <Transition name="fade-up">
              <div class="relative overflow-hidden rounded-3xl bg-white shadow-lg h-full">
                <!-- Image -->
                <div class="relative h-72 overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110"
                    :class="project.gradient"
                  ></div>
                  <div class="absolute inset-0 flex items-center justify-center text-6xl">
                    {{ project.icon }}
                  </div>
                  <!-- Overlay Badge -->
                  <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {{ project.category }}
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ project.description }}
                  </p>
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span class="flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {{ project.location }}
                    </span>
                    <span class="text-purple-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      详情
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </NuxtLink>
        </div>

        <!-- View All -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-2 px-8 py-4 gradient-btn text-white rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            查看更多项目
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-purple-600 text-sm uppercase tracking-widest font-medium">Blog</span>
          <h2 class="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span class="gradient-text">设计随笔</span>
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            分享关于景观、生活和美学的思考
          </p>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="article in latestArticles"
            :key="article.id"
            :to="`/blog/${article.slug}`"
            class="group"
          >
            <Transition name="fade-up">
              <div class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <!-- Cover -->
                <div class="relative h-48 overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110"
                    :class="article.gradient"
                  ></div>
                  <div class="absolute inset-0 flex items-center justify-center text-5xl">
                    {{ article.icon }}
                  </div>
                  <!-- Category Badge -->
                  <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-purple-600 shadow-sm">
                    {{ article.category }}
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-lg font-semibold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {{ article.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ article.excerpt }}
                  </p>
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>{{ formatDate(article.date) }}</span>
                    <span class="flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {{ article.views }}
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </NuxtLink>
        </div>

        <!-- View All -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-full font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
          >
            查看更多文章
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-purple-300 text-sm uppercase tracking-widest font-medium">Services</span>
          <h2 class="text-4xl md:text-5xl font-bold mt-3 mb-4">
            专业服务
          </h2>
          <p class="text-purple-200 max-w-2xl mx-auto text-lg">
            提供全方位的景观设计服务
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="group">
            <Transition name="fade-up">
              <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <div class="text-4xl mb-4">{{ service.icon }}</div>
                <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
                <p class="text-purple-200 text-sm leading-relaxed">{{ service.description }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Transition name="fade-up">
          <div>
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              <span class="gradient-text">有项目想合作吗？</span>
            </h2>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              无论是景观设计、咨询还是其他合作机会，都欢迎与我联系
            </p>
            <NuxtLink
              to="/messages"
              class="inline-flex items-center gap-2 px-8 py-4 gradient-btn text-white rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
            >
              留言联系
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: '张心谷景观设计师 - 自然与艺术的完美融合',
  meta: [
    { name: 'description', content: '张心谷景观设计师官方网站，展示精选景观设计作品、博客文章和摄影作品。专注于创造自然与艺术完美融合的景观空间。' }
  ]
})

// State
const heroVisible = ref(true)

// Stats data
const stats = [
  { value: '15+', label: '年从业经验' },
  { value: '200+', label: '完成项目' },
  { value: '50+', label: '获奖作品' },
  { value: '100%', label: '客户满意' },
]

// Featured projects data
const featuredProjects = ref([
  {
    id: 1,
    title: '城市中央公园景观设计',
    slug: 'central-park',
    description: '一个融合自然与城市的大型中央公园设计，打造城市绿肺',
    category: '公园景观',
    location: '上海',
    year: 2023,
    gradient: 'from-emerald-400 to-cyan-500',
    icon: '🌳'
  },
  {
    id: 2,
    title: '商业综合体景观',
    slug: 'commercial-complex',
    description: '现代商业综合体的户外空间营造，创造活力商业氛围',
    category: '商业景观',
    location: '北京',
    year: 2023,
    gradient: 'from-purple-400 to-pink-500',
    icon: '🏢'
  },
  {
    id: 3,
    title: '高端住宅区景观设计',
    slug: 'residential-area',
    description: '打造宜居的高品质居住环境，注重私密性与社交空间平衡',
    category: '居住区景观',
    location: '杭州',
    year: 2022,
    gradient: 'from-amber-400 to-orange-500',
    icon: '🏡'
  },
])

// Latest articles data
const latestArticles = ref([
  {
    id: 1,
    title: '景观设计中的生态思维',
    slug: 'ecological-thinking',
    excerpt: '探讨如何在现代景观设计中融入生态学理念，创造可持续发展的景观空间',
    category: '设计思考',
    date: '2024-01-15',
    views: 1234,
    gradient: 'from-green-400 to-emerald-500',
    icon: '🌿'
  },
  {
    id: 2,
    title: '城市公园的活力营造',
    slug: 'urban-park-vitality',
    excerpt: '分析成功城市公园的设计要素，如何通过空间布局激发城市活力',
    category: '项目案例',
    date: '2024-01-10',
    views: 987,
    gradient: 'from-blue-400 to-indigo-500',
    icon: '🏙️'
  },
  {
    id: 3,
    title: '2024 年景观设计趋势展望',
    slug: '2024-trends',
    excerpt: '展望新一年景观设计行业的发展趋势和新兴理念',
    category: '行业动态',
    date: '2024-01-05',
    views: 2156,
    gradient: 'from-purple-400 to-pink-500',
    icon: '✨'
  },
])

// Services data
const services = [
  {
    icon: '🌳',
    title: '景观规划设计',
    description: '提供从概念设计到施工图的全流程景观设计服务，包括公园、广场、居住区等。'
  },
  {
    icon: '🏙️',
    title: '城市空间设计',
    description: '专注于城市公共空间、街道景观、城市更新等城市尺度的设计项目。'
  },
  {
    icon: '🏡',
    title: '庭院花园设计',
    description: '为私人和商业空间打造精致的庭院花园，创造独特的户外生活体验。'
  },
  {
    icon: '📐',
    title: '景观咨询',
    description: '提供专业的景观技术咨询、植物配置建议、施工指导等专业服务。'
  },
  {
    icon: '🌿',
    title: '生态修复',
    description: '运用生态学原理进行受损环境的修复设计，重建健康的生态系统。'
  },
  {
    icon: '💡',
    title: '设计顾问',
    description: '作为项目设计顾问，提供创意指导、设计审核等专业支持。'
  }
]

// Helper function
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// On mounted
onMounted(() => {
  // Trigger hero animation
  setTimeout(() => {
    heroVisible.value = true
  }, 100)
})
</script>

<style scoped>
/* Blob Animation */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Fade Up Transition */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.6s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Line Clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
