<template>
  <NuxtLayout name="admin">
    <template #header-title>文章管理</template>

    <div class="space-y-6">
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select
            v-model="filterCategory"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">全部分类</option>
            <option value="设计思考">设计思考</option>
            <option value="项目案例">项目案例</option>
            <option value="行业动态">行业动态</option>
            <option value="摄影随笔">摄影随笔</option>
          </select>
        </div>
        <NuxtLink
          to="/admin/articles/new"
          class="gradient-btn text-white px-6 py-2 rounded-lg font-medium transition"
        >
          ➕ 新建文章
        </NuxtLink>
      </div>

      <!-- Articles Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">文章</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">浏览量</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">发布时间</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="article in filteredArticles" :key="article.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-xl">📝</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ article.title }}</p>
                    <p class="text-sm text-gray-500">{{ article.excerpt.substring(0, 50) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ article.category }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ article.views }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    article.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  ]"
                >
                  {{ article.status === 'published' ? '已发布' : '草稿' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ article.published_at }}</td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <NuxtLink :to="`/admin/articles/edit/${article.id}`" class="text-purple-600 hover:text-purple-500 mr-4">编辑</NuxtLink>
                <button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-500">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '文章管理 - 管理后台'
})

const searchQuery = ref('')
const filterCategory = ref('')

const articles = ref([
  { id: 1, title: '景观设计中的生态思维', excerpt: '探讨如何在现代景观设计中融入生态学理念', category: '设计思考', views: 1234, status: 'published', published_at: '2024-01-15' },
  { id: 2, title: '城市公园的活力营造', excerpt: '分析成功城市公园的设计要素', category: '项目案例', views: 987, status: 'published', published_at: '2024-01-10' },
  { id: 3, title: '2024 年景观设计趋势展望', excerpt: '展望新一年景观设计行业的发展趋势', category: '行业动态', views: 2156, status: 'draft', published_at: null },
])

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const matchSearch = !searchQuery.value || article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = !filterCategory.value || article.category === filterCategory.value
    return matchSearch && matchCategory
  })
})

const deleteArticle = (id: number) => {
  if (confirm('确定要删除这篇文章吗？')) {
    articles.value = articles.value.filter(a => a.id !== id)
  }
}
</script>
