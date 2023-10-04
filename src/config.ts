import { format, subDays } from 'date-fns'
import type { PartyDefinition } from './types'

const surveyProviders = [
  'Kantar',
  'IPSOS',
  'IBRIS',
  'United Surveys',
  'Social Changes',
  'CBOS',
  'Estymator'
]

export const partyDefinitions: PartyDefinition[] = [
  { partyName: 'PiS', minPercentage: 32, maxPercentage: 37, color: '#2E5B91' },
  { partyName: 'KO', minPercentage: 27, maxPercentage: 35, color: '#F58429' },
  { partyName: 'KONF', minPercentage: 8, maxPercentage: 11, color: '#34455D' },
  { partyName: 'LEW', minPercentage: 9, maxPercentage: 12, color: '#C3123F' },
  { partyName: 'TD', minPercentage: 9, maxPercentage: 12, color: '#D3D052' },
  { partyName: 'BEZP', minPercentage: 1, maxPercentage: 3, color: '#F12828' }
]

export const getPlotConfig = () => {
  const surveyProviderIndex = Math.floor(Math.random() * surveyProviders.length)
  const titleText = surveyProviders[surveyProviderIndex]
  const startDate = format(subDays(new Date(), 5), 'dd.MM.yyyy')
  const endDate = format(subDays(new Date(), 2), 'dd.MM.yyyy')

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value: number) => `${value}%`
      },
      title: {
        display: true,
        text: `Sondaż Wyborczy przeprowadzony przez ${titleText} w dniach ${startDate} - ${endDate}`,
        font: {
          size: 24
        }
      }
    }
  }
}
