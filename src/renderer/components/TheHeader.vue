<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="text-no-wrap">
      <div class="d-flex align-center">
        <span class="font-weight-bold">
          Team Tournament Manager
        </span>

        <span
          class="text-xs ml-2 translate-y-0.5"
          style="opacity: 0.75; font-family: monospace;"
        >
          v{{ VERSION }}
        </span>
      </div>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center me-2">
      <v-btn
        icon="mdi-repeat"
        title="Wettkampf wechseln"
        to="/"
        variant="text"
      />

      <v-btn
        :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        variant="text"
        @click="toggleTheme"
      />
    </div>

    <div class="loader-container">
      <div v-if="loadingStore.error" class="bg-error fill-height" />

      <v-progress-linear
        v-else-if="loadingStore.loading"
        absolute
        color="white"
        height="4"
        indeterminate
      />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'
  import { useLoadingStore } from '@/stores/loading'

  const loadingStore = useLoadingStore()
  const theme = useTheme()

  const VERSION = import.meta.env.VERSION

  const isDark = computed(() => theme.global.current.value.dark)

  function toggleTheme () {
    const newTheme = isDark.value ? 'myLightTheme' : 'myDarkTheme'
    theme.global.name.value = newTheme
    localStorage.setItem('user-theme', newTheme)
  }

</script>

<style scoped>
.loader-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 2;
}

.fill-height {
  height: 100%;
}
</style>
