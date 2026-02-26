<template>
  <router-view />

  <v-snackbar
    v-model="loadingStore.error"
    color="error"
    location="bottom"
    :timeout="-1"
  >
    {{ loadingStore.errorMessage }}
    <template #actions>
      <v-btn variant="text" @click="loadingStore.hide()">Schließen</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { useLoadingStore } from '@/stores/loading'
  const loadingStore = useLoadingStore()
</script>

<style scoped>
  * {
    transition: background-color 0.3s ease, color 0.3s ease !important;
  }
</style>
