import path from 'path';
import { createServer as createViteServer } from 'vite';
import express from 'express';
import { app } from './api/index';

const PORT = 3000;

async function startServer() {
  // If running in Vercel serverless environment, skip manual port binding
  if (process.env.VERCEL) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CreatorOS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

export default app;
