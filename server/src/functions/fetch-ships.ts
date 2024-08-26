import fetch from 'node-fetch'
import { IStarship } from '../types'

/** retrieves starship data from the original source */
export async function fetchShips() {
	const response = await fetch('https://swapi.info/api/starships')
	const ships = await response.json() as IStarship[]

	return ships
}
