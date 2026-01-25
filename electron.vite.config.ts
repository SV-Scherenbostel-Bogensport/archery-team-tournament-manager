import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'electron-vite'
import AutoImport from 'unplugin-auto-import/vite'
import Fonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    root: resolve(__dirname, 'src/renderer'),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer'),
      },
    },
    plugins: [
      VueRouter({
        routesFolder: resolve(__dirname, 'src/renderer/pages'),
        dts: resolve(__dirname, 'src/renderer/typed-router.d.ts'),
      }),
      Layouts({
        layoutsDirs: resolve(__dirname, 'src/renderer/layouts'),
        pagesDirs: resolve(__dirname, 'src/renderer/pages'),
        defaultLayout: 'default',
      }),
      AutoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          { pinia: ['defineStore', 'storeToRefs'] },
        ],
        dts: resolve(__dirname, 'src/renderer/auto-imports.d.ts'),
      }),
      Components({
        dirs: [resolve(__dirname, 'src/renderer/components')],
        dts: resolve(__dirname, 'src/renderer/components.d.ts'),
      }),
      tailwindcss(),
      vue({
        template: { transformAssetUrls },
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'styles/settings.scss',
        },
      }),
      Fonts({
        fontsource: {
          families: [
            {
              name: 'Roboto',
              weights: [100, 300, 400, 500, 700, 900],
              styles: ['normal', 'italic'],
            },
          ],
        },
      }),
    ],
  },
})
