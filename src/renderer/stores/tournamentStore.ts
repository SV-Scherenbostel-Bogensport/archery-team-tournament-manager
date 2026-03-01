import type { Stage, TargetFace, Team, TeamWithMembers } from '@/types'
import { defineStore } from 'pinia'

export interface TournamentGeneralData {
  name: string
  description: string
  location: string
  address: string
  email: string
  date: string | null
  startTime: string | null
  maxSlots: number | undefined
  registrationDeadline: string | null
  allowRegistration: boolean
  primaryColor: string
  secondaryColor: string
  documents: File[]
}

interface TournamentState {
  general: TournamentGeneralData
  competition: {
    mode: string | null
  }
  teams: TeamWithMembers[]
  stages: Stage[]
  selectedTeams: Team[]
  targetFaces: TargetFace[]
  isLoadingTemplates: boolean
  isLoadingTargetFaces: boolean
}

function defaultGeneral (): TournamentGeneralData {
  return {
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
}

export const useTournamentStore = defineStore('tournament', {
  state: (): TournamentState => ({
    general: defaultGeneral(),
    competition: {
      mode: null,
    },
    teams: [],
    stages: [],
    selectedTeams: [],
    targetFaces: [],
    isLoadingTemplates: false,
    isLoadingTargetFaces: false,
  }),

  getters: {
    totalMembers: state => state.teams.reduce((acc, t) => acc + t.members.length, 0),
    paidTeams: state => state.teams.filter(t => t.tournamentRegistration.paymentDate),
    arrivedTeams: state => state.teams.filter(t => t.tournamentRegistration.arrivalDate),
  },

  actions: {
    resetForm () {
      this.general = defaultGeneral()
      this.teams = []
      this.competition = { mode: null }
      this.stages = []
      this.selectedTeams = []
    },

    addStage (stage: Stage) {
      this.stages.push(stage)
    },

    removeStage (index: number) {
      this.stages.splice(index, 1)
    },

    async createTournament () {
      // TODO: POST to backend
    },
  },
})
