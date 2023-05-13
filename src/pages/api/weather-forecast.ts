import { NextApiRequest, NextApiResponse } from 'next'

import cors, { runMiddleware } from '@/lib/cors'

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors)

    const { lat, lon } = req.query

    if (!lat || !lon) {
      res.status(400).json({ error: 'Insufficient data to fetch a weather forecast' })
      return
    }

    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&cnt=40`
    const response = await fetch(url)
    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather forecast' })
  }
}

export default handler