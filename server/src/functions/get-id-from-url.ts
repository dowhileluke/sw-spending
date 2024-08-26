/** e.g. convert 'https://swapi.info/api/starships/3' -> 3 */
export function getIdFromUrl(url: string) {
	const parts = url.split('/').filter(Boolean)

	return Number(parts.pop())
}
