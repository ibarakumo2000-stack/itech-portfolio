// server/routes/contact.ts
import { Request, Response } from 'express';
import { sendInquiryEmail } from '../services/email';

// Simple in-memory rolling rate limiter: max 5 submissions per IP within 15 minutes
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipSubmissions = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Clean up stale IP records periodically without maintaining open background timers
function cleanupStaleIpRecords(): void {
  const now = Date.now();
  for (const [ip, record] of ipSubmissions.entries()) {
    if (now > record.resetTime) {
      ipSubmissions.delete(ip);
    }
  }
}

export async function handleContactSubmission(req: Request, res: Response): Promise<void> {
  cleanupStaleIpRecords();

  const clientIp = 
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
    (req.headers['x-real-ip'] as string) ||
    req.socket?.remoteAddress || 
    'unknown';

  // 1. Rate Limiting Check
  const now = Date.now();
  const currentRecord = ipSubmissions.get(clientIp);

  if (currentRecord) {
    if (now < currentRecord.resetTime) {
      if (currentRecord.count >= MAX_SUBMISSIONS_PER_WINDOW) {
        const remainingMinutes = Math.ceil((currentRecord.resetTime - now) / 60000);
        res.status(429).json({
          success: false,
          error: `Too many submissions from this IP. Please try again in ${remainingMinutes} minute(s) or use WhatsApp.`
        });
        return;
      }
      currentRecord.count += 1;
    } else {
      ipSubmissions.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }
  } else {
    ipSubmissions.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  }

  // 2. Validate Incoming Request Body
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid name (at least 2 characters).'
    });
    return;
  }

  if (name.trim().length > 100) {
    res.status(400).json({
      success: false,
      error: 'Name cannot exceed 100 characters.'
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.'
    });
    return;
  }

  if (email.trim().length > 120) {
    res.status(400).json({
      success: false,
      error: 'Email address cannot exceed 120 characters.'
    });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    res.status(400).json({
      success: false,
      error: 'Please provide a descriptive message (at least 10 characters).'
    });
    return;
  }

  if (message.trim().length > 3000) {
    res.status(400).json({
      success: false,
      error: 'Message cannot exceed 3,000 characters.'
    });
    return;
  }

  // 3. Dispatch Email via Service
  const sanitizedName = name.trim();
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedMessage = message.trim();

  const result = await sendInquiryEmail({
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage
  });

  if (!result.success) {
    const errorText = typeof result.error === 'string'
      ? result.error
      : (result.error ? JSON.stringify(result.error) : 'Failed to dispatch email via email service.');

    res.status(502).json({
      success: false,
      error: errorText
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Your message has been delivered to Ibarakumo.'
  });
}
