<template>
  <v-card class="pa-2" color="transparent" flat>
    <v-card-text>

      <v-form ref="form" v-model="isValid">

        <h3 class="text-h6 mb-4 text-secondary d-flex align-center">
          Grundinformationen
        </h3>

        <v-row dense>

          <v-col cols="12">
            <v-text-field
              v-model="store.general.name"
              clearable
              color="secondary"
              label="Turniername *"
              prepend-inner-icon="mdi-trophy"
              required
              :rules="[rules.required]"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="store.general.description"
              auto-grow
              clearable
              color="secondary"
              label="Beschreibung"
              placeholder="Zusätzliche Infos für die Teilnehmer..."
              prepend-inner-icon="mdi-text"
              rows="3"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              @click:outside="menu = false"
            >
              <template #activator="{ props }">
                <v-text-field
                  clearable
                  color="secondary"
                  label="Turnierdatum *"
                  :model-value="formattedDate"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  :rules="[rules.required]"
                  variant="outlined"
                />
              </template>

              <v-date-picker
                v-model="store.general.date"
                color="secondary"
                header="Datum wählen"
                locale="de-DE"
                title="Wann findet das Turnier statt?"
                @update:model-value="menu = false"
              />
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="timeMenu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="store.general.startTime"
                  v-bind="props"
                  clearable
                  color="secondary"
                  label="Startzeit *"
                  prepend-inner-icon="mdi-clock-outline"
                  readonly
                  :rules="[rules.required]"
                  variant="outlined"
                />
              </template>

              <v-time-picker
                v-if="timeMenu"
                v-model="store.general.startTime"
                color="secondary"
                format="24hr"
                scrollable
                width="350"
              >
                <template #actions>
                  <v-btn
                    color="secondary"
                    text="OK"
                    variant="tonal"
                    @click="timeMenu = false"
                  />
                </template>
              </v-time-picker></v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="store.general.location"
              clearable
              color="secondary"
              label="Austragungsort"
              placeholder="Kurze Bezeichnung für den jeweiligen Ort der Ausrichtung"
              prepend-inner-icon="mdi-map-marker-radius"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="store.general.address"
              clearable
              color="secondary"
              label="Adresse"
              placeholder="Straße, Hausnummer, PLZ, Ort"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <h3 class="text-h6 my-4 text-secondary d-flex align-center">
          Anmeldung
        </h3>

        <v-row dense>

          <v-col cols="12">
            <v-text-field
              v-model="store.general.email"
              clearable
              color="secondary"
              :label="store.general.allowRegistration ? 'Kontakt E-Mail-Adresse (öffentlich) *' : 'Kontakt E-Mail-Adresse (öffentlich)'"
              prepend-inner-icon="mdi-email"
              :rules="[rules.emailConditional]"
              type="email"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="store.general.maxSlots"
              clearable
              color="secondary"
              control-variant="default"
              label="Max. Startplätze"
              :max="1000"
              :min="1"
              persistent-hint
              placeholder="Wie viele Teams können teilnehmen?"
              prepend-inner-icon="mdi-account-group"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              @click:outside="menu2 = false"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  clearable
                  color="secondary"
                  :error-messages="deadlineError"
                  label="Anmeldeschluss"
                  :model-value="formattedDeadline"
                  name="deadlineInput"
                  prepend-inner-icon="mdi-calendar-alert"
                  readonly
                  variant="outlined"
                />
              </template>

              <v-date-picker
                v-model="store.general.registrationDeadline"
                color="secondary"
                header="Datum wählen"
                locale="de-DE"
                :max="store.general.date"
                title="Wann ist Anmeldeschluss?"
                @update:model-value="menu2 = false"
              >
                <template #actions>
                  <div v-if="store.general.date" class="pa-2 text-caption text-warning">
                    Turnier am: {{ formattedDate }}
                  </div>
                </template>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col class="-translate-y-3" cols="12">
            <v-switch
              v-model="store.general.allowRegistration"
              color="success"
              hide-details
            >
              <template #label>
                <div class="d-flex align-center">
                  <span>Anmeldungen erlauben?</span>
                </div>
              </template>
            </v-switch>
          </v-col>
        </v-row>

        <h3 class="text-h6 mt-3 mb-4 text-secondary d-flex align-center">
          Ausschreibung & Dokumente
        </h3>

        <v-row dense>
          <v-col cols="12">
            <v-sheet
              class="pa-6 border-md d-flex flex-column align-center justify-center rounded-lg cursor-pointer transition-swing"
              :class="isDragging ? 'border-solid border-secondary border-opacity-100' : 'border-dashed'"
              :elevation="isDragging ? 2 : 0"
              @click="triggerFileUpload"
              @dragleave.prevent="isDragging = false"
              @dragover.prevent="isDragging = true"
              @drop.prevent="handleDrop"
            >
              <v-icon
                :color="isDragging ? 'secondary' : 'grey'"
                :icon="isDragging ? 'mdi-cloud-upload' : 'mdi-tray-arrow-up'"
                size="x-large"
              />
              <div class="text-subtitle-1 mt-2">
                Dateien hierher ziehen oder <span class="text-secondary font-weight-bold">durchsuchen</span>
              </div>
              <div class="text-caption text-grey">PDF, DOCX oder Bilder (max. 10MB)</div>

              <input
                ref="fileInput"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.png,.jpg,.jpeg,.svg,.gif,.webp"
                class="d-none"
                multiple
                type="file"
                @change="handleFileSelection"
              >
            </v-sheet>
          </v-col>

          <v-col v-if="store.general.documents.length > 0" cols="12">
            <v-list border class="mt-2" rounded>
              <v-list-item
                v-for="(file, index) in store.general.documents"
                :key="index"
                :prepend-icon="getFileIcon(file.name)"
                :subtitle="formatFileSize(file.size)"
                :title="file.name"
              >
                <template #append>
                  <v-btn
                    color="error"
                    icon="mdi-delete-outline"
                    variant="text"
                    @click="removeFile(index)"
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <h3 class="text-h6 mt-10 mb-4 text-secondary d-flex align-center">
          Sonstige Einstellungen
        </h3>

        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="store.general.primaryColor"
              class="cursor-pointer"
              clearable
              color="secondary"
              label="Primärfarbe"
              placeholder="#000000"
              :rules="[rules.hexColor]"
              variant="outlined"
            >
              <template #prepend-inner>
                <v-avatar class="border" :color="store.general.primaryColor" size="24" />
              </template>
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-btn density="compact" icon="mdi-eyedropper" variant="text" v-bind="props" />
                  </template>
                  <v-color-picker v-model="store.general.primaryColor" elevation="5" hide-inputs mode="hex" />
                </v-menu>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="store.general.secondaryColor"
              class="cursor-pointer"
              clearable
              color="secondary"
              label="Sekundärfarbe"
              placeholder="#000000"
              :rules="[rules.hexColor]"
              variant="outlined"
            >
              <template #prepend-inner>
                <v-avatar class="border" :color="store.general.secondaryColor" size="24" />
              </template>
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-btn density="compact" icon="mdi-eyedropper" variant="text" v-bind="props" />
                  </template>
                  <v-color-picker v-model="store.general.secondaryColor" elevation="5" hide-inputs mode="hex" />
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

      </v-form>

    </v-card-text>
  </v-card>

  <v-snackbar
    v-model="showSnackbar"
    :color="snackbarColor"
    elevation="24"
    timeout="3000"
  >
    <v-icon class="mr-2" icon="mdi-alert" />
    {{ snackbarText }}

    <template #actions>
      <v-btn
        icon="mdi-close"
        size="x-small"
        @click="showSnackbar = false"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useTournamentStore } from '@/stores/tournamentStore'

  const store = useTournamentStore()
  const isValid = ref(false)
  const menu = ref(false)
  const menu2 = ref(false)

  defineExpose({
    isValid,
  })

  const deadlineError = computed(() => {
    const result = rules.deadlineBeforeTurnier()
    return result === true ? [] : [result]
  })

  // Validierungs-Regeln
  const rules = {
    required: (value: any) => !!value || 'Erforderlich.',
    emailConditional: (value: any) => {
      if (store.general.allowRegistration && !value) return 'E-Mail erforderlich wenn Anmeldungen erlaubt sind.'
      if (value) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Ungültige E-Mail-Adresse.'
      }
      return true
    },
    deadlineBeforeTurnier: () => {
      if (!store.general.registrationDeadline || !store.general.date) return true

      const dDate = new Date(store.general.registrationDeadline)
      const tDate = new Date(store.general.date)

      return dDate <= tDate || 'Anmeldeschluss darf nicht nach dem Turnier liegen.'
    },
    hexColor: (value: string) => {
      if (!value) return true // required-Regel übernimmt das separat, falls nötig
      const pattern = /^#([A-Fa-f0-9]{3}){1,2}$/
      return pattern.test(value) || value === '' || 'Ungültiges Hex-Format (z.B. #FFFFFF)'
    },
  }

  // Event Emits für den Parent-Stepper
  defineEmits(['next'])

  const isDragging = ref(false)
  const fileInput = ref<HTMLInputElement | null>(null)

  const timeMenu = ref(false)

  const showSnackbar = ref(false)
  const snackbarText = ref('')
  const snackbarColor = ref('warning') // Standardmäßig rot für Fehler

  function showWarning (message: string) {
    snackbarText.value = message
    snackbarColor.value = 'warning'
    showSnackbar.value = true
  }

  function triggerFileUpload () {
    // TypeScript weiß hier durch das "Optional Chaining" (?),
    // dass wir prüfen, ob das Element existiert
    fileInput.value?.click()
  }

  function handleDrop (e: DragEvent) {
    isDragging.value = false
    const files = e.dataTransfer?.files
    if (files && files.length > 0) addFiles(files)
  }

  function handleFileSelection (e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files) addFiles(target.files)
  }

  function addFiles (fileList: FileList | File[]) {
    const maxSizeBytes = 10 * 1024 * 1024 // 10MB
    const newFiles = Array.from(fileList)

    const validFiles = newFiles.filter(file => {
      // 1. Doubletten-Check (wie gehabt)
      const isDuplicate = store.general.documents.some(
        existing => existing.name === file.name && existing.size === file.size,
      )
      if (isDuplicate) return false

      // 2. Erweiterter Typ-Check
      const allowedMimeTypes = [
        // Dokumente & Text
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'text/plain', // .txt
        'text/csv', // .csv

        // Tabellen (Excel)
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx

        // Präsentationen
        'application/vnd.ms-powerpoint', // .ppt
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx

        // Bilder
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif',
        'image/webp',
      ]

      if (!allowedMimeTypes.includes(file.type)) {
        showWarning(`Dateityp nicht unterstützt: ${file.name}`)
        return false
      }

      // 3. Größen-Check
      if (file.size > maxSizeBytes) {
        showWarning(`"${file.name}" ist zu groß (max. 10MB).`)
        return false
      }

      return true
    })

    store.general.documents.push(...validFiles)
  }

  // Formatiert das Datum für die Anzeige im Textfeld (DD.MM.YYYY)
  const formattedDate = computed(() => {
    if (!store.general.date) return ''

    const d = new Date(store.general.date)

    // Wir erzwingen 2-stellige Angaben für Tag und Monat
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  })

  // Computed für die Anzeige des Anmeldeschlusses im Format 02.03.2026
  const formattedDeadline = computed(() => {
    if (!store.general.registrationDeadline) return ''

    const d = new Date(store.general.registrationDeadline)
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  })

  function removeFile (index: number) {
    store.general.documents.splice(index, 1)
  }

  // Hilfsfunktion für Icons je nach Dateityp
  function getFileIcon (fileName: string) {
    const name = fileName.toLowerCase()

    if (name.endsWith('.pdf')) return 'mdi-file-pdf-box'

    // Word
    if (name.endsWith('.docx') || name.endsWith('.doc')) return 'mdi-file-word-box'

    // Excel
    if (name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) {
      return 'mdi-file-excel-box'
    }

    // PowerPoint
    if (name.endsWith('.pptx') || name.endsWith('.ppt')) return 'mdi-file-powerpoint-box'

    // Bilder
    if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'].some(ext => name.endsWith(ext))) {
      return 'mdi-file-image'
    }

    // Standard
    return 'mdi-file-document-outline'
  }

  // Hilfsfunktion für lesbare Dateigrößen
  function formatFileSize (bytes: number) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
</script>
