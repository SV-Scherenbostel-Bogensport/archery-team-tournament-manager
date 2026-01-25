import type { ThemeDefinition } from 'vuetify'
import { darkColors, lightColors } from './colors'

export const myLightTheme: ThemeDefinition = {
  dark: false,
  colors: lightColors,
}

export const myDarkTheme: ThemeDefinition = {
  dark: true,
  colors: darkColors,
}
