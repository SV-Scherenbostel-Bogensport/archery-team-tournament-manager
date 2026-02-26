import type { Stage, TargetFace, Team, TeamWithMembers } from '@/types'
import { defineStore } from 'pinia'

// Interface speziell für Step 1
export interface TournamentGeneralData {
  name: string
  description: string
  location: string
  address: string
  email: string
  date: string | null
  startTime: string | null
  maxSlots?: number
  registrationDeadline: string | null
  allowRegistration: boolean
  primaryColor: string
  secondaryColor: string
  documents: File[]
}

// FIX: TournamentState muss ALLE Felder enthalten, die im State vorkommen
interface TournamentState {
  general: TournamentGeneralData
  competition: {
    mode: string | null
  }
  teamsWithMembers: TeamWithMembers[]
  stages: Stage[]
  selectedTeams: Team[]
  targetFaces: TargetFace[]
  isLoadingTemplates: boolean
  isLoadingTargetFaces: boolean
}

export const useTournamentStore = defineStore('tournament', {

  state: (): TournamentState => ({
    general: {
      name: '',
      description: '',
      location: '',
      address: '',
      email: '',
      date: null,
      startTime: null,
      maxSlots: undefined,
      registrationDeadline: null,
      allowRegistration: false,
      primaryColor: '',
      secondaryColor: '',
      documents: [],
    },
    teamsWithMembers: [],
    competition: {
      mode: '' as string | null,
    },
    stages: [],
    selectedTeams: [],
    targetFaces: [],
    isLoadingTemplates: false,
    isLoadingTargetFaces: false,
  }),

  actions: {

    resetForm () {
      this.general = {
        name: '',
        description: '',
        location: '',
        address: '',
        email: '',
        date: null,
        startTime: null,
        maxSlots: undefined,
        registrationDeadline: null,
        allowRegistration: false,
        primaryColor: '',
        secondaryColor: '',
        documents: [],
      }
      this.teamsWithMembers = []
      this.competition = {
        mode: '',
      }
      this.stages = []
      this.selectedTeams = []
    },

    addStage (stage: Stage) {
      this.stages.push(stage)
    },

    removeStage (index: number) {
      this.stages.splice(index, 1)
    },

    /**
     * Sendet das komplette Turnier an das Backend
     */
    async createTournament () {},
  },
})
