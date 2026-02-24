<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-64 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">活动召集</h1>
        <p class="text-xl opacity-90">参加景观设计分享会、工作坊等活动</p>
      </div>
    </section>

    <!-- Events List -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-6">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
          >
            <div class="md:flex">
              <!-- Cover Image -->
              <div class="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
                <span class="text-6xl">🎉</span>
                <div
                  :class="[
                    'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold',
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  ]"
                >
                  {{ event.status === 'upcoming' ? '即将开始' : event.status === 'ongoing' ? '进行中' : '已结束' }}
                </div>
              </div>

              <!-- Content -->
              <div class="md:w-2/3 p-6">
                <h3 class="text-xl font-semibold mb-2">{{ event.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>

                <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {{ formatDate(event.start_date) }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ event.location }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {{ event.signups }} / {{ event.max_participants }} 人已报名
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <NuxtLink
                    :to="`/events/${event.slug}`"
                    class="text-purple-600 hover:text-purple-500 font-medium text-sm"
                  >
                    了解详情 →
                  </NuxtLink>

                  <button
                    v-if="event.status !== 'completed'"
                    @click="openSignupModal(event)"
                    class="gradient-btn text-white px-6 py-2 rounded-full text-sm font-medium transition"
                  >
                    立即报名
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="events.length === 0" class="text-center py-20">
          <span class="text-6xl mb-4 block">📅</span>
          <p class="text-gray-600">暂无活动</p>
        </div>
      </div>
    </section>

    <!-- Signup Modal -->
    <div
      v-if="showSignupModal"
      @click="closeSignupModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        @click.stop
        class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8"
      >
        <h3 class="text-2xl font-bold gradient-text mb-6">活动报名</h3>
        <p class="text-gray-600 mb-6">{{ selectedEvent?.title }}</p>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
            <input
              v-model="signupForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
            <input
              v-model="signupForm.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">电话</label>
            <input
              v-model="signupForm.phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">留言</label>
            <textarea
              v-model="signupForm.message"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="有什么想说的吗？"
            ></textarea>
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="button"
              @click="closeSignupModal"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 gradient-btn text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
            >
              {{ submitting ? '提交中...' : '确认报名' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '活动召集 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '参加张心谷举办的景观设计分享会、工作坊等活动，与设计师面对面交流。' }
  ]
})

const events = ref([
  {
    id: 1,
    title: '2024 春季景观设计分享会',
    slug: 'spring-2024-sharing',
    description: '与大家分享我在景观设计领域的经验和思考，探讨行业发展趋势。',
    start_date: '2024-03-15T14:00:00Z',
    location: '上海市静安区设计大厦',
    max_participants: 50,
    signups: 32,
    status: 'upcoming'
  },
  {
    id: 2,
    title: '苏州园林考察工作坊',
    slug: 'suzhou-garden-workshop',
    description: '为期两天的苏州古典园林实地考察，学习传统园林的设计智慧。',
    start_date: '2024-04-20T09:00:00Z',
    location: '苏州市',
    max_participants: 20,
    signups: 18,
    status: 'upcoming'
  },
  {
    id: 3,
    title: '植物配置专题课程',
    slug: 'plant-design-course',
    description: '深入讲解景观设计中植物配置的原则和技巧。',
    start_date: '2024-01-10T10:00:00Z',
    location: '线上直播',
    max_participants: 100,
    signups: 100,
    status: 'completed'
  }
])

const showSignupModal = ref(false)
const selectedEvent = ref<typeof events.value[0] | null>(null)
const signupForm = ref({ name: '', email: '', phone: '', message: '' })
const submitting = ref(false)

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openSignupModal = (event: typeof events.value[0]) => {
  selectedEvent.value = event
  showSignupModal.value = true
}

const closeSignupModal = () => {
  showSignupModal.value = false
  selectedEvent.value = null
  signupForm.value = { name: '', email: '', phone: '', message: '' }
}

const handleSignup = async () => {
  submitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('报名成功！我们会通过邮件与您联系。')
    closeSignupModal()
  } catch (error) {
    alert('报名失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>
