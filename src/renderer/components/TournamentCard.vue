<template>
  <v-card
    class="tournament-horizontal-card mb-4"
    elevation="2"
    hover
    @click="$emit('click')"
  >
    <div class="d-flex flex-no-wrap">
      <v-avatar
        class="ma-3"
        rounded="lg"
        size="120"
      >
        <v-img cover :src="banner || 'https://cdn.vuetifyjs.com/images/cards/bridge.jpg'" />
      </v-avatar>

      <v-card-text class="d-flex flex-column justify-center">
        <v-row align="center" no-gutters>
          <v-col cols="12" md="4">
            <div class="text-h6 font-weight-bold">{{ name }}</div>
            <div class="text-subtitle-2 text-medium-emphasis">
              <v-icon icon="mdi-map-marker" size="small" /> {{ location }}
            </div>
          </v-col>

          <v-col class="text-md-center py-2 py-md-0" cols="12" md="3">
            <div class="text-body-1">
              <v-icon icon="mdi-calendar" size="small" /> {{ formatDate(date) }}
            </div>
            <v-chip
              class="mt-1"
              :color="getStatusColor(status)"
              size="x-small"
              variant="flat"
            >
              {{ status }}
            </v-chip>
          </v-col>

          <v-col class="pe-4" cols="12" md="4">
            <div class="d-flex justify-space-between text-caption mb-1">
              <span>Auslastung</span>
              <span>{{ currentParticipants }} / {{ maxParticipants }}</span>
            </div>
            <v-progress-linear
              :color="getProgressColor(currentParticipants / maxParticipants)"
              height="10"
              :model-value="(currentParticipants / maxParticipants) * 100"
              rounded
            />
          </v-col>

          <v-col class="d-none d-md-flex" cols="auto">
            <v-icon color="grey-lighten-1" icon="mdi-chevron-right" />
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  defineProps<{
    name: string
    location: string
    date: string
    status: string
    currentParticipants: number
    maxParticipants: number
    banner?: string
  }>()

  defineEmits(['click'])

  const getStatusColor = (s: string) => (s === 'laufend' ? 'success' : (s === 'geplant' ? 'info' : 'grey'))
  const getProgressColor = (r: number) => (r > 0.9 ? 'error' : (r > 0.7 ? 'warning' : 'primary'))
  const formatDate = (d: string) => new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
</script>

<style scoped>
.tournament-horizontal-card {
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.tournament-horizontal-card:hover {
  background-color: #fcfcfc;
  border-color: rgb(var(--v-theme-primary));
}
</style>
