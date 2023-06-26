import { NextApiRequest, NextApiResponse } from "next";

import cors, { runMiddleware } from "@/util/cors";
import { getOneCallUrl } from "@/features/weather-forecast/utils/urls";

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    const { lat, lon } = req.query;

    if (!lat || !lon) {
      res
        .status(400)
        .json({ error: "Insufficient data to fetch a weather forecast" });
      return;
    }

    const url = `${getOneCallUrl(
      lat,
      lon
    )}&appid=${OPEN_WEATHER_API_KEY}&exclude=current,minutely,hourly`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather forecast" });
  }
};

export default handler;
