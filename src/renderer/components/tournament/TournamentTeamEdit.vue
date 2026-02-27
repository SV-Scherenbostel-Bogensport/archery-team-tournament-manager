<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text class="pa-0">

      <v-row>

        <!-- ===== LINKE SEITE: Teams ===== -->
        <v-col cols="12" md="6">
          <v-card color="background" elevation="1" rounded="lg" variant="tonal">
            <v-card-title class="text-h6 text-secondary d-flex align-center justify-space-between">
              Teams
              <v-tooltip location="left">
                <template #activator="{ props }">
                  <v-btn
                    class="translate-x-2"
                    v-bind="props"
                    color="secondary"
                    icon="mdi-plus-circle-outline"
                    variant="text"
                  />
                </template>
                <template #default>
                  Neues Team hinzufügen
                  <v-icon class="ml-2" size="small">mdi-account-multiple-plus</v-icon>
                </template>
              </v-tooltip>
            </v-card-title>

            <div style="max-height: 50vh; overflow-y: auto;">
              <div class="d-flex flex-column ga-2 pa-3">
                <v-card
                  v-for="(team, index) in teams"
                  :key="team.id"
                  :class="['team-card cursor-pointer transition-swing pa-1', { selected: selectedTeam?.id === team.id }]"
                  :color="selectedTeam?.id === team.id ? 'secondary' : 'background'"
                  :elevation="selectedTeam?.id === team.id ? 1 : 0"
                  hover
                  style="cursor: pointer;"
                  :variant="selectedTeam?.id === team.id ? 'tonal' : 'elevated'"
                  @click="selectedTeam = selectedTeam?.id === team.id ? null : team"
                >
                  <div class="d-flex align-center">
                    <!-- Nr -->
                    <v-tooltip location="top" :text="team.id.toString()">
                      <template #activator="{ props }">
                        <span v-bind="props" class="text-secondary text-body-2 mx-4" style="min-width: 24px;">
                          #{{ index + 1 }}
                        </span>
                      </template>
                    </v-tooltip>

                    <!-- Teamname -->
                    <span class="text-body-1 grow" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
                      {{ team.name }}
                    </span>

                    <!-- Icons -->
                    <div class="d-flex align-center ga-1 ml-8">

                      <!-- Schützenanzahl -->
                      <v-tooltip location="top" :text="team.members.length + 'x Registrierte Schützen (voraus. 5)'">
                        <template #activator="{ props }">
                          <span v-bind="props" class="whitespace-nowrap text-grey-darken-1" style="cursor: default;">
                            {{ team.members.length }}x <v-icon color="grey-darken-1" size="small">mdi-account-group-outline</v-icon>
                          </span>
                        </template>
                      </v-tooltip>

                      <!-- E-Mail -->
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            class="ml-1 mr-4"
                            color="grey-darken-1"
                            icon="mdi-email-edit-outline"
                            size="small"
                            variant="text"
                            @click.stop="team.contactEmail && openMail(team.contactEmail)"
                          />
                        </template>
                        <template #default>
                          <div>E-Mail verfassen</div>
                          <div>
                            {{ team.contactEmail }}
                            <v-icon class="ml-2" size="small">mdi-arrow-top-right</v-icon>
                          </div>
                        </template>
                      </v-tooltip>

                      <!-- Startgeldinfo -->
                      <v-tooltip location="top" :text="team.tournamentRegistration.paymentDate ? 'Startgeld bezahlt' : 'Startgeld nicht bezahlt'">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            :color="team.tournamentRegistration.paymentDate ? 'success' : 'error'"
                            :icon="team.tournamentRegistration.paymentDate ? 'mdi-currency-eur' : 'mdi-currency-eur-off'"
                            size="small"
                            style="transition: color 0.3s ease;"
                            variant="text"
                            @click.stop="team.tournamentRegistration.paymentDate = team.tournamentRegistration.paymentDate ? null : new Date().toISOString()"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Anmeldung -->
                      <v-tooltip location="top" :text="team.tournamentRegistration.arrivalDate ? 'Angemeldet' : 'Nicht angemeldet'">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            class="mr-4"
                            :color="team.tournamentRegistration.arrivalDate ? 'success' : 'grey-darken-1'"
                            :icon="team.tournamentRegistration.arrivalDate ? 'mdi-check-circle' : 'mdi-close-circle'"
                            size="small"
                            style="transition: color 0.3s ease;"
                            variant="text"
                            @click.stop="team.tournamentRegistration.arrivalDate = team.tournamentRegistration.arrivalDate ? null : new Date().toISOString()"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Bearbeiten -->
                      <v-tooltip location="top" text="Bearbeiten">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            color="grey-darken-1"
                            icon="mdi-pencil-outline"
                            size="small"
                            variant="text"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Löschen -->
                      <v-tooltip location="top" text="Löschen">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            class="mr-4"
                            color="error"
                            icon="mdi-delete-outline"
                            size="small"
                            variant="text"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Anzeigen -->
                      <v-btn
                        color="secondary"
                        icon="mdi-arrow-top-right"
                        size="small"
                        variant="text"
                      />

                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- ===== RECHTE SEITE: Schützen ===== -->
        <v-col cols="12" md="6">
          <v-expand-x-transition>
            <v-card
              v-if="selectedTeam"
              color="background"
              elevation="1"
              rounded="lg"
              style="min-height: 100%;"
              variant="tonal"
            >
              <v-card-title class="text-h6 text-secondary d-flex align-center justify-space-between">
                {{ selectedTeam.name }}
                <v-tooltip location="left">
                  <template #activator="{ props }">
                    <v-btn
                      class="translate-x-2"
                      v-bind="props"
                      color="secondary"
                      icon="mdi-plus-circle-outline"
                      variant="text"
                    />
                  </template>
                  <template #default>
                    Schützen hinzufügen
                    <v-icon class="ml-2" size="small">mdi-account-plus</v-icon>
                  </template>
                </v-tooltip>
              </v-card-title>

              <div style="max-height: 50vh; overflow-y: auto;">
                <div class="d-flex flex-column ga-2 pa-3">
                  <v-card
                    v-for="(schuetze, i) in selectedTeam.members ?? []"
                    :key="i"
                    class="pa-1 team-card"
                    color="background"
                    hover
                    style="cursor: pointer;"
                    variant="outlined"
                  >
                    <div class="d-flex align-center px-2">
                      <span class="text-secondary text-body-2 mr-4">#{{ i + 1 }}</span>
                      <span class="text-body-1 grow">#{{ schuetze.number }} {{ schuetze.firstName }} {{ schuetze.lastName }}</span>
                    </div>
                  </v-card>

                  <v-card v-if="!selectedTeam.members?.length" class="pa-3" color="background" variant="outlined">
                    <div class="text-body-2 text-medium-emphasis text-center">
                      Keine Schützen eingetragen
                    </div>
                  </v-card>
                </div>
              </div>
            </v-card>

            <v-card
              v-else
              color="background"
              elevation="0"
              rounded="lg"
              style="min-height: 100%; border-style: dashed;"
              variant="outlined"
            >
              <div class="d-flex align-center justify-center" style="min-height: 200px;">
                <div class="text-center text-medium-emphasis">
                  <v-icon class="mb-2" size="48">mdi-account-group-outline</v-icon>
                  <div class="text-body-2">Team auswählen um Schützen zu sehen</div>
                </div>
              </div>
            </v-card>
          </v-expand-x-transition>
        </v-col>

      </v-row>

    </v-card-text>
  </v-card>

  <!-- ===== Team bearbeiten Dialog ===== -->
  <v-dialog max-width="480" persistent>
    <v-card color="surface-bright" rounded="lg">
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="secondary" icon="mdi-account-group" />
        Team bearbeiten
      </v-card-title>

      <v-card-text class="pa-4">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              clearable
              color="secondary"
              label="Teamname *"
              prepend-inner-icon="mdi-account-group"
              :rules="[v => !!v || 'Erforderlich.']"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              clearable
              color="secondary"
              label="Kontakt E-Mail"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-number-input
              clearable
              color="secondary"
              control-variant="default"
              label="Voraussichtliche Schützen"
              :max="100"
              :min="1"
              prepend-inner-icon="mdi-bow-arrow"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn color="grey" text="Abbrechen" variant="text" />
        <v-btn
          color="secondary"
          prepend-icon="mdi-check"
          text="Speichern"
          variant="tonal"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { TeamWithMembers } from '@/types'
  import { ref } from 'vue'

  defineEmits(['next'])
  const isValid = ref(true)
  defineExpose({ isValid })

  const selectedTeam = ref<TeamWithMembers | null>(null)

  const teams = reactive<TeamWithMembers[]>([
    {
      id: '1',
      name: 'Team Alpha',
      contactEmail: 'alpha@test.de',
      teamMemberCount: 3,
      tournamentRegistration: {
        registrationDate: '2025-03-01',
        paymentDate: '2025-03-05',
        arrivalDate: '2025-03-05',
      },
      members: [
        { id: '1', teamId: '1', number: 1, firstName: 'Max', lastName: 'Mustermann' },
        { id: '2', teamId: '1', number: 2, firstName: 'Erika', lastName: 'Musterfrau' },
        { id: '3', teamId: '1', number: 3, firstName: 'Hans', lastName: 'Schmidt' },
      ],
    },
    {
      id: '2',
      name: 'Team Bravo',
      contactEmail: 'bravo@test.de',
      teamMemberCount: 2,
      tournamentRegistration: {
        registrationDate: '2025-03-02',
        paymentDate: null,
        arrivalDate: null,
      },
      members: [
        { id: '4', teamId: '2', number: 1, firstName: 'Lisa', lastName: 'Meier' },
        { id: '5', teamId: '2', number: 2, firstName: 'Klaus', lastName: 'Weber' },
      ],
    },
    {
      id: '3',
      name: 'Team Charlie',
      contactEmail: null,
      teamMemberCount: 0,
      tournamentRegistration: {
        registrationDate: '2025-03-03',
        paymentDate: null,
        arrivalDate: null,
      },
      members: [],
    },
    {
      id: '4',
      name: 'Team Delta',
      contactEmail: null,
      teamMemberCount: 0,
      tournamentRegistration: {
        registrationDate: '2025-03-03',
        paymentDate: null,
        arrivalDate: '2025-03-05',
      },
      members: [],
    },
  ])

  function openMail (email: string) {
    const a = document.createElement('a')
    a.href = `mailto:${email}`
    a.click()
  }

</script>

<style scoped>
.team-card {
  outline: 2px solid transparent;
  transition: outline-color 0.2s ease;
}
.team-card:hover {
  outline-color: rgba(var(--v-theme-secondary), 0.4);
}
.team-card.selected {
  outline-color: rgba(var(--v-theme-secondary), 0.9);
}
</style>
