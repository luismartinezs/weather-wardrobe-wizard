import { NextApiRequest, NextApiResponse } from 'next'

import cors, { runMiddleware } from '@/lib/cors'
import { LocationSuggestion } from '@/types/weatherApi'
import { getGeocodingUrl } from '@/lib/openweather/urls'

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors)
    const { query } = req.query
    if (!query) {
      res.status(400).json({ error: 'Please provide a location query' })
      return
    }

    const url = `${getGeocodingUrl(query)}&limit=10&appid=${OPEN_WEATHER_API_KEY}`
    const response = await fetch(url)
    const data = (await response.json()).map((el: LocationSuggestion) => ({
      name: el.name,
      lat: el.lat,
      lon: el.lon,
      country: el.country,
      state: el.state,
    }))

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve location data' })
  }
}

export default handler