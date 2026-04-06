// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
export default defineNuxtConfig({
  ssr: false,
  css: ["@mdi/font/css/materialdesignicons.min.css"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },

    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  debug: true,
  modules: ["@pinia/nuxt"],
})