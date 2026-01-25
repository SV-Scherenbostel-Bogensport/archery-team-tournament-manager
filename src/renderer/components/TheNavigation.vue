<template>
  <v-navigation-drawer
    v-model:opened="openedGroups"
    expand-on-hover
    permanent
    rail
    @mouseenter="openAllGroups"
    @mouseleave="closeAllGroups"
  >
    <v-list v-model:opened="openedGroups" nav>
      <v-list-item active-class="text-primary" prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
      <v-list-item active-class="text-primary" prepend-icon="mdi-tune" title="Steuerung" to="/control" />

      <v-list-group value="evaluation">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :class="{ 'text-primary': isActive('/evaluation') }" prepend-icon="mdi-form-select">
            <v-list-item-title :class="{ 'underline' : openedGroups.includes('evaluation') }">Auswertung</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item active-class="text-primary" title="Ergebniseingabe" to="/evaluation/entry" />
        <v-list-item active-class="text-primary" title="Schießzettel" to="/evaluation/sheets" />
      </v-list-group>

      <v-list-group value="settings">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :class="{ 'text-primary': isActive('/settings') }" prepend-icon="mdi-cog">
            <v-list-item-title :class="{ 'underline' : openedGroups.includes('settings') }">Einstellungen</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item active-class="text-primary" title="Turnierparameter" to="/settings/parameters" />
        <v-list-item active-class="text-primary" title="Team & Schützen" to="/settings/teams" />
        <v-list-item active-class="text-primary" title="Spielplan" to="/settings/schedule" />
      </v-list-group>

      <v-list-item active-class="text-primary" prepend-icon="mdi-database-sync-outline" title="Replikation" to="/replication" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const openedGroups = ref<string[]>([])

  const isActive = (path: string) => route.path.startsWith(path)

  function openAllGroups () {
    // openedGroups.value = ['evaluation', 'settings']
  }

  function closeAllGroups () {
    openedGroups.value = []
  }
</script>
