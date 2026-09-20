import type { IncomingMessage, ServerResponse } from 'http';
import { handleContactSubmission } from '../server/routes/contact';

/**
 * Vercel Serverless Function entry point for /api/contact
 * Handles email dispatching when deployed to Vercel hosting.
 */
export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request.'
    });
  }

  // Parse body safely if it arrives as a stream, string, or object
  let body = req.body;
  if (!body) {
    try {
      body = await new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk: any) => { data += chunk; });
        req.on('end', () => {
          try { resolve(JSON.parse(data)); } catch { resolve({}); }
        });
        req.on('error', () => resolve({}));
      });
    } catch {
      body = {};
    }
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON payload format.'
      });
    }
  }
  req.body = body;

  try {
    await handleContactSubmission(req, res);
  } catch (err: unknown) {
    console.error('[Vercel Serverless] Error in contact handler:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return res.status(500).json({
      success: false,
      error: `Failed to process contact inquiry: ${message}`
    });
  }
}
