<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="text-no-wrap">
      <v-breadcrumbs class="pa-0" density="compact" :items="breadcrumbs">

        <template #divider>
          <v-icon color="white" icon="mdi-chevron-right" size="small" style="opacity: 0.7" />
        </template>

        <template #title="{ item, index }">
          <span
            class="text-body-1"
            :class="[index === 0 ? 'font-weight-bold' : 'opacity-80']"
            style="color: white;"
          >
            {{ item.title }}
          </span>
        </template>

      </v-breadcrumbs>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center me-4">
      <v-btn
        class="me-2"
        density="comfortable"
        icon="mdi-repeat"
        to="/"
        variant="text"
      />

      <v-btn
        density="comfortable"
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
  import { useRoute } from 'vue-router'
  import { useTheme } from 'vuetify'
  import { useLoadingStore } from '@/stores/loading'

  const route = useRoute()
  const loadingStore = useLoadingStore()

  const titleMap: Record<string, string> = {
    dashboard: 'Dashboard',
    evaluation: 'Auswertung',
    entry: 'Ergebniseingabe',
    sheets: 'Schießzettel',
    settings: 'Einstellungen',
    parameters: 'Turnierparameter',
    teams: 'Team & Schützen',
    schedule: 'Spielplan',
    control: 'Steuerung',
    replication: 'Replikation',
  }

  const breadcrumbs = computed(() => {
    const items = [{ title: '3. Wedemark-Team-Open', disabled: false }]
    if (route.path !== '/') {
      const segments = route.path.split('/').filter(Boolean)
      for (const segment of segments) {
        items.push({ title: titleMap[segment] || segment, disabled: false })
      }
    }
    return items
  })

  const theme = useTheme()
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

:deep(.v-toolbar-title__placeholder) { display: flex !important; overflow: hidden; }
.v-breadcrumbs { padding: 0; flex-wrap: nowrap !important; }
</style>
