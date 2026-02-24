<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold gradient-text">张心谷景观</NuxtLink>
      </div>

      <!-- Register Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">注册账号</h2>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
              姓名
            </label>
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="您的姓名"
            />
          </div>

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
              minlength="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="至少 6 位密码"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              确认密码
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="再次输入密码"
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
            <span v-if="!loading">注册</span>
            <span v-else>注册中...</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            已有账号？
            <NuxtLink to="/login" class="text-purple-600 hover:text-purple-500 font-medium">
              立即登录
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
const confirmPassword = ref('')
const fullName = ref('')
const loading = ref(false)
const errorMessage = ref('')

const { register } = useAuth()

definePageMeta({
  layout: false
})

useHead({
  title: '注册 - 张心谷景观设计师'
})

const handleRegister = async () => {
  // Validation
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = '请填写所有字段'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = '密码长度至少为 6 位'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await register(email.value, password.value, fullName.value)
    // 显示成功消息，建议用户检查邮箱
    alert('注册成功！请检查您的邮箱以验证账户，验证后即可登录。')
    await navigateTo('/login')
  } catch (error: any) {
    errorMessage.value = error.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>
