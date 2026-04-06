<template>
  <v-app>
    <div
      :class="route.path == '/' ? 'justify-end' : 'justify-space-between'"
      class="d-flex"
    >
      <v-btn
        v-if="route.path != '/'"
        class="ma-2"
        to="/"
        icon="mdi-arrow-left"
      ></v-btn>
      <v-btn
        class="ma-2"
        @click="theme.toggle()"
        :icon="
          theme.name.value == 'dark'
            ? 'mdi-white-balance-sunny'
            : 'mdi-weather-night'
        "
      ></v-btn>
    </div>

    <NuxtPage></NuxtPage>
  </v-app>
</template>
<script setup>
import { useTheme } from "vuetify"
const theme = useTheme()
const route = useRoute()
</script>
