<template>
  <NuxtLayout name="admin">
    <template #header-title>项目管理</template>

    <div class="space-y-6">
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索项目..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <NuxtLink
          to="/admin/projects/new"
          class="gradient-btn text-white px-6 py-2 rounded-lg font-medium transition"
        >
          ➕ 新建项目
        </NuxtLink>
      </div>

      <!-- Projects Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">项目</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">地点</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">年份</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="project in filteredProjects" :key="project.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-xl">🏞️</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ project.title }}</p>
                    <p class="text-sm text-gray-500">{{ project.description.substring(0, 50) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ project.category }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ project.location }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ project.year }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    project.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  ]"
                >
                  {{ project.status === 'published' ? '已发布' : '草稿' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <NuxtLink :to="`/admin/projects/edit/${project.id}`" class="text-purple-600 hover:text-purple-500 mr-4">编辑</NuxtLink>
                <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-500">删除</button>
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
  title: '项目管理 - 管理后台'
})

const searchQuery = ref('')
const filterStatus = ref('')

const projects = ref([
  { id: 1, title: '城市中央公园景观设计', description: '一个融合自然与城市的大型中央公园设计', category: '公园景观', location: '上海', year: 2023, status: 'published' },
  { id: 2, title: '商业综合体景观', description: '现代商业综合体的户外空间营造', category: '商业景观', location: '北京', year: 2023, status: 'published' },
  { id: 3, title: '高端住宅区景观设计', description: '打造宜居的高品质居住环境', category: '居住区景观', location: '杭州', year: 2022, status: 'draft' },
])

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchSearch = !searchQuery.value || project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = !filterStatus.value || project.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

const deleteProject = (id: number) => {
  if (confirm('确定要删除这个项目吗？')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}
</script>
