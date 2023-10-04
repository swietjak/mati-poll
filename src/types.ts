import type { ChartData } from 'chart.js'

export type PartyName = 'PiS' | 'KO' | 'KONF' | 'TD' | 'LEW' | 'BEZP'

export interface PartyDefinition {
  partyName: PartyName
  maxPercentage: number
  minPercentage: number
  color: string
}

export interface PartyResult {
  partyName: PartyName
  percentage: number
}

export type BarChartData = ChartData<'bar', (number | [number, number] | null)[], unknown>
