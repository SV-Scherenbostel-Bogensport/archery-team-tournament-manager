<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text>

      <v-form ref="form" v-model="isValid">

        <h3 class="text-h6 mb-4 text-secondary d-flex align-center">
          Wettkampfmodus
        </h3>

        <p class="text-body-2 text-medium-emphasis mb-6">
          Wähle den Modus aus, nach dem das Turnier ausgetragen wird.
        </p>

        <v-row dense>

          <v-col
            v-for="mode in competitionModes"
            :key="mode.value"
            cols="12"
          >
            <v-card
              class="mode-card pa-5 cursor-pointer transition-swing my-1"
              :color="store.competition.mode === mode.value ? 'secondary' : 'grey'"
              :elevation="store.competition.mode === mode.value ? 1 : 0"
              rounded="lg"
              :variant="store.competition.mode === mode.value ? 'tonal' : 'outlined'"
              @click="toggleMode(mode.value)"
            >
              <div class="d-flex align-center ga-5">
                <v-icon
                  :color="store.competition.mode === mode.value ? 'secondary' : 'grey'"
                  :icon="mode.icon"
                  size="36"
                />
                <div class="grow">
                  <div class="text-subtitle-1 font-weight-bold">
                    {{ mode.label }}
                  </div>
                  <div class="text-caption text-medium-emphasis mt-1">
                    {{ mode.description }}
                  </div>
                </div>
                <v-icon
                  v-if="store.competition.mode === mode.value"
                  color="secondary"
                  icon="mdi-check-circle"
                  size="28"
                />
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-expand-transition>
          <div v-if="!isValid">
            <div class="pt-4 px-1 text-caption text-info d-flex align-center">
              <v-icon class="mr-1 mb-0.5" icon="mdi-alert-circle" size="18" />
              Bitte wähle einen Wettkampfmodus aus.
            </div>
          </div>
        </v-expand-transition>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useTournamentStore } from '@/stores/tournamentStore'

  const store = useTournamentStore()

  const isValid = computed(() => {
    return !!store.competition.mode
  })

  defineExpose({
    isValid,
  })

  defineEmits(['next'])

  store.competition.mode = 'wedemark-team-open'

  const competitionModes = [
    // {
    //   value: 'liga-dsb',
    //   label: 'Liga DSB',
    //   icon: 'mdi-tournament',
    //   description: 'Offizieller Ligabetrieb nach DSB-Regelwerk. Geeignet für Verbandswettbewerbe.',
    // },
    {
      value: 'wedemark-team-open',
      label: 'Wedemark-Team-Open',
      icon: 'mdi-account-group-outline',
      description: 'Teamwettbewerb im Wedemark-Format. Ideal für offene Vereinsturniere.',
    },
  ]

  function toggleMode (value: string) {
    store.competition.mode = store.competition.mode === value ? null : value
  }
</script>

<style scoped>
.mode-card {
  border: 2px solid;
  transition: all 0.2s ease;
}

.mode-card:hover {
  border-color: rgb(var(--v-theme-secondary), 0.4);
}
</style>
