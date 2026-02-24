<template>
  <NuxtLayout name="admin">
    <template #header-title>摄影作品管理</template>

    <div class="space-y-6">
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索相册..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <NuxtLink
          to="/admin/photography/new"
          class="gradient-btn text-white px-6 py-2 rounded-lg font-medium transition"
        >
          ➕ 新建相册
        </NuxtLink>
      </div>

      <!-- Albums Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="album in filteredAlbums"
          :key="album.id"
          class="bg-white rounded-xl shadow overflow-hidden card-hover"
        >
          <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
            <span class="text-6xl">📷</span>
            <div class="absolute top-4 right-4">
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  album.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                ]"
              >
                {{ album.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ album.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ album.description || '暂无描述' }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ photoCounts[album.id] || 0 }} 张照片</span>
              <div class="flex gap-2">
                <NuxtLink :to="`/admin/photography/edit/${album.id}`" class="text-purple-600 hover:text-purple-500">编辑</NuxtLink>
                <button @click="deleteAlbum(album.id)" class="text-red-600 hover:text-red-500">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAlbums.length === 0" class="text-center py-20">
        <span class="text-6xl mb-4 block">📷</span>
        <p class="text-gray-600">暂无摄影相册</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '摄影作品管理 - 管理后台'
})

const searchQuery = ref('')

const albums = ref([
  { id: 1, title: '江南园林', slug: 'jiangnan-gardens', description: '苏州、杭州等地古典园林的光影记录', status: 'published' },
  { id: 2, title: '城市天际线', slug: 'city-skyline', description: '现代都市建筑与天空的对话', status: 'published' },
  { id: 3, title: '自然风光', slug: 'nature', description: '山川湖海，大自然的鬼斧神工', status: 'draft' },
])

const photoCounts = ref({ 1: 45, 2: 32, 3: 68 })

const filteredAlbums = computed(() => {
  return albums.value.filter(album => {
    return !searchQuery.value || album.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const deleteAlbum = (id: number) => {
  if (confirm('确定要删除这个相册吗？')) {
    albums.value = albums.value.filter(a => a.id !== id)
  }
}
</script>
