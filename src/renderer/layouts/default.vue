<template>
  <v-app border>
    <TheHeader />
    <TheNavigation />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
  import TheHeader from '@/components/TheHeader.vue'
  import TheNavigation from '@/components/TheNavigation.vue'
</script>
