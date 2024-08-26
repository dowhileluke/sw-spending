import { BarDatum } from '@nivo/bar'
import { CostBreakdown } from '../../../server/src/types'

/** returns the given CostBreakdown with all elements > costLimit removed */
export function filterBreakdown(breakdown: CostBreakdown, costLimit: number) {
	if (costLimit <= 0) return breakdown

	const hiddenShipNames: Record<string, boolean> = {}

	const costs = breakdown.costs.map(original => {
		const result: BarDatum = {}

		for (const [shipName, cost] of Object.entries(original)) {
			// the original costs object contains an `episode: string` element that needs to be preserved
			if (typeof cost === 'number' && cost > costLimit) {
				hiddenShipNames[shipName] = true
			} else {
				result[shipName] = cost
			}
		}

		return result
	})

	const result: CostBreakdown = {
		costs,
		shipNames: breakdown.shipNames.filter(name => !hiddenShipNames[name]),
	}

	return result
}
