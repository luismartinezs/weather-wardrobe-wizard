import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  ...(process.env.NODE_ENV === 'production' ? {
    origin: 'https://weather-wardrobe-wizard.netlify.app'
  } : {})
})

// Middleware runner
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result as void);
    });
  });
}

export default cors
