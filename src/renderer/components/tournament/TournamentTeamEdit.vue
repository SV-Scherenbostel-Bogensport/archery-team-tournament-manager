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
                    @click="openTeamDialog()"
                  />
                </template>
                <template #default>
                  Neues Team hinzufügen
                  <v-icon class="ml-2" size="small">mdi-account-multiple-plus</v-icon>
                </template>
              </v-tooltip>
            </v-card-title>

            <div style="max-height: 50vh; overflow-y: auto;">
              <div v-if="store.teams.length > 0" class="d-flex flex-column ga-2 pa-3">
                <v-card
                  v-for="(team, index) in store.teams"
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
                      <!-- Notiz -->
                      <v-tooltip v-if="team.tournamentRegistration.note" location="top" :text="team.tournamentRegistration.note">
                        <template #activator="{ props }">
                          <v-icon
                            class="ml-4"
                            v-bind="props"
                            color="grey-darken-1"
                            icon="mdi-note-text"
                            size="small"
                          />
                        </template>
                      </v-tooltip>
                    </span>

                    <!-- Icons -->
                    <div class="d-flex align-center ga-1 ml-8">

                      <!-- Schützenanzahl -->
                      <v-tooltip location="top" :text="`${team.members.length}x Registrierte Schützen (voraus. ${team.expectedMembers ?? 'k.A.'})`">
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
                            :icon="team.contactEmail ? 'mdi-email-edit-outline' : 'mdi-email-off-outline'"
                            size="small"
                            variant="text"
                            @click.stop="team.contactEmail && openMail(team.contactEmail)"
                          />
                        </template>
                        <template #default>
                          <template v-if="team.contactEmail">
                            <div>E-Mail verfassen</div>
                            <div>
                              {{ team.contactEmail }}
                              <v-icon class="ml-2" size="small">mdi-arrow-top-right</v-icon>
                            </div>
                          </template>
                          <template v-else>
                            <div>Keine E-Mail hinterlegt</div>
                          </template>
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
                            @click.stop="openTeamDialog(team)"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Löschen -->
                      <v-tooltip location="top" text="Löschen">
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            color="error"
                            icon="mdi-delete-outline"
                            size="small"
                            variant="text"
                            @click.stop="openDeleteTeamDialog(team)"
                          />
                        </template>
                      </v-tooltip>

                      <!-- Anzeigen (später)-->
                      <!-- <v-btn
                        class="ml-4"
                        color="secondary"
                        icon="mdi-arrow-top-right"
                        size="small"
                        variant="text"
                      /> -->

                    </div>
                  </div>
                </v-card>
              </div>

              <div v-else class="d-flex flex-column align-center justify-center pa-8 text-medium-emphasis">
                <v-icon class="mb-2" size="48">mdi-account-group</v-icon>
                <div class="text-body-2">Keine Teams eingetragen</div>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- ===== RECHTE SEITE: Schützen ===== -->
        <v-col cols="12" md="6">
          <v-card
            color="background"
            elevation="1"
            rounded="lg"
            variant="tonal"
          >
            <v-card-title class="text-h6 text-secondary d-flex align-center justify-space-between">
              Schützen
              <v-tooltip location="left">
                <template #activator="{ props }">
                  <v-btn
                    class="translate-x-2"
                    v-bind="props"
                    color="secondary"
                    :disabled="selectedTeam == null"
                    icon="mdi-plus-circle-outline"
                    variant="text"
                    @click="openMemberDialog()"
                  />
                </template>
                <template #default>
                  Neues Schützen anlegen
                  <v-icon class="ml-2" size="small">mdi-account-plus</v-icon>
                </template>
              </v-tooltip>
            </v-card-title>

            <div style="max-height: 50vh; overflow-y: auto;">
              <!-- Kein Team ausgewählt -->
              <div v-if="!selectedTeam" class="d-flex flex-column align-center justify-center pa-8 text-medium-emphasis">
                <v-icon class="mb-2" size="48">mdi-cursor-default-click</v-icon>
                <div class="text-body-2">Team auswählen um Schützen zu sehen</div>
              </div>

              <!-- Team ausgewählt -->
              <template v-else>
                <div v-if="selectedTeam.members?.length" class="d-flex flex-column ga-2 pa-3">
                  <v-card
                    v-for="(member) in sortedMembers"
                    :key="member.id"
                    class="pa-1 team-card"
                    color="background"
                    style="cursor: pointer;"
                    variant="elevated"
                  >
                    <div class="d-flex align-center">
                      <!-- Nr -->
                      <span class="text-secondary text-body-2 mx-4" style="min-width: 24px;">
                        #{{ member.number }}
                      </span>

                      <!-- Teamname -->
                      <span class="text-body-1 grow" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
                        {{ member.firstName }} {{ member.lastName }}
                      </span>

                      <!-- Icons -->
                      <div class="d-flex align-center ga-1 ml-8">

                        <!-- Bearbeiten -->
                        <v-tooltip location="top" text="Bearbeiten">
                          <template #activator="{ props }">
                            <v-btn
                              v-bind="props"
                              color="grey-darken-1"
                              icon="mdi-pencil-outline"
                              size="small"
                              variant="text"
                              @click.stop="openMemberDialog(member)"
                            />
                          </template>
                        </v-tooltip>

                        <!-- Löschen -->
                        <v-tooltip location="top" text="Löschen">
                          <template #activator="{ props }">
                            <v-btn
                              v-bind="props"
                              color="error"
                              icon="mdi-delete-outline"
                              size="small"
                              variant="text"
                              @click.stop="openDeleteMemberDialog(member)"
                            />
                          </template>
                        </v-tooltip>

                      <!-- Anzeigen (später)-->
                      <!-- <v-btn
                        class="ml-4"
                        color="secondary"
                        icon="mdi-arrow-top-right"
                        size="small"
                        variant="text"
                      /> -->

                      </div>
                    </div>
                  </v-card>

                </div>

                <!-- Team hat keine Schützen -->
                <div v-else class="d-flex flex-column align-center justify-center pa-8 text-medium-emphasis">
                  <v-icon class="mb-2" size="48">mdi-account-off</v-icon>
                  <div class="text-body-2">Keine Schützen eingetragen</div>
                </div>
              </template>
            </div>
          </v-card>
        </v-col>

      </v-row>

    </v-card-text>
  </v-card>

  <!-- ===== Dialog: Team hinzufügen / bearbeiten ===== -->
  <v-dialog v-model="showTeamDialog" max-width="480" persistent>
    <v-card>
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="secondary" :icon="editingTeam ? 'mdi-pencil' : 'mdi-account-multiple-plus'" />
        {{ editingTeam ? 'Team bearbeiten' : 'Neues Team hinzufügen' }}
      </v-card-title>

      <v-card-text class="pa-4">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="teamForm.name"
              clearable
              color="secondary"
              label="Teamname *"
              prepend-inner-icon="mdi-account-group"
              :rules="[rules.required]"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="teamForm.contactEmail"
              clearable
              color="secondary"
              label="Kontakt E-Mail-Adresse"
              prepend-inner-icon="mdi-email"
              :rules="[rules.email]"
              type="email"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-number-input
              v-model="teamForm.expectedMembers"
              color="secondary"
              inset
              label="Voraus. Anzahl an Schützen"
              :max="100"
              :min="1"
              prepend-inner-icon="mdi-account"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="teamForm.note"
              clearable
              color="secondary"
              label="Notiz"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn color="grey" text="Abbrechen" variant="text" @click="showTeamDialog = false" />
        <v-btn
          color="secondary"
          :disabled="!teamFormValid"
          prepend-icon="mdi-check"
          text="Speichern"
          variant="tonal"
          @click="saveTeam"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ===== Dialog: Schützen hinzufügen / bearbeiten ===== -->
  <v-dialog v-model="showMemberDialog" max-width="480" persistent>
    <v-card>
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="secondary" :icon="editingMember ? 'mdi-account-edit' : 'mdi-account-plus'" />
        {{ editingMember ? 'Schützen bearbeiten' : 'Neuen Schützen anlegen' }}
      </v-card-title>

      <v-card-text class="pa-4">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="memberForm.firstName"
              clearable
              color="secondary"
              label="Vorname *"
              :rules="[rules.required]"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="memberForm.lastName"
              clearable
              color="secondary"
              label="Nachname *"
              :rules="[rules.required]"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-number-input
              v-model="memberForm.number"
              color="secondary"
              control-variant="default"
              inset
              label="Startnummer *"
              :min="1"
              prepend-inner-icon="mdi-numeric"
              :rules="[rules.required, rules.numberNoDuplicate]"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn color="grey" text="Abbrechen" variant="text" @click="showMemberDialog = false" />
        <v-btn
          color="secondary"
          :disabled="!memberFormValid"
          prepend-icon="mdi-check"
          text="Speichern"
          variant="tonal"
          @click="saveMember"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ===== Dialog: Team löschen Bestätigung ===== -->
  <v-dialog v-model="showDeleteTeamDialog" max-width="500" persistent>
    <v-card>
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="error" icon="mdi-account-multiple-remove" />
        Team löschen?
      </v-card-title>

      <v-card-text class="pa-4">
        Soll das Team '{{ teamToDelete?.name }}' wirklich gelöscht werden?<template v-if="(teamToDelete?.members?.length ?? 0) > 0">
          {{ ` Alle ${teamToDelete?.members.length} Schützen des Teams werden ebenfalls entfernt.` }}</template>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text="Abbrechen" variant="text" @click="showDeleteTeamDialog = false" />
        <v-btn
          color="error"
          prepend-icon="mdi-delete-outline"
          text="Team löschen"
          variant="tonal"
          @click="confirmDeleteTeam"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ===== Dialog: Schützen löschen Bestätigung ===== -->
  <v-dialog v-model="showDeleteMemberDialog" max-width="500" persistent>
    <v-card>
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="error" icon="mdi-account-multiple-remove" />
        {{ memberToDelete?.firstName }} {{ memberToDelete?.lastName }} löschen?
      </v-card-title>

      <v-card-text class="pa-4">
        Soll dieser Schütze wirklich aus dem Team entfernt werden?
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text="Abbrechen" variant="text" @click="showDeleteMemberDialog = false">
          Abbrechen
        </v-btn>
        <v-btn
          color="error"
          prepend-icon="mdi-delete-outline"
          text="Team löschen"
          variant="tonal"
          @click="confirmDeleteMember"
        >
          Schütze entfernen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { TeamWithMembers } from '@/types'
  import { useTournamentStore } from '@/stores/tournamentStore'

  defineEmits(['next'])
  const isValid = ref(true)
  defineExpose({ isValid })

  const store = useTournamentStore()

  const selectedTeam = ref<TeamWithMembers | null>(null)

  const rules = {
    required: (value: any) => !!value || 'Erforderlich.',
    email: (value: any) => {
      if (value) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Ungültige E-Mail-Adresse.'
      }
      return true
    },
    numberNoDuplicate: () => !memberNumberDuplicate.value || 'Startnummer bereits vergeben.',
  }

  const memberNumberDuplicate = computed(() => {
    if (!selectedTeam.value || !memberForm.number) return false
    return selectedTeam.value.members.some(m =>
      m.number === memberForm.number && m.id !== editingMember.value?.id,
    )
  })

  const sortedMembers = computed(() =>
    (selectedTeam.value?.members ?? []).toSorted((a, b) => a.number - b.number),
  )

  // ===== Team Dialog =====
  const showTeamDialog = ref(false)
  const editingTeam = ref<TeamWithMembers | null>(null)
  const teamForm = reactive({ name: '', contactEmail: '', expectedMembers: null as number | null, note: '' })

  function openTeamDialog (team?: TeamWithMembers) {
    editingTeam.value = team ?? null
    teamForm.name = team?.name ?? ''
    teamForm.contactEmail = team?.contactEmail ?? ''
    teamForm.expectedMembers = team?.expectedMembers ?? null
    teamForm.note = team?.tournamentRegistration?.note ?? ''
    showTeamDialog.value = true
  }

  function saveTeam () {
    if (!teamForm.name) return
    if (editingTeam.value) {
      const t = store.teams.find(t => t.id === editingTeam.value!.id)
      if (t) {
        t.name = teamForm.name
        t.contactEmail = teamForm.contactEmail || null
        t.expectedMembers = teamForm.expectedMembers
        t.tournamentRegistration.note = teamForm.note || undefined
        // Sync selectedTeam reference
        if (selectedTeam.value?.id === t.id) selectedTeam.value = t
      }
    } else {
      const newTeam: TeamWithMembers = {
        id: Date.now().toString(),
        name: teamForm.name,
        contactEmail: teamForm.contactEmail || null,
        expectedMembers: teamForm.expectedMembers,
        tournamentRegistration: { registrationDate: new Date().toISOString(), paymentDate: null, arrivalDate: null, note: teamForm.note || undefined },
        members: [],
      }
      store.teams.push(newTeam)
    }
    showTeamDialog.value = false
  }

  const teamFormValid = computed(() =>
    !!teamForm.name
    && (rules.email(teamForm.contactEmail) === true || !teamForm.contactEmail),
  )

  // ===== Team löschen =====
  const showDeleteTeamDialog = ref(false)
  const teamToDelete = ref<TeamWithMembers | null>(null)

  function openDeleteTeamDialog (team: TeamWithMembers) {
    teamToDelete.value = team
    showDeleteTeamDialog.value = true
  }

  function confirmDeleteTeam () {
    const idx = store.teams.findIndex(t => t.id === teamToDelete.value?.id)
    if (idx !== -1) store.teams.splice(idx, 1)
    if (selectedTeam.value?.id === teamToDelete.value?.id) selectedTeam.value = null
    showDeleteTeamDialog.value = false
  }

  // ===== Schützen Dialog =====
  const showMemberDialog = ref(false)
  const editingMember = ref<any | null>(null)
  const memberForm = reactive({ firstName: '', lastName: '', number: 1 })

  function openMemberDialog (member?: any) {
    editingMember.value = member ?? null
    memberForm.firstName = member?.firstName ?? ''
    memberForm.lastName = member?.lastName ?? ''

    const usedNumbers = new Set(selectedTeam.value?.members.map(m => m.number))
    let next = 1
    while (usedNumbers.has(next)) next++
    memberForm.number = member?.number ?? next

    showMemberDialog.value = true
  }

  function saveMember () {
    if (!memberForm.firstName || !memberForm.lastName || !selectedTeam.value) return
    if (editingMember.value) {
      const m = selectedTeam.value.members.find(m => m.id === editingMember.value.id)
      if (m) {
        m.firstName = memberForm.firstName
        m.lastName = memberForm.lastName
        m.number = memberForm.number
      }
    } else {
      selectedTeam.value.members.push({
        id: Date.now().toString(),
        teamId: selectedTeam.value.id,
        number: memberForm.number,
        firstName: memberForm.firstName,
        lastName: memberForm.lastName,
      })
    }
    showMemberDialog.value = false
  }

  const memberFormValid = computed(() =>
    !!memberForm.firstName && !!memberForm.lastName && !!memberForm.number && !memberNumberDuplicate.value,
  )

  // ===== Schützen löschen =====
  const showDeleteMemberDialog = ref(false)
  const memberToDelete = ref<any | null>(null)

  function openDeleteMemberDialog (member: any) {
    memberToDelete.value = member
    showDeleteMemberDialog.value = true
  }

  function confirmDeleteMember () {
    if (!selectedTeam.value) return
    const idx = selectedTeam.value.members.findIndex(m => m.id === memberToDelete.value?.id)
    if (idx !== -1) selectedTeam.value.members.splice(idx, 1)
    showDeleteMemberDialog.value = false
  }

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
