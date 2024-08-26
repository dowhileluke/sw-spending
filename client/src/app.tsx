import { useMemo, useState } from 'react'
import { SpinnerGap, Warning } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { BarChart } from './components/bar-chart'
import { LabeledOption, Select } from './components/select'
import { fetchCosts } from './functions/fetch-costs'
import { filterBreakdown } from './functions/filter-breakdown'

const LIMITS: Array<LabeledOption<number>> = [
  { label: 'No Limit', value: 0, },
  { label: '10 Billion Credits', value: 10_000_000_000, },
  { label: '1 Billion Credits', value: 1_000_000_000, },
  { label: '100 Million Credits', value: 100_000_000, },
  { label: '10 Million Credits', value: 10_000_000, },
  { label: '1 Million Credits', value: 1_000_000, },
]

export function App() {
  const { data, error, isLoading } = useQuery({ queryKey: ['costs'], queryFn: fetchCosts })
  const [limit, setLimit] = useState(LIMITS[0].value)
  const breakdown = useMemo(() => {
    if (!data) return

    return filterBreakdown(data, limit)
  }, [data, limit])

  return (
    <div id="layout">
      <h1>Spending by Episode</h1>
      <div>
        <ul>
          <li>
            <strong>The Death Star:</strong>
            {' '}
            Thanks to the enormous cost of the Death Star, the total starship costs in Episode IV dwarf all others.
            Immense galactic resources will be required to sustain fleets that include this type of starcraft.
          </li>
          <li>
            <strong>Midsize Craft Arms Race:</strong>
            {' '}
            For a time, a fleet with starships costing 50-150 million credits was enough to maintain military superiority.
            Starting with Episode V, technological advances have allowed for the impressive Executor type craft to be manufactured.
            But with a 1.1 billion credit price tag, these ships will be out of reach for all but the most elite factions.
          </li>
          <li>
            <strong>Budget-Friendly Options:</strong>
            {' '}
            Despite the ever increasing costs of top-end ships, smaller craft have not greatly varied in price across episodes.
            When accounting for inflation, these ships have become more affordable for the average consumer.
          </li>
        </ul>
      </div>
      <div>
        <div id="chart">
          {isLoading && (
            <div className="stack">
              <SpinnerGap size="3em" className="spin" />
              <p>Fetching data...</p>
            </div>
          )}
          {error && (
            <div className="error stack">
              <Warning size="3em" />
              <p>Fetching failed!</p>
            </div>
          )}
          {breakdown && (<BarChart breakdown={breakdown} />)}
        </div>
        <p>
          Maximum Cost &nbsp; <Select options={LIMITS} value={limit} onChange={n => setLimit(n)} />
        </p>
        <p className="note">
          Note I: Due to the exceptional costs of certain starcraft, a filter is provided above to drill down to smaller costs.
        </p>
        <p className="note">
          Note II: This chart displays the cost of each unique type of starship by episode.
          <br />
          Multiple instances of a given ship are not modeled here.
        </p>
      </div>
    </div>
  );
}
