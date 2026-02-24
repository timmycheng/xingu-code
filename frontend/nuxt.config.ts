// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_PUBLISHABLE_KEY,
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/theme.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: '张心谷景观设计师 - 自然与艺术的完美融合',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '张心谷 (Zhang Xingu) - 专业景观设计师，专注于自然与艺术的完美融合，提供高品质的景观设计服务。' },
        { name: 'keywords', content: '张心谷，景观设计，园林设计，环境设计，城市规划，景观设计工作室' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
})
