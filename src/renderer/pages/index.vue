<template>
  <v-container class="w-75">
    <div>
      <v-row class="mb-8 mt-4">
        <v-col>
          <h1 class="text-h4 font-weight-black">Turnier-Verwaltung</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" prepend-icon="mdi-plus" size="large" @click="showCreateDialog = true">
            Neues Turnier
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="tournaments.length > 0" no-gutters>
        <v-col v-for="tournament in tournaments" :key="tournament.id" cols="12">
          <TournamentCard
            v-bind="tournament"
            @click="navigateToTournament(tournament.id)"
          />
        </v-col>
      </v-row>

      <v-alert
        v-else
        class="rounded-xl mt-10"
        text="Es wurden noch keine Turniere in der Datenbank gefunden."
        title="Keine Turniere"
        type="info"
        variant="tonal"
      >
        <template #append>
          <v-btn variant="text" @click="showCreateDialog = true">Jetzt erstellen</v-btn>
        </template>
      </v-alert>
    </div>

    <v-dialog v-model="showCreateDialog" max-width="500px" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">Neues Turnier anlegen</v-card-title>
        <v-card-text class="pa-6 pt-0">
          <v-text-field
            v-model="newTournament.name"
            label="Turniername"
            placeholder="z.B. Scherenbostel Open"
            prepend-inner-icon="mdi-trophy-outline"
            variant="outlined"
          />
          <v-text-field
            v-model="newTournament.location"
            label="Austragungsort"
            prepend-inner-icon="mdi-map-marker-outline"
            variant="outlined"
          />
          <v-text-field
            v-model="newTournament.date"
            label="Datum"
            prepend-inner-icon="mdi-calendar"
            type="date"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn variant="text" @click="showCreateDialog = false">Abbrechen</v-btn>
          <v-btn color="primary" rounded="lg" variant="elevated" @click="addTournament">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import TournamentCard from '@/components/TournamentCard.vue'

  const router = useRouter()

  // States
  const isConnected = ref(false)
  const showCreateDialog = ref(false)
  const tournaments = ref<any[]>([])

  const newTournament = ref({
    name: '',
    location: 'Scherenbostel',
    date: new Date().toISOString().slice(0, 10),
  })

  async function connectToBackend () {
    try {
      // Simulation des Verbindungsaufbaus
      await new Promise(resolve => setTimeout(resolve, 1))
      isConnected.value = true
      loadTournaments()
    } catch (error) {
      console.error('Verbindung fehlgeschlagen', error)
    }
  }

  function loadTournaments () {
    // Demo-Daten passend zur spektakulären Card
    tournaments.value = [
      {
        id: 1,
        name: 'Scherenbostel Open 2026',
        location: 'Wedemark',
        date: '2026-05-12',
        status: 'geplant',
        currentParticipants: 84,
        maxParticipants: 100,
        banner: 'https://images.unsplash.com/photo-1511193311914-0346f16bee90?q=80&w=1000',
      },
      {
        id: 2,
        name: 'Vereinsmeisterschaft',
        location: 'Schießstand',
        date: '2026-08-20',
        status: 'laufend',
        currentParticipants: 12,
        maxParticipants: 24,
        banner: 'https://images.unsplash.com/photo-1580130718746-9f68744005f9?q=80&w=1000',
      },
    ]
  }

  function addTournament () {
    if (newTournament.value.name) {
      const id = tournaments.value.length + 1
      tournaments.value.push({
        id,
        ...newTournament.value,
        status: 'geplant',
        currentParticipants: 0,
        maxParticipants: 100,
      })
      showCreateDialog.value = false
      newTournament.value.name = ''
    }
  }

  function navigateToTournament (id: number) {
    router.push(`/tournament/${id}/control`)
  }

  onMounted(() => {
    connectToBackend()
  })
</script>
