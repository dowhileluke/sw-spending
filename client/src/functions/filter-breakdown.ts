import { BarDatum } from '@nivo/bar'
import { CostBreakdown } from '../../../server/src/types'

/** test if a ship/episode should remain in the filtered data set */
function shouldKeyRemain(costOrEpisode: number | string, costLimit: number) {
	// episodes have a name, not a numeric value
	if (typeof costOrEpisode === 'string') {
		return true
	}

	// we know the cost is numeric; compare to limit
	return costOrEpisode <= costLimit
}

/** returns the given CostBreakdown with all elements > costLimit removed */
export function filterBreakdown(breakdown: CostBreakdown, costLimit: number) {
	if (costLimit <= 0) return breakdown

	const hiddenShipNames: Record<string, boolean> = {}

	const costs = breakdown.costs.map(original => {
		const result: BarDatum = {}

		for (const [shipOrEpisodeName, costOrEpisode] of Object.entries(original)) {
			if (shouldKeyRemain(costOrEpisode, costLimit)) {
				result[shipOrEpisodeName] = costOrEpisode
			} else {
				hiddenShipNames[shipOrEpisodeName] = true
			}
		}

		return result
	})

	// filter out ship names that were too costly
	const visibleShips = breakdown.shipNames.filter(name => !hiddenShipNames[name])
	const result: CostBreakdown = {
		costs,
		shipNames: visibleShips,
	}

	return result
}
