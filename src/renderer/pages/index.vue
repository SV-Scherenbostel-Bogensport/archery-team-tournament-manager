<template>
  <v-container class="w-75">
    <div>
      <v-row class="mb-8 mt-4">
        <v-col>
          <h1 class="text-h4 font-weight-black">Turnier-Verwaltung</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" prepend-icon="mdi-plus" size="large" :to="`tournament/new`">
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

  async function connectToBackend () {
    try {
      // Simulation des Verbindungsaufbaus
      await new Promise(resolve => setTimeout(resolve, 100))
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

  function navigateToTournament (id: number) {
    router.push(`/tournament/${id}/control`)
  }

  onMounted(() => {
    connectToBackend()
  })
</script>
