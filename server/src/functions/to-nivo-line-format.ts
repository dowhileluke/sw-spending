import { Serie, Datum } from '@nivo/line'
import { IStarship } from '../types'
import { getIdFromUrl } from './get-id-from-url'

const ORDERED_FILM_IDS = [4, 5, 6, 1, 2, 3]

/** return a cost representation for each of the six films */
function toFilmCosts(ship: IStarship) {
	const appearances: Partial<Record<number, boolean>> = {}

	for (const filmUrl of ship.films) {
		const filmId = getIdFromUrl(filmUrl)

		appearances[filmId] = true
	}

	return ORDERED_FILM_IDS.map(filmId => {
		const filmCost: Datum = {
			x: filmId,
			y: appearances[filmId] ? Number(ship.cost_in_credits) : 0, // no appearance = zero cost
		}

		return filmCost
	})
}

/** @deprecated convert starthips to their graphable costs per episode */
export function toNivoLineFormat(ships: IStarship[]) {
	return ships
		.filter(s => Number(s.cost_in_credits) > 0) // ignore ships with "unknown" or zero costs
		.map(s => {
			const formattedShip: Serie = {
				id: s.name,
				data: toFilmCosts(s),
			}

			return formattedShip
		})
}
