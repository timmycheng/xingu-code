<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold gradient-text">张心谷景观</NuxtLink>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">用户登录</h2>

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

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">记住我</span>
            </label>
            <a href="#" class="text-sm text-purple-600 hover:text-purple-500">忘记密码？</a>
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

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            还没有账号？
            <NuxtLink to="/register" class="text-purple-600 hover:text-purple-500 font-medium">
              立即注册
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 text-sm">
          ← 返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const { login } = useAuth()

definePageMeta({
  layout: false
})

useHead({
  title: '登录 - 张心谷景观设计师'
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
    await navigateTo('/')
  } catch (error: any) {
    errorMessage.value = error.message || '登录失败，请检查您的邮箱和密码'
  } finally {
    loading.value = false
  }
}
</script>
