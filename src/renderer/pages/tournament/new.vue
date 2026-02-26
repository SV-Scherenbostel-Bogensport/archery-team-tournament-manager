<template>
  <v-container class="pt-0">
    <h1 class="text-2xl my-10 font-medium">Turnier erstellen</h1>
    <v-stepper v-model="activeStep" :items="stepLabels">
      <template #item.1>
        <TournamentGeneralDataEdit ref="step1Ref" />
      </template>
      <template #item.2>
        <TournamentModeSelection ref="step2Ref" />
      </template>
      <template #item.3>
        <TournamentTeamEdit ref="step3Ref" />
      </template>
      <template #item.4>
        <TournamentCreationOverview ref="step4Ref" />
      </template>

      <template #actions>
        <v-divider />
        <v-card-actions class="px-6 py-4">

          <!-- Abbrechen Button (immer sichtbar) -->
          <v-btn
            v-if="activeStep === 1"
            color="error"
            variant="outlined"
            @click="showCancelDialog = true"
          >
            <span class="px-1">Abbrechen</span>
          </v-btn>

          <!-- Zurück Button -->
          <v-btn
            v-if="activeStep > 1"
            color="primary"
            variant="text"
            @click="activeStep--"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            <span class="px-1">Zurück</span>
          </v-btn>

          <v-spacer />

          <!-- Überspringen Button (nur bei Steps 2 & 3) -->
          <v-btn
            v-if="activeStep === 2 || activeStep === 3"
            color="primary"
            variant="outlined"
            @click="activeStep++"
          >
            <span class="px-1">Überspringen</span>
          </v-btn>

          <!-- Weiter Button (Steps 1-3) -->
          <v-btn
            v-if="activeStep < 4"
            color="primary"
            :disabled="!canProceed"
            variant="elevated"
            @click="activeStep++"
          >
            <span class="px-1">Weiter</span>
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>

          <!-- Turnier erstellen Button (Step 4) -->
          <v-btn
            v-else
            color="success"
            :disabled="!canProceed"
            variant="elevated"
            @click="createTournament"
          >
            <span class="px-1">Turnier erstellen</span>
            <v-icon end>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
    </v-stepper>

    <v-dialog v-model="showCancelDialog" max-width="490">
      <v-card
        text="Möchten Sie wirklich die Turniererstellung abbrechen? Alle Änderungen gehen verloren."
        title="Turniererstellung abbrechen?"
      >

        <v-card-actions>
          <v-spacer />
          <v-btn @click="showCancelDialog = false">
            Weiter erstellen
          </v-btn>
          <v-btn color="error" @click="confirmCancel">
            Erstellung abbrechen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import TournamentGeneralDataEdit from '@/components/tournament/TournamentGeneralDataEdit.vue'
  import TournamentModeSelection from '@/components/tournament/TournamentModeSelection.vue'

  const router = useRouter()
  const activeStep = ref(1)
  const stepLabels = [
    'Turnierdaten eingeben',
    'Modus festlegen',
    'Teams & Teilnehmer hinzufügen',
    'Erstellung abschließen',
  ]

  // Refs für alle Steps
  const step1Ref = ref()
  const step2Ref = ref()
  const step3Ref = ref()
  const step4Ref = ref()

  // Prüft, ob der aktuelle Step valid ist
  const canProceed = computed(() => {
    switch (activeStep.value) {
      case 1: {
        return step1Ref.value?.isValid ?? false
      }
      case 2: {
        return step2Ref.value?.isValid ?? false
      }
      case 3: {
        return step3Ref.value?.isValid ?? false
      }
      case 4: {
        return step4Ref.value?.isValid ?? true
      }
      default: {
        return false
      }
    }
  })

  const showCancelDialog = ref(false)

  function confirmCancel () {
    router.push('/')
  }

  function createTournament () {
    alert('Turnier wird erstellt!')
  }

</script>
