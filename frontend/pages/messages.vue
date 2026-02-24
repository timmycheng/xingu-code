<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-64 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">留言板</h1>
        <p class="text-xl opacity-90">有任何问题或合作意向？欢迎留言！</p>
      </div>
    </section>

    <!-- Message Board -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Submit Form -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold gradient-text mb-6">给我留言</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  您的姓名 <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="请输入您的姓名"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址 <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                留言内容 <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                placeholder="请输入您想说的话..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-500">我们会在审核后显示您的留言</p>
              <button
                type="submit"
                :disabled="submitting"
                class="gradient-btn text-white px-8 py-3 rounded-full font-semibold transition disabled:opacity-50"
              >
                {{ submitting ? '提交中...' : '提交留言' }}
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div v-if="submitSuccess" class="mt-6 bg-green-50 text-green-600 p-4 rounded-lg text-center">
            留言提交成功！感谢您的留言，我们会尽快回复您。
          </div>

          <!-- Error Message -->
          <div v-if="submitError" class="mt-6 bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {{ submitError }}
          </div>
        </div>

        <!-- Messages List -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold gradient-text mb-6">留言列表</h2>

          <div class="space-y-6">
            <div
              v-for="message in messages"
              :key="message.id"
              class="border-b pb-6 last:border-0"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <span class="font-semibold text-gray-800">{{ message.name }}</span>
                  <span class="text-xs text-gray-500 ml-2">{{ formatDate(message.created_at) }}</span>
                </div>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    message.status === 'approved' ? 'bg-green-100 text-green-600' :
                    message.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  ]"
                >
                  {{ message.status === 'approved' ? '已显示' : message.status === 'pending' ? '待审核' : '已拒绝' }}
                </span>
              </div>
              <p class="text-gray-700 mb-3">{{ message.content }}</p>

              <!-- Reply -->
              <div v-if="message.reply" class="bg-purple-50 rounded-lg p-4 ml-4">
                <div class="flex items-center mb-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-2">
                    <span class="text-sm">👨‍🎨</span>
                  </div>
                  <span class="font-semibold text-purple-600 text-sm">张心谷</span>
                  <span class="text-xs text-gray-500 ml-2">{{ formatDate(message.replied_at!) }}</span>
                </div>
                <p class="text-gray-700 text-sm">{{ message.reply }}</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="messages.length === 0" class="text-center py-12">
            <span class="text-6xl mb-4 block">💬</span>
            <p class="text-gray-600">暂无留言，快来抢沙发吧！</p>
          </div>

          <!-- Load More -->
          <div v-if="hasMore" class="text-center mt-8">
            <button
              @click="loadMore"
              class="text-purple-600 hover:text-purple-500 font-medium"
            >
              加载更多...
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '留言板 - 张心谷景观设计师',
  meta: [
    { name: 'description', content: '给张心谷留言，咨询景观设计相关服务或合作事宜。' }
  ]
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const messages = ref([
  { id: 1, name: '王先生', email: 'wang@example.com', content: '张老师您好，我对您的设计风格非常欣赏，想咨询一下住宅庭院设计的服务流程和收费标准。', status: 'approved', reply: '王先生您好，感谢您的关注！住宅庭院设计一般分为初步沟通、现场测量、方案设计、深化设计几个阶段。具体收费会根据项目面积和复杂程度而定。方便的话可以加我微信详细沟通。', created_at: '2024-01-15T10:30:00Z', replied_at: '2024-01-15T14:20:00Z' },
  { id: 2, name: '李女士', email: 'li@example.com', content: '请问您最近有开设景观设计工作坊的计划吗？很想跟您学习！', status: 'approved', reply: '李女士您好，我计划在明年春季开设一期小型工作坊，主要分享园林植物配置和空间营造的经验。您可以关注我的公众号，届时会发布报名信息。', created_at: '2024-01-14T16:45:00Z', replied_at: '2024-01-14T20:10:00Z' },
  { id: 3, name: '张先生', email: 'zhang@example.com', content: '非常崇拜您的作品！特别是苏州那个园林改造项目，简直是把传统和现代完美融合了。', status: 'approved', reply: null, created_at: '2024-01-13T09:15:00Z', replied_at: null },
])

const hasMore = ref(true)

const handleSubmit = async () => {
  submitting.value = true
  submitError.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add message to list (optimistic update)
    messages.value.unshift({
      id: Date.now(),
      name: form.value.name,
      email: form.value.email,
      content: form.value.message,
      status: 'pending',
      reply: null,
      created_at: new Date().toISOString(),
      replied_at: null
    })

    form.value = { name: '', email: '', message: '' }
    submitSuccess.value = true

    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = '提交失败，请稍后重试'
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadMore = () => {
  // Load more messages
  hasMore.value = false
}
</script>
