<template>
  <v-app border>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>SV Scherenbostel Manager</v-app-bar-title>

      <v-spacer />

      <v-btn icon="mdi-cog" to="/settings" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" permanent>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/"
          value="dashboard"
        />

        <v-list-item
          prepend-icon="mdi-account-group"
          title="Vereine"
          to="/clubs"
          value="clubs"
        />

        <v-list-item
          prepend-icon="mdi-trophy"
          title="Turniere"
          to="/tournaments"
          value="tournaments"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // Steuert, ob die Navbar offen oder zu ist (für mobile Ansichten oder manuelle Klicks)
  const drawer = ref(true)
</script>
