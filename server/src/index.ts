import express from 'express'
import cors from 'cors'
import { fetchShips } from './functions/fetch-ships'
import { toNivoBarFormat } from './functions/to-nivo-bar-format'
import { toNivoLineFormat } from './functions/to-nivo-line-format'

const app = express()

app.use(cors())

// the line chart had tooltip issues and was scrapped
app.get('/api/starships', async (_, res) => {
	const ships = await fetchShips()

	res.json(toNivoLineFormat(ships))
})

app.get('/api/costs', async (_, res) => {
	const ships = await fetchShips()

	res.json(toNivoBarFormat(ships))
})

app.listen(5004, () => console.log('sw-spending-server running...'))
