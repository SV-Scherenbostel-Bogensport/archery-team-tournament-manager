/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
import { myDarkTheme, myLightTheme } from '@/theme'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const savedTheme = localStorage.getItem('user-theme') || 'myLightTheme'

export default createVuetify({
  theme: {
    defaultTheme: savedTheme,
    themes: {
      myLightTheme,
      myDarkTheme,
    },
  },
})
