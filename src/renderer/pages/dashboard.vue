<template>
  <v-row align="center" justify="center" style="min-height: 50vh;">
    <v-col cols="12" lg="6" md="8">
      <v-card border elevation="4">
        <v-card-item>
          <v-card-title>Loading Service Testcenter</v-card-title>
          <v-card-subtitle>Teste den Header-Balken und die Fehlermeldungen</v-card-subtitle>
        </v-card-item>

        <v-divider />

        <v-card-text class="py-6">
          <div class="d-flex flex-column gap-4">

            <v-btn
              color="primary"
              :disabled="loadingStore.loading"
              prepend-icon="mdi-sync"
              size="large"
              @click="simulateLoading"
            >
              Daten laden (3 Sek.)
            </v-btn>

            <v-btn
              color="error"
              prepend-icon="mdi-alert-circle"
              size="large"
              variant="outlined"
              @click="simulateError"
            >
              Fehler provozieren
            </v-btn>

            <v-btn
              color="secondary"
              variant="text"
              @click="loadingStore.hide()"
            >
              Alles zurücksetzen
            </v-btn>

          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="bg-grey-lighten-4 pa-4">
          <v-chip :color="loadingStore.loading ? 'info' : 'grey'" label>
            Status: {{ loadingStore.loading ? 'Lädt gerade...' : 'Bereit' }}
          </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { useLoadingStore } from '@/stores/loading'

  const loadingStore = useLoadingStore()

  // Simuliert einen erfolgreichen API-Aufruf
  async function simulateLoading () {
    loadingStore.show() // Aktiviert Balken im Header

    // Wir warten künstlich 3 Sekunden
    await new Promise(resolve => setTimeout(resolve, 3000))

    loadingStore.hide() // Deaktiviert Balken
  }

  // Simuliert einen Fehler (wie bei einer API-Antwort)
  function simulateError () {
    const dummyError = {
      response: {
        status: 404,
        data: { message: 'Die angeforderten Schützendaten wurden nicht gefunden!' },
      },
    }

    loadingStore.showError(dummyError)
  }
</script>
