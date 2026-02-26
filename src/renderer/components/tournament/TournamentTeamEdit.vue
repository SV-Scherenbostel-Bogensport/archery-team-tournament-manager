<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text class="pa-0">

      <v-row no-gutters style="min-height: 520px;">

        <!-- ===== LINKE SEITE: Teams ===== -->
        <v-col class="border-e" cols="12" md="4">
          <div class="pa-4">
            <h3 class="text-h6 mb-4 text-secondary d-flex align-center">
              Teams
            </h3>

            <!-- Team hinzufügen -->
            <v-text-field
              v-model="newTeamName"
              clearable
              color="secondary"
              density="comfortable"
              label="Teamname"
              prepend-inner-icon="mdi-account-group"
              variant="outlined"
              @keyup.enter="addTeam"
            >
              <template #append-inner>
                <v-btn
                  color="secondary"
                  density="comfortable"
                  :disabled="!newTeamName.trim()"
                  icon="mdi-plus"
                  variant="tonal"
                  @click="addTeam"
                />
              </template>
            </v-text-field>

            <!-- Team-Liste leer -->
            <div v-if="store.teamsWithMembers.length === 0" class="text-center text-medium-emphasis text-caption mt-6">
              <v-icon class="mb-2 d-block mx-auto" icon="mdi-account-group-outline" size="40" />
              Noch keine Teams vorhanden.
            </div>

            <v-list v-else class="pa-0" lines="two">
              <v-list-item
                v-for="(team, index) in store.teamsWithMembers"
                :key="team.localId"
                :active="selectedTeamIndex === index"
                active-color="secondary"
                class="rounded-lg mb-1 team-item"
                :class="selectedTeamIndex === index ? 'team-item--active' : ''"
                :prepend-icon="selectedTeamIndex === index ? 'mdi-account-group' : 'mdi-account-group-outline'"
                :title="team.name!"
                @click="selectedTeamIndex = index"
              >
                <template #subtitle>
                  <span>{{ team.members.length }} Schütze(n)</span>
                  <span v-if="team.teamMemberCount" class="text-medium-emphasis">
                    &nbsp;/ {{ team.teamMemberCount }} erwartet
                  </span>
                </template>
                <template #append>
                  <div class="d-flex flex-column">
                    <v-btn
                      color="secondary"
                      density="compact"
                      icon="mdi-pencil-outline"
                      size="small"
                      variant="text"
                      @click.stop="openTeamEdit(index)"
                    />
                    <v-btn
                      color="error"
                      density="compact"
                      icon="mdi-delete-outline"
                      size="small"
                      variant="text"
                      @click.stop="removeTeam(index)"
                    />
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- ===== RECHTE SEITE: Schützen ===== -->
        <v-col cols="12" md="8">
          <div class="pa-4">

            <!-- Kein Team ausgewählt -->
            <div
              v-if="selectedTeamIndex === null"
              class="d-flex flex-column align-center justify-center text-center text-medium-emphasis mt-10"
            >
              <v-icon class="mb-3 text-secondary" icon="mdi-cursor-pointer" size="48" />
              <div class="text-subtitle-1 font-weight-medium">Team auswählen</div>
              <div class="text-caption mt-1">Klicke links auf ein Team, um Schützen zu verwalten.</div>
            </div>

            <!-- Team ausgewählt -->
            <template v-else>
              <div class="d-flex align-center justify-space-between mb-4">
                <h3 class="text-h6 text-secondary d-flex align-center ga-2">
                  <v-icon icon="mdi-bow-arrow" />
                  Schützen – {{ selectedTeam?.name }}
                </h3>
                <v-chip
                  v-if="selectedTeam?.contactEmail"
                  color="secondary"
                  density="compact"
                  prepend-icon="mdi-email-outline"
                  variant="tonal"
                >
                  {{ selectedTeam.contactEmail }}
                </v-chip>
              </div>

              <!-- Schütze hinzufügen -->
              <v-row class="mb-2" dense>
                <v-col cols="3">
                  <v-text-field
                    v-model="newArcher.number"
                    color="secondary"
                    density="comfortable"
                    label="Startnr."
                    prepend-inner-icon="mdi-pound"
                    type="number"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newArcher.firstName"
                    color="secondary"
                    density="comfortable"
                    label="Vorname"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newArcher.lastName"
                    color="secondary"
                    density="comfortable"
                    label="Nachname"
                    variant="outlined"
                    @keyup.enter="addArcher"
                  />
                </v-col>
                <v-col class="d-flex align-center" cols="1">
                  <v-btn
                    color="secondary"
                    :disabled="!canAddArcher"
                    icon="mdi-plus"
                    variant="tonal"
                    @click="addArcher"
                  />
                </v-col>
              </v-row>

              <!-- Schützen-Liste leer -->
              <div v-if="!selectedTeam?.members.length" class="text-center text-medium-emphasis text-caption mt-6">
                <v-icon class="mb-2 d-block mx-auto" icon="mdi-bow-arrow" size="36" />
                Noch keine Schützen in diesem Team.
              </div>

              <v-table v-else class="rounded-lg border" density="compact">
                <thead>
                  <tr>
                    <th class="text-left" style="width: 80px;">Startnr.</th>
                    <th class="text-left">Vorname</th>
                    <th class="text-left">Nachname</th>
                    <th style="width: 100px;" />
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(archer, aIndex) in selectedTeam.members" :key="archer.id">
                    <td>
                      <v-text-field
                        v-if="editingIndex === aIndex"
                        v-model="editBuffer.number"
                        color="secondary"
                        density="compact"
                        hide-details
                        style="min-width: 60px;"
                        type="number"
                        variant="plain"
                      />
                      <span v-else class="text-medium-emphasis">#{{ archer.number }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="editingIndex === aIndex"
                        v-model="editBuffer.firstName"
                        color="secondary"
                        density="compact"
                        hide-details
                        variant="plain"
                      />
                      <span v-else>{{ archer.firstName }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="editingIndex === aIndex"
                        v-model="editBuffer.lastName"
                        color="secondary"
                        density="compact"
                        hide-details
                        variant="plain"
                      />
                      <span v-else>{{ archer.lastName }}</span>
                    </td>
                    <td class="text-right">
                      <template v-if="editingIndex === aIndex">
                        <v-btn
                          color="success"
                          density="compact"
                          icon="mdi-check"
                          size="small"
                          variant="text"
                          @click="saveEdit(aIndex)"
                        />
                        <v-btn
                          color="grey"
                          density="compact"
                          icon="mdi-close"
                          size="small"
                          variant="text"
                          @click="editingIndex = null"
                        />
                      </template>
                      <template v-else>
                        <v-btn
                          color="secondary"
                          density="compact"
                          icon="mdi-pencil-outline"
                          size="small"
                          variant="text"
                          @click="startEdit(aIndex, archer)"
                        />
                        <v-btn
                          color="error"
                          density="compact"
                          icon="mdi-delete-outline"
                          size="small"
                          variant="text"
                          @click="removeArcher(aIndex)"
                        />
                      </template>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </template>

          </div>
        </v-col>

      </v-row>

    </v-card-text>
  </v-card>

  <!-- ===== Team bearbeiten Dialog ===== -->
  <v-dialog v-model="teamEditDialog" max-width="480" persistent>
    <v-card rounded="lg">
      <v-card-title class="d-flex align-center ga-2 pa-4 pb-2">
        <v-icon color="secondary" icon="mdi-account-group" />
        Team bearbeiten
      </v-card-title>

      <v-card-text class="pa-4">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="teamEditBuffer.name"
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
              v-model="teamEditBuffer.contactEmail"
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
              v-model="teamEditBuffer.teamMemberCount"
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
        <v-btn color="grey" text="Abbrechen" variant="text" @click="teamEditDialog = false" />
        <v-btn
          color="secondary"
          :disabled="!teamEditBuffer.name?.trim()"
          prepend-icon="mdi-check"
          text="Speichern"
          variant="tonal"
          @click="saveTeamEdit"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { TeamMember } from '@/types'
  import { computed, ref } from 'vue'
  import { useTournamentStore } from '@/stores/tournamentStore'

  const store = useTournamentStore()

  defineEmits(['next'])
  const isValid = ref(true)
  defineExpose({ isValid })

  // ── Teams ──────────────────────────────────────────
  const newTeamName = ref('')
  const selectedTeamIndex = ref<number | null>(null)

  const selectedTeam = computed(() =>
    selectedTeamIndex.value === null
      ? null
      : store.teamsWithMembers[selectedTeamIndex.value],
  )

  function addTeam () {
    const name = newTeamName.value.trim()
    if (!name) return
    store.teamsWithMembers.push({
      localId: crypto.randomUUID(),
      name,
      contactEmail: undefined,
      teamMemberCount: undefined,
      members: [],
    })
    newTeamName.value = ''
    selectedTeamIndex.value = store.teamsWithMembers.length - 1
  }

  function removeTeam (index: number) {
    store.teamsWithMembers.splice(index, 1)
    if (selectedTeamIndex.value === index) selectedTeamIndex.value = null
    else if (selectedTeamIndex.value !== null && selectedTeamIndex.value > index) {
      selectedTeamIndex.value--
    }
  }

  // ── Team bearbeiten Dialog ─────────────────────────
  const teamEditDialog = ref(false)
  const teamEditIndex = ref<number | null>(null)
  const teamEditBuffer = ref({
    name: '',
    contactEmail: '',
    teamMemberCount: undefined as number | undefined,
  })

  function openTeamEdit (index: number) {
    const team = store.teamsWithMembers[index]
    if (!team) return
    teamEditIndex.value = index
    teamEditBuffer.value = {
      name: team.name!,
      contactEmail: team.contactEmail ?? '',
      teamMemberCount: team.teamMemberCount!,
    }
    teamEditDialog.value = true
  }

  function saveTeamEdit () {
    if (teamEditIndex.value === null) return
    const team = store.teamsWithMembers[teamEditIndex.value]
    if (!team) return
    team.name = teamEditBuffer.value.name.trim()
    team.contactEmail = teamEditBuffer.value.contactEmail?.trim() || undefined
    team.teamMemberCount = teamEditBuffer.value.teamMemberCount
    teamEditDialog.value = false
  }

  // ── Schützen ───────────────────────────────────────
  const newArcher = ref({ number: '', firstName: '', lastName: '' })

  const canAddArcher = computed(() =>
    newArcher.value.number !== ''
    && newArcher.value.firstName.trim() !== ''
    && newArcher.value.lastName.trim() !== '',
  )

  function addArcher () {
    if (!canAddArcher.value || selectedTeamIndex.value === null) return
    const team = store.teamsWithMembers[selectedTeamIndex.value]
    if (!team) return
    team.members.push({
      id: crypto.randomUUID(),
      teamId: '',
      number: Number(newArcher.value.number),
      firstName: newArcher.value.firstName.trim(),
      lastName: newArcher.value.lastName.trim(),
    })
    newArcher.value = { number: '', firstName: '', lastName: '' }
  }

  function removeArcher (index: number) {
    if (selectedTeamIndex.value === null) return
    const team = store.teamsWithMembers[selectedTeamIndex.value]
    if (!team) return
    team.members.splice(index, 1)
  }

  // ── Inline Edit Schützen ───────────────────────────
  const editingIndex = ref<number | null>(null)
  const editBuffer = ref({ localId: '', number: '', firstName: '', lastName: '' })

  function startEdit (index: number, archer: TeamMember) {
    editingIndex.value = index
    editBuffer.value = {
      localId: archer.id,
      number: String(archer.number),
      firstName: archer.firstName!,
      lastName: archer.lastName!,
    }
  }

  function saveEdit (index: number) {
    if (selectedTeamIndex.value === null) return
    const team = store.teamsWithMembers[selectedTeamIndex.value]
    if (!team) return
    team.members[index] = {
      id: editBuffer.value.localId,
      teamId: '',
      number: Number(editBuffer.value.number),
      firstName: editBuffer.value.firstName.trim(),
      lastName: editBuffer.value.lastName.trim(),
    }
    editingIndex.value = null
  }
</script>

<style scoped>
.team-item {
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.team-item--active {
  border-color: rgb(var(--v-theme-secondary), 0.4);
}
</style>
