<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text>

      <h3 class="text-h6 mb-1 text-secondary d-flex align-center">
        Zusammenfassung
      </h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Überprüfe alle Angaben bevor du das Turnier erstellst.
      </p>

      <!-- ===== Grundinformationen ===== -->
      <v-card
        class="mb-4"
        color="background"
        elevation="1"
        rounded="lg"
        variant="tonal"
      >
        <v-card-title class="text-subtitle-1 text-secondary d-flex align-center justify-space-between py-3 px-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-information-outline" size="20" />
            Grundinformationen
          </div>
          <v-btn
            color="secondary"
            density="compact"
            icon="mdi-pencil-outline"
            variant="text"
            @click="$emit('edit-step', 0)"
          />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-row dense>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-trophy"
                label="Turniername"
                :value="store.general.name ?? undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-calendar"
                label="Datum"
                :value="formattedDate ?? undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-clock-outline"
                label="Startzeit"
                :value="store.general.startTime ?? undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-map-marker-radius"
                label="Austragungsort"
                :value="store.general.location ?? undefined"
              />
            </v-col>
            <v-col v-if="store.general.address" cols="12" sm="6">
              <OverviewField
                icon="mdi-map-marker"
                label="Adresse"
                :value="store.general.address ?? undefined"
              />
            </v-col>
            <v-col v-if="store.general.description" cols="12">
              <OverviewField
                icon="mdi-text"
                label="Beschreibung"
                :value="store.general.description ?? undefined"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- ===== Anmeldung ===== -->
      <v-card
        class="mb-4"
        color="background"
        elevation="1"
        rounded="lg"
        variant="tonal"
      >
        <v-card-title class="text-subtitle-1 text-secondary d-flex align-center justify-space-between py-3 px-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-clipboard-list-outline" size="20" />
            Anmeldung
          </div>
          <v-btn
            color="secondary"
            density="compact"
            icon="mdi-pencil-outline"
            variant="text"
            @click="$emit('edit-step', 0)"
          />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-row dense>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-email"
                label="Kontakt E-Mail"
                :value="store.general.email ?? undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-account-group"
                label="Max. Startplätze"
                :value="store.general.maxSlots ? String(store.general.maxSlots) : undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <OverviewField
                icon="mdi-calendar-alert"
                label="Anmeldeschluss"
                :value="formattedDeadline ?? undefined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="d-flex align-center ga-3 pa-2">
                <v-icon color="secondary" icon="mdi-account-check-outline" size="20" />
                <div>
                  <div class="text-caption text-medium-emphasis">Anmeldungen</div>
                  <v-chip
                    class="mt-1"
                    :color="store.general.allowRegistration ? 'success' : 'grey'"
                    density="compact"
                    :prepend-icon="store.general.allowRegistration ? 'mdi-check' : 'mdi-close'"
                    :text="store.general.allowRegistration ? 'Erlaubt' : 'Gesperrt'"
                    variant="tonal"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- ===== Teams & Schützen ===== -->
      <v-card
        class="mb-4"
        color="background"
        elevation="1"
        rounded="lg"
        variant="tonal"
      >
        <v-card-title class="text-subtitle-1 text-secondary d-flex align-center justify-space-between py-3 px-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-account-group-outline" size="20" />
            Teams & Schützen
          </div>
          <v-btn
            color="secondary"
            density="compact"
            icon="mdi-pencil-outline"
            variant="text"
            @click="$emit('edit-step', 1)"
          />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-row class="mb-3" dense>
            <v-col cols="6" sm="3">
              <v-card class="text-center pa-3" color="secondary" rounded="lg" variant="tonal">
                <div class="text-h5 font-weight-bold text-secondary">{{ teamCount }}</div>
                <div class="text-caption text-medium-emphasis mt-1">Teams</div>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card class="text-center pa-3" color="secondary" rounded="lg" variant="tonal">
                <div class="text-h5 font-weight-bold text-secondary">{{ memberCount }}</div>
                <div class="text-caption text-medium-emphasis mt-1">Schützen</div>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card class="text-center pa-3" color="success" rounded="lg" variant="tonal">
                <div class="text-h5 font-weight-bold text-success">{{ paidCount }}</div>
                <div class="text-caption text-medium-emphasis mt-1">Bezahlt</div>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card class="text-center pa-3" color="success" rounded="lg" variant="tonal">
                <div class="text-h5 font-weight-bold text-success">{{ arrivedCount }}</div>
                <div class="text-caption text-medium-emphasis mt-1">Angemeldet</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Team-Liste kompakt -->
          <div v-if="store.teams.length > 0" class="d-flex flex-column ga-1 mt-2">
            <div
              v-for="team in store.teams"
              :key="team.id"
              class="d-flex align-center ga-3 pa-2 rounded"
              style="background: rgba(var(--v-theme-secondary), 0.04);"
            >
              <v-icon color="secondary" icon="mdi-account-group" size="16" />
              <span class="text-body-2 grow">{{ team.name }}</span>
              <span class="text-caption text-medium-emphasis">{{ team.members.length }}x <v-icon size="12">mdi-account</v-icon></span>
              <v-icon
                :color="team.tournamentRegistration.paymentDate ? 'success' : 'error'"
                :icon="team.tournamentRegistration.paymentDate ? 'mdi-currency-eur' : 'mdi-currency-eur-off'"
                size="16"
              />
              <v-icon
                :color="team.tournamentRegistration.arrivalDate ? 'success' : 'grey'"
                :icon="team.tournamentRegistration.arrivalDate ? 'mdi-check-circle' : 'mdi-close-circle'"
                size="16"
              />
            </div>
          </div>
          <div v-else class="text-body-2 text-medium-emphasis text-center pa-4">
            Keine Teams eingetragen
          </div>
        </v-card-text>
      </v-card>

      <!-- ===== Wettkampfmodus ===== -->
      <v-card
        class="mb-4"
        color="background"
        elevation="1"
        rounded="lg"
        variant="tonal"
      >
        <v-card-title class="text-subtitle-1 text-secondary d-flex align-center justify-space-between py-3 px-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-tournament" size="20" />
            Wettkampfmodus
          </div>
          <v-btn
            color="secondary"
            density="compact"
            icon="mdi-pencil-outline"
            variant="text"
            @click="$emit('edit-step', 2)"
          />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <div v-if="selectedMode" class="d-flex align-center ga-4 pa-2">
            <v-icon color="secondary" :icon="selectedMode.icon" size="32" />
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ selectedMode.label }}</div>
              <div class="text-caption text-medium-emphasis mt-1">{{ selectedMode.description }}</div>
            </div>
            <v-spacer />
            <v-icon color="secondary" icon="mdi-check-circle" size="24" />
          </div>
          <div v-else class="text-body-2 text-medium-emphasis text-center pa-4">
            Kein Modus gewählt
          </div>
        </v-card-text>
      </v-card>

      <!-- ===== Dokumente ===== -->
      <v-card
        v-if="store.general.documents?.length > 0"
        class="mb-4"
        color="background"
        elevation="1"
        rounded="lg"
        variant="tonal"
      >
        <v-card-title class="text-subtitle-1 text-secondary d-flex align-center justify-space-between py-3 px-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-paperclip" size="20" />
            Dokumente
          </div>
          <v-btn
            color="secondary"
            density="compact"
            icon="mdi-pencil-outline"
            variant="text"
            @click="$emit('edit-step', 0)"
          />
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-2">
          <v-list density="compact">
            <v-list-item
              v-for="(doc, i) in store.general.documents"
              :key="i"
              :prepend-icon="getFileIcon(doc.name)"
              :subtitle="formatFileSize(doc.size)"
              :title="doc.name"
            />
          </v-list>
        </v-card-text>
      </v-card>

      <!-- ===== Validierungsfehler ===== -->
      <v-expand-transition>
        <div v-if="validationErrors.length > 0" class="mt-2">
          <v-alert
            class="mb-2"
            color="warning"
            density="compact"
            icon="mdi-alert-circle-outline"
            rounded="lg"
            variant="tonal"
          >
            <div class="text-subtitle-2 mb-1">Bitte prüfe folgende Punkte:</div>
            <ul class="text-body-2 pl-4">
              <li v-for="(err, i) in validationErrors" :key="i">{{ err }}</li>
            </ul>
          </v-alert>
        </div>
      </v-expand-transition>

    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import OverviewField from '@/components/tournament/OverviewField.vue'
  import { useTournamentStore } from '@/stores/tournamentStore'

  const store = useTournamentStore()

  defineEmits(['edit-step'])

  // Expose isValid for parent stepper
  const isValid = computed(() => validationErrors.value.length === 0)
  defineExpose({ isValid })

  // ===== Computed: Formatierungen =====
  const formattedDate = computed(() => {
    if (!store.general.date) return null
    return new Date(store.general.date).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  })

  const formattedDeadline = computed(() => {
    if (!store.general.registrationDeadline) return null
    return new Date(store.general.registrationDeadline).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  })

  // ===== Computed: Team-Statistiken =====
  const teamCount = computed(() => store.teams?.length ?? 0)
  const memberCount = computed(() => store.teams?.reduce((acc: number, t: any) => acc + (t.members?.length ?? 0), 0) ?? 0)
  const paidCount = computed(() => store.teams?.filter((t: any) => t.tournamentRegistration.paymentDate).length ?? 0)
  const arrivedCount = computed(() => store.teams?.filter((t: any) => t.tournamentRegistration.arrivalDate).length ?? 0)

  // ===== Computed: Modus =====
  const competitionModes = [
    {
      value: 'wedemark-team-open',
      label: 'Wedemark-Team-Open',
      icon: 'mdi-account-group-outline',
      description: 'Teamwettbewerb im Wedemark-Format. Ideal für offene Vereinsturniere.',
    },
  ]

  const selectedMode = computed(() =>
    competitionModes.find(m => m.value === store.competition.mode) ?? null,
  )

  // ===== Validierung =====
  const validationErrors = computed(() => {
    const errors: string[] = []
    if (!store.general.name) errors.push('Turniername fehlt.')
    if (!store.general.date) errors.push('Turnierdatum fehlt.')
    if (store.general.allowRegistration && !store.general.email) errors.push('Kontakt-E-Mail fehlt (Anmeldungen sind aktiviert).')
    if (!store.competition.mode) errors.push('Kein Wettkampfmodus ausgewählt.')
    return errors
  })

  // ===== Hilfsfunktionen (identisch zu Step 1) =====
  function getFileIcon (fileName: string) {
    const name = fileName.toLowerCase()
    if (name.endsWith('.pdf')) return 'mdi-file-pdf-box'
    if (name.endsWith('.docx') || name.endsWith('.doc')) return 'mdi-file-word-box'
    if (name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) return 'mdi-file-excel-box'
    if (name.endsWith('.pptx') || name.endsWith('.ppt')) return 'mdi-file-powerpoint-box'
    if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'].some(ext => name.endsWith(ext))) return 'mdi-file-image'
    return 'mdi-file-document-outline'
  }

  function formatFileSize (bytes: number) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
</script>
