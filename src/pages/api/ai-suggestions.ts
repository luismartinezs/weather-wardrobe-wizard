import { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "@/utils/cors";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    const { forecast, locationName, countryName } = req.body;

    console.log(req.body);

    if (!forecast) {
      res.status(400).json({ error: "No forecast provided" });
      return;
    }

    if (!locationName) {
      res.status(400).json({ error: "No location name provided" });
      return;
    }

    const fullLocation = `${locationName}${
      countryName ? ` (${countryName})` : ""
    }`;

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: `I am going on a trip to ${fullLocation}. Suggest appropriate clothing and offer useful information relative to what items to pack, based on the location, the period of the year, and the weather forecast:\n\nLocation: ${fullLocation}\n\nSummarized weather forecast data:\n\n${JSON.stringify(
            forecast
          )}\n\n(temperature is in Celsius, humidity is in %, wind speed is in meters per second)`,
        },
      ],
    });

    res.status(200).json(completion.data.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: "Failed to process AI request" });
  }
};

export default handler;
