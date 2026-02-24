<template>
  <div v-if="article" class="bg-white">
    <!-- Hero Image -->
    <section class="relative h-80 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <span class="text-9xl">📝</span>
      </div>
      <div class="absolute inset-0 bg-black/20"></div>
    </section>

    <!-- Content -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/blog" class="text-purple-600 hover:text-purple-500 text-sm mb-4 inline-block">
          ← 返回博客列表
        </NuxtLink>

        <div class="flex items-center gap-3 mb-4">
          <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
            {{ article.category }}
          </span>
          <span class="text-gray-500 text-sm">{{ formatDate(article.date) }}</span>
        </div>

        <h1 class="text-4xl font-bold gradient-text mb-6">{{ article.title }}</h1>

        <!-- Author Info -->
        <div class="flex items-center border-t border-b py-4">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
            <span class="text-xl">👨‍🎨</span>
          </div>
          <div>
            <p class="font-medium">张心谷</p>
            <p class="text-sm text-gray-500">景观设计师</p>
          </div>
          <div class="ml-auto flex items-center text-gray-500 text-sm">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            {{ article.views }} 次阅读
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <div class="prose max-w-none">
        <p class="text-xl text-gray-700 leading-relaxed mb-8">{{ article.excerpt }}</p>
        <div class="text-gray-600 leading-loose whitespace-pre-line">{{ article.content }}</div>
      </div>

      <!-- Tags -->
      <div class="mt-12 pt-8 border-t">
        <h3 class="text-lg font-semibold mb-4">相关标签</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" :key="tag" class="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer">
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Share -->
      <div class="mt-8 pt-8 border-t flex items-center justify-between">
        <span class="text-gray-600">分享这篇文章</span>
        <div class="flex gap-3">
          <button class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white hover:opacity-80 transition">
            <span>📱</span>
          </button>
          <button class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white hover:opacity-80 transition">
            <span>🔗</span>
          </button>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-8">推荐阅读</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="i in 3"
            :key="i"
            :to="`/blog/related-${i}`"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div class="h-40 bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
              <span class="text-4xl">📝</span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-2">推荐阅读文章 {{ i }}</h3>
              <p class="text-sm text-gray-600 line-clamp-2">文章简介描述...</p>
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
const article = ref({
  id: 1,
  title: '景观设计中的生态思维',
  slug: 'ecological-thinking',
  excerpt: '探讨如何在现代景观设计中融入生态学理念，创造可持续发展的景观空间。',
  content: `在当代景观设计中，生态思维已经成为不可或缺的设计理念。作为一名景观设计师，我深知我们不仅要创造美观的空间，更要考虑人与自然的和谐共生。

## 生态思维的核心原则

1. **尊重原有生态系统**
   在设计开始前，充分了解场地的生态特征，包括土壤、水文、植被等，尽可能保留原有的生态基底。

2. **本土植物的运用**
   优先选择适应当地气候和土壤条件的本土植物，减少维护成本的同时，也为本地生物提供栖息地。

3. **雨水管理**
   通过雨水花园、透水铺装、生态草沟等设计手法，实现雨水的自然渗透、净化和收集利用。

4. **生物多样性**
   创造多样化的生境类型，吸引鸟类、昆虫等野生动物，形成完整的生态链。

## 实践案例

在我最近完成的一个社区公园项目中，我运用了上述生态思维原则：

- 保留了场地内原有的 30 棵大树
- 建立了面积 500 平方米的雨水花园
- 种植了超过 50 种本土植物
- 设计了昆虫旅馆和鸟类栖息地

项目建成后，不仅成为了居民休闲的好去处，也成为了一个小型的城市生态系统。

## 结语

生态思维不仅仅是设计理念，更是一种责任。作为景观设计师，我们有责任通过我们的设计，为城市、为自然、为未来创造更加美好的环境。`,
  category: '设计思考',
  date: '2024-01-15',
  views: 1234,
  tags: ['生态设计', '可持续发展', '景观设计', '雨水花园']
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: `${article.value?.title} - 张心谷景观设计师`,
  meta: [
    { name: 'description', content: article.value?.excerpt }
  ]
})
</script>
