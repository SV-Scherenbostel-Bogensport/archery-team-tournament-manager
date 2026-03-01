<template>
  <div class="d-flex align-center ga-3 pa-2">
    <v-icon :color="value ? 'secondary' : 'grey'" :icon="icon" size="20" />
    <div>
      <div class="text-caption text-medium-emphasis">{{ label }}</div>
      <div v-if="value" class="text-body-2 font-weight-medium">{{ value }}</div>
      <div v-else class="text-body-2 text-disabled font-italic">—</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    icon: string
    label: string
    value?: string
  }>()
</script>
