<template>
  <NuxtLayout name="admin">
    <template #header-title>活动管理</template>

    <div class="space-y-6">
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索活动..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <NuxtLink
          to="/admin/events/new"
          class="gradient-btn text-white px-6 py-2 rounded-lg font-medium transition"
        >
          ➕ 创建活动
        </NuxtLink>
      </div>

      <!-- Events Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">活动</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">地点</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">报名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-xl">🎉</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ event.title }}</p>
                    <p class="text-sm text-gray-500">{{ event.description.substring(0, 40) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ event.start_date }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ event.location }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ event.signups }} / {{ event.max_participants }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  ]"
                >
                  {{ event.status === 'upcoming' ? '即将开始' : event.status === 'ongoing' ? '进行中' : '已结束' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <NuxtLink :to="`/admin/events/edit/${event.id}`" class="text-purple-600 hover:text-purple-500 mr-4">编辑</NuxtLink>
                <NuxtLink :to="`/admin/events/signups/${event.id}`" class="text-blue-600 hover:text-blue-500 mr-4">报名列表</NuxtLink>
                <button @click="deleteEvent(event.id)" class="text-red-600 hover:text-red-500">删除</button>
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
  title: '活动管理 - 管理后台'
})

const searchQuery = ref('')

const events = ref([
  { id: 1, title: '2024 春季景观设计分享会', description: '与大家分享我在景观设计领域的经验和思考', start_date: '2024-03-15', location: '上海市', max_participants: 50, signups: 32, status: 'upcoming' },
  { id: 2, title: '苏州园林考察工作坊', description: '为期两天的苏州古典园林实地考察', start_date: '2024-04-20', location: '苏州市', max_participants: 20, signups: 18, status: 'upcoming' },
  { id: 3, title: '植物配置专题课程', description: '深入讲解景观设计中植物配置的原则', start_date: '2024-01-10', location: '线上直播', max_participants: 100, signups: 100, status: 'completed' },
])

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    return !searchQuery.value || event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const deleteEvent = (id: number) => {
  if (confirm('确定要删除这个活动吗？')) {
    events.value = events.value.filter(e => e.id !== id)
  }
}
</script>
