import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  status: () => 'ready',
})
