import { startOfDay } from 'date-fns'
import { getPlotConfig, partyDefinitions } from './config'
import type { BarChartData, PartyDefinition } from './types'

export const generateNumbersInRange = (partyDefs: PartyDefinition[]): BarChartData => {
  const numbers = partyDefs.map(
    ({ maxPercentage, minPercentage }) =>
      Math.random() * (maxPercentage - minPercentage) + minPercentage
  )

  const currentSum = numbers.reduce((acc, curr) => acc + curr, 0)

  const scalingFactor = 100 / currentSum

  const sortedData = numbers
    .map((num, index) => ({
      partyName: partyDefs[index].partyName,
      color: partyDefs[index].color,
      percentage: parseFloat((num * scalingFactor).toFixed(2))
    }))
    .sort((a, b) => b.percentage - a.percentage)

  return {
    labels: sortedData.map(({ partyName }) => partyName),
    datasets: [
      {
        label: 'Wynik procentowy',
        data: sortedData.map(({ percentage }) => percentage),
        backgroundColor: sortedData.map(({ color }) => color)
      }
    ]
  }
}

interface PlotProps {
  data: BarChartData
  config: ReturnType<typeof getPlotConfig>
}

export const getPlotProps = (): PlotProps => {
  const currentDate = startOfDay(new Date())
  const storageProps = window.localStorage.getItem(currentDate.toISOString())

  if (storageProps) return JSON.parse(storageProps) as PlotProps

  const newProps = {
    config: getPlotConfig(),
    data: generateNumbersInRange(partyDefinitions)
  }

  window.localStorage.setItem(currentDate.toISOString(), JSON.stringify(newProps))
  return newProps
}
