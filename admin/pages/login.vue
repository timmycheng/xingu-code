<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold gradient-text">管理后台</NuxtLink>
        <p class="text-gray-600 mt-2">张心谷景观设计师</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">管理员登录</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              邮箱地址
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="your@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="请输入密码"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full gradient-btn text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </button>
        </form>
      </div>

      <!-- Back to Site -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 text-sm">
          ← 返回前台网站
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const { login } = useAuth()

definePageMeta({
  layout: false
})

useHead({
  title: '管理员登录 - 张心谷景观设计师'
})

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = '请填写邮箱和密码'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await login(email.value, password.value)

    // 检查是否是管理员
    if (!useAuthStore().isAdmin) {
      errorMessage.value = '您没有管理员权限'
      await useAuthStore().logout()
      return
    }

    await navigateTo('/admin/dashboard')
  } catch (error: any) {
    errorMessage.value = error.message || '登录失败，请检查您的邮箱和密码'
  } finally {
    loading.value = false
  }
}
</script>
