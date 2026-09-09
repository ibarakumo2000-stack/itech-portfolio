// server.ts
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { handleContactSubmission } from './server/routes/contact';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic security and parsing middleware
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  // API Routes First
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Ibarakumo Portfolio API',
      timestamp: new Date().toISOString()
    });
  });

  app.post('/api/contact', handleContactSubmission);

  // Vite middleware in development, static files in production
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
    console.log(`[Server] Ibarakumo Portfolio running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error during startup:', err);
  process.exit(1);
});
