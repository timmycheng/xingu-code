<template>
  <NuxtLayout name="admin">
    <template #header-title>新建项目</template>

    <div class="max-w-4xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-xl shadow p-6 space-y-6">
          <h3 class="text-lg font-semibold">基本信息</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">项目名称</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="请输入项目名称"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="简短描述项目"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">详细内容</label>
            <textarea
              v-model="form.content"
              rows="10"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="详细的项目介绍..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                v-model="form.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">选择分类</option>
                <option value="公园景观">公园景观</option>
                <option value="商业景观">商业景观</option>
                <option value="居住区景观">居住区景观</option>
                <option value="庭院设计">庭院设计</option>
                <option value="城市规划">城市规划</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">地点</label>
              <input
                v-model="form.location"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="项目所在地"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">年份</label>
              <input
                v-model.number="form.year"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="2024"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Cover Image -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-semibold mb-4">封面图片</h3>
          <div class="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition">
            <div class="text-center">
              <span class="text-4xl">📷</span>
              <p class="text-sm text-gray-600 mt-2">点击上传封面图片</p>
            </div>
          </div>
        </div>

        <!-- Project Images -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-semibold mb-4">项目图片</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <span class="text-3xl">📸</span>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-4">点击添加更多图片</p>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-4">
          <NuxtLink
            to="/admin/projects"
            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            取消
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="gradient-btn text-white px-8 py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {{ submitting ? '保存中...' : '保存项目' }}
          </button>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: '新建项目 - 管理后台'
})

const form = ref({
  title: '',
  description: '',
  content: '',
  category: '',
  location: '',
  year: null as number | null,
  status: 'draft'
})

const submitting = ref(false)

const handleSubmit = async () => {
  submitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('项目保存成功！')
    navigateTo('/admin/projects')
  } catch (error) {
    alert('保存失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>
