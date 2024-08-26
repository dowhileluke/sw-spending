import { CostBreakdown } from '../../../server/src/types'

export async function fetchCosts() {
	const response = await fetch('http://localhost:5004/api/costs')
	const costs = await response.json() as CostBreakdown

	return costs
}
