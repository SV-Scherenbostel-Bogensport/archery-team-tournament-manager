<template>
  <v-navigation-drawer
    v-model:opened="openedGroups"
    expand-on-hover
    permanent
    rail
    @mouseenter="openAllGroups"
    @mouseleave="closeAllGroups"
  >
    <v-list v-if="tournamentId" v-model:opened="openedGroups" nav>

      <v-list-item
        class="mb-1"
        prepend-icon="mdi-trophy-outline"
        style="opacity: 0.7"
        :subtitle="`ID: ${tournamentId}`"
        title="TODO"
      />

      <v-divider class="mb-2" />

      <v-list-item active-class="text-primary" prepend-icon="mdi-view-dashboard" title="Dashboard" :to="`/tournament/${tournamentId}/dashboard`" />
      <v-list-item active-class="text-primary" prepend-icon="mdi-tune" title="Steuerung" :to="`/tournament/${tournamentId}/control`" />
      <v-list-group value="evaluation">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :class="{ 'text-primary': isActive('/evaluation') }" prepend-icon="mdi-form-select">
            <v-list-item-title :class="{ 'underline' : openedGroups.includes('evaluation') }">Auswertung</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item active-class="text-primary" title="Ergebniseingabe" :to="`/tournament/${tournamentId}/evaluation/entry`" />
        <v-list-item active-class="text-primary" title="Schießzettel" :to="`/tournament/${tournamentId}/evaluation/sheets`" />
      </v-list-group>

      <v-list-group value="settings">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :class="{ 'text-primary': isActive('/settings') }" prepend-icon="mdi-cog">
            <v-list-item-title :class="{ 'underline' : openedGroups.includes('settings') }">Einstellungen</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item active-class="text-primary" title="Turnierparameter" :to="`/tournament/${tournamentId}/settings/parameters`" />
        <v-list-item active-class="text-primary" title="Team & Schützen" :to="`/tournament/${tournamentId}/settings/teams`" />
        <v-list-item active-class="text-primary" title="Spielplan" :to="`/tournament/${tournamentId}/settings/schedule`" />
      </v-list-group>

      <v-list-item
        active-class="text-primary"
        prepend-icon="mdi-database-sync-outline"
        subtitle="vor 10 Minute"
        title="Replikation"
        :to="`/tournament/${tournamentId}/replication`"
      />
    </v-list>

    <v-list v-else nav>
      <v-list-item
        active-class="text-primary"
        prepend-icon="mdi-home"
        title="Startseite"
        to="/"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const openedGroups = ref<string[]>([])

  const tournamentId = computed(() => {
    const params = route.params as { id?: string }
    return params.id
  })

  const isActive = (path: string) => route.path.includes(path)

  function openAllGroups () {
    // openedGroups.value = ['evaluation', 'settings']
  }

  function closeAllGroups () {
    openedGroups.value = []
  }
</script>
