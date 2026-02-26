<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text>

      <h3 class="text-h6 mb-1 text-secondary d-flex align-center ga-2">
        <v-icon icon="mdi-check-circle-outline" />
        Erstellung abschließen
      </h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Bitte überprüfe alle Angaben vor der Erstellung.
      </p>

      <v-row dense>

        <!-- ── Grundinformationen ── -->
        <v-col cols="12" md="6">
          <v-card border class="pa-4 h-100" flat rounded="lg">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="secondary" icon="mdi-trophy" size="20" />
              <span class="text-subtitle-2 font-weight-bold">Grundinformationen</span>
            </div>
            <v-list class="pa-0" density="compact">
              <SummaryRow icon="mdi-trophy" label="Name" :value="store.general.name" />
              <SummaryRow icon="mdi-calendar" label="Datum" :value="formattedDate" />
              <SummaryRow icon="mdi-clock-outline" label="Startzeit" :value="store.general.startTime!" />
              <SummaryRow icon="mdi-map-marker-radius" label="Ort" :value="store.general.location" />
              <SummaryRow icon="mdi-map-marker" label="Adresse" :value="store.general.address" />
              <SummaryRow icon="mdi-text" label="Beschreibung" :value="store.general.description" />
            </v-list>
          </v-card>
        </v-col>

        <!-- ── Anmeldung ── -->
        <v-col cols="12" md="6">
          <v-card border class="pa-4 h-100" flat rounded="lg">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="secondary" icon="mdi-clipboard-list-outline" size="20" />
              <span class="text-subtitle-2 font-weight-bold">Anmeldung</span>
            </div>
            <v-list class="pa-0" density="compact">
              <SummaryRow icon="mdi-email" label="E-Mail" :value="store.general.email" />
              <SummaryRow icon="mdi-account-group" label="Max. Startplätze" :value="store.general.maxSlots?.toString()" />
              <SummaryRow icon="mdi-calendar-alert" label="Anmeldeschluss" :value="formattedDeadline" />
              <v-list-item class="px-0">
                <template #prepend>
                  <v-icon class="mr-2" color="secondary" icon="mdi-check-circle" size="18" />
                </template>
                <v-list-item-title class="text-caption text-medium-emphasis">Anmeldungen</v-list-item-title>
                <template #append>
                  <v-chip
                    :color="store.general.allowRegistration ? 'success' : 'grey'"
                    density="compact"
                    size="x-small"
                    variant="tonal"
                  >
                    {{ store.general.allowRegistration ? 'Erlaubt' : 'Gesperrt' }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- ── Wettkampfmodus ── -->
        <v-col cols="12" md="6">
          <v-card border class="pa-4 h-100" flat rounded="lg">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="secondary" icon="mdi-tournament" size="20" />
              <span class="text-subtitle-2 font-weight-bold">Wettkampfmodus</span>
            </div>
            <v-list class="pa-0" density="compact">
              <SummaryRow icon="mdi-tournament" label="Modus" :value="competitionModeLabel" />
            </v-list>
          </v-card>
        </v-col>

        <!-- ── Dokumente & Design ── -->
        <v-col cols="12" md="6">
          <v-card border class="pa-4 h-100" flat rounded="lg">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="secondary" icon="mdi-palette-outline" size="20" />
              <span class="text-subtitle-2 font-weight-bold">Design & Dokumente</span>
            </div>
            <v-list class="pa-0" density="compact">
              <v-list-item class="px-0">
                <template #prepend>
                  <v-icon class="mr-2" :color="store.general.primaryColor || 'grey'" icon="mdi-circle" size="18" />
                </template>
                <v-list-item-title class="text-caption text-medium-emphasis">Primärfarbe</v-list-item-title>
                <template #append>
                  <span class="text-body-2">{{ store.general.primaryColor || '—' }}</span>
                </template>
              </v-list-item>
              <v-list-item class="px-0">
                <template #prepend>
                  <v-icon class="mr-2" :color="store.general.secondaryColor || 'grey'" icon="mdi-circle" size="18" />
                </template>
                <v-list-item-title class="text-caption text-medium-emphasis">Sekundärfarbe</v-list-item-title>
                <template #append>
                  <span class="text-body-2">{{ store.general.secondaryColor || '—' }}</span>
                </template>
              </v-list-item>
              <v-list-item class="px-0">
                <template #prepend>
                  <v-icon class="mr-2" color="secondary" icon="mdi-file-document-outline" size="18" />
                </template>
                <v-list-item-title class="text-caption text-medium-emphasis">Dokumente</v-list-item-title>
                <template #append>
                  <span class="text-body-2">{{ store.general.documents.length }} Datei(en)</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- ── Teams & Schützen ── -->
        <v-col cols="12">
          <v-card border class="pa-4" flat rounded="lg">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="secondary" icon="mdi-account-group" size="20" />
              <span class="text-subtitle-2 font-weight-bold">
                Teams & Schützen
                <v-chip
                  class="ml-2"
                  color="secondary"
                  density="compact"
                  size="x-small"
                  variant="tonal"
                >
                  {{ store.teamsWithMembers.length }}
                </v-chip>
              </span>
            </div>

            <div v-if="store.teamsWithMembers.length === 0" class="text-caption text-medium-emphasis">
              Keine Teams hinzugefügt.
            </div>

            <v-row v-else dense>
              <v-col
                v-for="team in store.teamsWithMembers"
                :key="team.localId"
                cols="12"
                md="4"
                sm="6"
              >
                <v-card border class="pa-3" flat rounded="lg">
                  <div class="d-flex align-center ga-2 mb-2">
                    <v-icon color="secondary" icon="mdi-account-group-outline" size="16" />
                    <span class="text-body-2 font-weight-bold">{{ team.name }}</span>
                  </div>
                  <div v-if="team.contactEmail" class="text-caption text-medium-emphasis mb-1">
                    <v-icon class="mr-1" size="12">mdi-email-outline</v-icon>
                    {{ team.contactEmail }}
                  </div>
                  <div v-if="team.members.length === 0" class="text-caption text-medium-emphasis">
                    Keine Schützen
                  </div>
                  <div v-else>
                    <div
                      v-for="member in team.members"
                      :key="member.id"
                      class="text-caption d-flex align-center ga-1 py-0-5"
                    >
                      <span class="text-medium-emphasis">#{{ member.number }}</span>
                      {{ member.firstName }} {{ member.lastName }}
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

      </v-row>

      <!-- Fehler -->
      <v-alert
        v-if="error"
        class="mt-4"
        closable
        :text="error"
        type="error"
        variant="tonal"
        @click:close="error = null"
      />

    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, defineComponent, h, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTournamentStore } from '@/stores/tournamentStore'

  const store = useTournamentStore()
  const router = useRouter()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  defineExpose({ isLoading, submit })

  // ── Formatierungen ─────────────────────────────────
  const formattedDate = computed(() => {
    if (!store.general.date) return undefined
    return new Date(store.general.date).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  })

  const formattedDeadline = computed(() => {
    if (!store.general.registrationDeadline) return undefined
    return new Date(store.general.registrationDeadline).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  })

  const competitionModeLabels: Record<string, string> = {
    'liga-dsb': 'Liga DSB',
    'wedemark-team-open': 'Wedemark-Team-Open',
  }

  const competitionModeLabel = computed(() =>
    store.competition.mode ? competitionModeLabels[store.competition.mode] ?? store.competition.mode : undefined,
  )

  // ── Erstellen ──────────────────────────────────────
  async function submit () {
    isLoading.value = true
    error.value = null
    try {
      const id = await store.createTournament()
      await router.push(`/tournament/${id}`)
    } catch (error_: any) {
      error.value = error_?.message ?? 'Ein unbekannter Fehler ist aufgetreten.'
    } finally {
      isLoading.value = false
    }
  }

  // ── Hilfskomponente für Zeilen ─────────────────────
  const SummaryRow = defineComponent({
    props: {
      icon: String,
      label: String,
      value: String,
    },
    setup (props) {
      return () => props.value
        ? h('v-list-item', { class: 'px-0' }, {
          prepend: () => h('v-icon', { class: 'mr-2', icon: props.icon, size: 18, color: 'secondary' }),
          default: () => h('v-list-item-title', { class: 'text-caption text-medium-emphasis' }, props.label),
          append: () => h('span', { class: 'text-body-2' }, props.value),
        })
        : null
    },
  })
</script>
