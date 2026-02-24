<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-96 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">关于我</h1>
        <p class="text-xl opacity-90">了解景观设计师张心谷的故事</p>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Profile Image -->
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <span class="text-9xl">👨‍🎨</span>
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-primary rounded-2xl -z-10"></div>
          </div>

          <!-- Content -->
          <div>
            <h2 class="text-4xl font-bold gradient-text mb-6">张心谷</h2>
            <h3 class="text-xl text-gray-600 mb-6">景观设计师 / Landscape Designer</h3>
            <div class="space-y-4 text-gray-700 leading-relaxed">
              <p>
                你好！我是张心谷，一名热爱自然与艺术的景观设计师。从事景观设计工作已有 15 年，
                我始终坚信设计应该尊重自然、融入环境，创造出人与自然和谐共处的空间。
              </p>
              <p>
                我的设计理念融合了东方园林的意境美和现代景观的功能性，力求在每一个项目中
                都能创造出独特而富有生命力的景观空间。
              </p>
              <p>
                工作之余，我喜欢用镜头记录大自然的美好瞬间，摄影不仅丰富了我的设计语言，
                也让我对光影和空间有了更深的理解。
              </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-10">
              <div class="text-center">
                <p class="text-4xl font-bold gradient-text">15+</p>
                <p class="text-gray-600 mt-2">年从业经验</p>
              </div>
              <div class="text-center">
                <p class="text-4xl font-bold gradient-text">100+</p>
                <p class="text-gray-600 mt-2">完成项目</p>
              </div>
              <div class="text-center">
                <p class="text-4xl font-bold gradient-text">50+</p>
                <p class="text-gray-600 mt-2">获得奖项</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Expertise -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">专业领域</h2>
          <p class="text-gray-600">专注于多元化的景观设计服务</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6">
              <span class="text-3xl">🏞️</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">公园景观设计</h3>
            <p class="text-gray-600">
              城市公园、社区绿地、生态公园等公共空间的景观规划与设计
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6">
              <span class="text-3xl">🏢</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">商业景观</h3>
            <p class="text-gray-600">
              商业综合体、办公园区、酒店度假村等商业空间的景观营造
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg card-hover">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6">
              <span class="text-3xl">🏡</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">居住区景观</h3>
            <p class="text-gray-600">
              高端住宅区、别墅庭院、屋顶花园等居住环境的景观设计
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold gradient-text mb-4">设计团队</h2>
          <p class="text-gray-600">一支充满创意与激情的专业团队</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="i in 4" :key="i" class="text-center">
            <div class="w-32 h-32 mx-auto bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center mb-4">
              <span class="text-5xl">👤</span>
            </div>
            <h3 class="text-lg font-semibold">团队成员 {{ i }}</h3>
            <p class="text-gray-600 text-sm">职位头衔</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-20 bg-gradient-primary">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-4xl font-bold mb-6">期待与您合作</h2>
        <p class="text-xl mb-8 opacity-90">
          如果您有景观设计需求或合作意向，欢迎随时联系我
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
useHead({
  title: '关于我 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '张心谷，资深景观设计师，15 年从业经验，专注于创造自然与艺术完美融合的景观空间。' }
  ]
})
</script>
