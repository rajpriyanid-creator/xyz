import app from './app';

// Vercel serverless function entrypoint
export default function handler(req: any, res: any) {
  return app(req, res);
}
