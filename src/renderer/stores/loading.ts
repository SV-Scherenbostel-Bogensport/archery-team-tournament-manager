import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')

  function show () {
    loading.value = true
    error.value = false
    errorMessage.value = ''
  }

  function hide () {
    loading.value = false
    error.value = false
  }

  function showError (payload?: any) {
    loading.value = false
    error.value = true
    errorMessage.value = getErrorMessage(payload)
  }

  function getErrorMessage (err?: any): string {
    if (typeof err === 'string') {
      return err
    }
    if (err?.response) {
      const status = err.response.status
      if (status >= 500) {
        return `Serverfehler (${status})`
      }
      if (status >= 400) {
        return err.response.data?.message || `Fehler (${status})`
      }
    }
    if (err?.message) {
      return err.message
    }
    return 'Ein unbekannter Fehler ist aufgetreten!'
  }

  return {
    loading,
    error,
    errorMessage,
    show,
    hide,
    showError,
  }
})
