export interface Document {
  id: string
  tournamentId: string
  documentTypeId: string
  fileName: string
  mimetype: string
  content: Uint8Array
}
