<template>
  <div v-if="album" class="bg-white">
    <!-- Header -->
    <section class="relative h-64 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <span class="text-9xl">📷</span>
      </div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div class="text-white">
          <NuxtLink to="/photography" class="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← 返回摄影列表
          </NuxtLink>
          <h1 class="text-4xl font-bold mb-2">{{ album.title }}</h1>
          <p class="text-xl opacity-90">{{ album.description }}</p>
        </div>
      </div>
    </section>

    <!-- Photos Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="photo in photos"
            :key="photo.id"
            @click="openLightbox(photo)"
            class="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-80 transition overflow-hidden group relative"
          >
            <span class="text-5xl group-hover:scale-110 transition duration-300">📸</span>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
              <span class="text-white opacity-0 group-hover:opacity-100 transition text-3xl">🔍</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      @click="closeLightbox"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <button
        @click="closeLightbox"
        class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition"
      >
        ×
      </button>

      <div class="max-w-5xl max-h-screen">
        <div class="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
          <span class="text-9xl">📸</span>
        </div>
        <p v-if="currentPhoto?.title" class="text-white text-center mt-4 text-lg">{{ currentPhoto.title }}</p>
        <p v-if="currentPhoto?.description" class="text-white/70 text-center mt-2">{{ currentPhoto.description }}</p>
      </div>
    </div>
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

const album = ref({
  id: 1,
  title: '江南园林',
  slug: 'jiangnan-gardens',
  description: '苏州、杭州等地古典园林的光影记录',
  coverImage: ''
})

const photos = ref([
  { id: 1, title: '拙政园晨景', description: '清晨的拙政园，薄雾中的亭台楼阁', url: '' },
  { id: 2, title: '留园曲径', description: '留园中蜿蜒曲折的小径', url: '' },
  { id: 3, title: '网师园月夜', description: '月夜下的网师园，光影交错', url: '' },
  { id: 4, title: '颐和园长廊', description: '颐和园长廊的精美彩绘', url: '' },
  { id: 5, title: '西湖断桥', description: '冬日西湖的断桥残雪', url: '' },
  { id: 6, title: '乌镇水乡', description: '乌镇水乡的清晨', url: '' },
])

const lightboxOpen = ref(false)
const currentPhoto = ref<typeof photos.value[0] | null>(null)

const openLightbox = (photo: typeof photos.value[0]) => {
  currentPhoto.value = photo
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  currentPhoto.value = null
  document.body.style.overflow = ''
}

// Close lightbox on escape key
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox()
  })
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

useHead({
  title: `${album.value?.title} - 张心谷景观设计师`,
  meta: [
    { name: 'description', content: album.value?.description }
  ]
})
</script>
