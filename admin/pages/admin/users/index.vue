<template>
  <NuxtLayout name="admin">
    <template #header-title>用户管理</template>

    <div class="space-y-6">
      <!-- Filter -->
      <div class="flex gap-4">
        <select
          v-model="filterRole"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">全部角色</option>
          <option value="admin">管理员</option>
          <option value="user">普通用户</option>
        </select>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {{ user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ user.full_name || '未设置姓名' }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                  ]"
                >
                  {{ user.role === 'admin' ? '管理员' : '普通用户' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ user.created_at }}</td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <button class="text-purple-600 hover:text-purple-500 mr-4">编辑</button>
                <button v-if="user.role !== 'admin'" class="text-blue-600 hover:text-blue-500 mr-4">设为管理员</button>
                <button class="text-red-600 hover:text-red-500">删除</button>
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
  title: '用户管理 - 管理后台'
})

const filterRole = ref('')

const users = ref([
  { id: 1, email: 'admin@zhangxingu.com', full_name: '张心谷', role: 'admin', created_at: '2024-01-01' },
  { id: 2, email: 'user1@example.com', full_name: '王先生', role: 'user', created_at: '2024-01-10' },
  { id: 3, email: 'user2@example.com', full_name: '李女士', role: 'user', created_at: '2024-01-12' },
])

const filteredUsers = computed(() => {
  if (!filterRole.value) return users.value
  return users.value.filter(u => u.role === filterRole.value)
})
</script>
