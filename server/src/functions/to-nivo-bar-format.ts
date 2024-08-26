import { BarDatum } from '@nivo/bar'
import { filmList } from '../films'
import { CostBreakdown, IStarship } from '../types'
import { getIdFromUrl } from './get-id-from-url'

/**
 * Nivo Bar charts require an array of data in the format of:
 * {
 *   [indexKey]: [uniqueId],
 *   [label]: [value]
 * }
 * 
 * The front end expects `indexKey` = 'episode', and `uniqueId` to be a string between 'I' - 'VI',
 * while `label` is the ship name, and `value` equals its cost.
 */

/** Convert the source data to Nivo's format. See file for details. */
export function toNivoBarFormat(ships: IStarship[]) {
	const shipNames: string[] = []
	const shipsByFilmId: Record<number, Record<string, number>> = {
		1: {},
		2: {},
		3: {},
		4: {},
		5: {},
		6: {},
	}

	for (const ship of ships) {
		const cost = Number(ship.cost_in_credits)

		// ignore ships with missing/unknown costs
		if (!isNaN(cost) && cost > 0) {
			shipNames.push(ship.name)

			// add the cost to each episode
			for (const filmUrl of ship.films) {
				const filmId = getIdFromUrl(filmUrl)
				shipsByFilmId[filmId][ship.name] = cost
			}
		}
	}

	const result: CostBreakdown = {
		shipNames,
		costs: filmList.map(f => {
			const filmWithCost: BarDatum = {
				episode: f.filmNumeral,
				...shipsByFilmId[f.filmId],
			}

			return filmWithCost
		}),
	}

	return result
}
