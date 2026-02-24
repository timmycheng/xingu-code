<template>
  <NuxtLayout name="admin">
    <template #header-title>留言管理</template>

    <div class="space-y-6">
      <!-- Filter -->
      <div class="flex gap-4">
        <select
          v-model="filterStatus"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">全部状态</option>
          <option value="pending">待审核</option>
          <option value="approved">已通过</option>
          <option value="rejected">已拒绝</option>
        </select>
      </div>

      <!-- Messages List -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div v-for="message in filteredMessages" :key="message.id" class="border-b last:border-0">
          <div class="p-6 hover:bg-gray-50">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ message.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ message.name }}</p>
                  <p class="text-sm text-gray-500">{{ message.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full',
                    message.status === 'approved' ? 'bg-green-100 text-green-600' :
                    message.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  ]"
                >
                  {{ message.status === 'approved' ? '已通过' : message.status === 'pending' ? '待审核' : '已拒绝' }}
                </span>
                <span class="text-sm text-gray-500">{{ formatDate(message.created_at) }}</span>
              </div>
            </div>

            <p class="text-gray-700 mb-4 pl-13">{{ message.content }}</p>

            <!-- Reply -->
            <div v-if="message.reply" class="bg-purple-50 rounded-lg p-4 mb-4">
              <p class="text-sm text-purple-600 font-semibold mb-1">回复：</p>
              <p class="text-gray-700">{{ message.reply }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pl-13">
              <button
                v-if="message.status !== 'approved'"
                @click="approveMessage(message.id)"
                class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
              >
                ✓ 通过
              </button>
              <button
                v-if="message.status !== 'rejected'"
                @click="rejectMessage(message.id)"
                class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
              >
                ✗ 拒绝
              </button>
              <button
                @click="showReplyForm = showReplyForm === message.id ? null : message.id"
                class="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition"
              >
                {{ showReplyForm === message.id ? '取消' : '回复' }}
              </button>
            </div>

            <!-- Reply Form -->
            <div v-if="showReplyForm === message.id" class="mt-4 pl-13">
              <textarea
                v-model="replyContent"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="输入回复内容..."
              ></textarea>
              <div class="flex gap-3 mt-3">
                <button
                  @click="submitReply(message.id)"
                  class="px-4 py-2 gradient-btn text-white rounded-lg text-sm transition"
                >
                  提交回复
                </button>
                <button
                  @click="showReplyForm = null"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMessages.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">💬</span>
          <p class="text-gray-600">暂无留言</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '留言管理 - 管理后台'
})

const filterStatus = ref('')
const showReplyForm = ref<number | null>(null)
const replyContent = ref('')

const messages = ref([
  { id: 1, name: '王先生', email: 'wang@example.com', content: '张老师您好，我对您的设计风格非常欣赏，想咨询一下住宅庭院设计的服务流程和收费标准。', status: 'pending', reply: null, created_at: '2024-01-15T10:30:00Z' },
  { id: 2, name: '李女士', email: 'li@example.com', content: '请问您最近有开设景观设计工作坊的计划吗？很想跟您学习！', status: 'approved', reply: '李女士您好，我计划在明年春季开设一期小型工作坊。', created_at: '2024-01-14T16:45:00Z' },
  { id: 3, name: '张先生', email: 'zhang@example.com', content: '非常崇拜您的作品！特别是苏州那个园林改造项目。', status: 'approved', reply: null, created_at: '2024-01-13T09:15:00Z' },
])

const filteredMessages = computed(() => {
  if (!filterStatus.value) return messages.value
  return messages.value.filter(m => m.status === filterStatus.value)
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const approveMessage = (id: number) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) msg.status = 'approved'
}

const rejectMessage = (id: number) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) msg.status = 'rejected'
}

const submitReply = (id: number) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg && replyContent.value) {
    msg.reply = replyContent.value
    msg.status = 'approved'
    replyContent.value = ''
    showReplyForm.value = null
    alert('回复成功！')
  }
}
</script>
