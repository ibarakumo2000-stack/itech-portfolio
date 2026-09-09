// server/services/email.ts
import { contactConfig } from '../../src/data/socials';

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const PUBLIC_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'mail.com',
  'yandex.com'
]);

function cleanEnv(val: string | undefined): string {
  if (!val) return '';
  let trimmed = val.trim();
  // Strip outer quotes if present (e.g. from .env files or UI inputs)
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function resolveSafeFromEmail(rawFrom: string): string {
  if (!rawFrom) return 'Portfolio Inquiry <onboarding@resend.dev>';
  
  // Extract domain from email address (e.g. from "Name <user@domain.com>" or "user@domain.com")
  const domainMatch = rawFrom.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (domainMatch) {
    const domain = domainMatch[1].toLowerCase();
    // Public webmail domains cannot be verified on Resend and will cause 403 errors
    if (PUBLIC_EMAIL_DOMAINS.has(domain)) {
      return 'Portfolio Inquiry <onboarding@resend.dev>';
    }
  }

  if (!rawFrom.includes('<') && rawFrom.includes('@')) {
    return `Ibarakumo Portfolio <${rawFrom}>`;
  }

  return rawFrom;
}

export async function sendInquiryEmail({ name, email, message }: SendEmailParams): Promise<EmailResult> {
  const apiKey = cleanEnv(process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY);
  const recipientEmail = cleanEnv(process.env.CONTACT_EMAIL) || contactConfig.email;
  const rawFrom = cleanEnv(process.env.EMAIL_FROM);
  let fromEmail = resolveSafeFromEmail(rawFrom);

  if (!apiKey) {
    console.error('[EmailService] EMAIL_API_KEY / RESEND_API_KEY is not configured in server environment.');
    return {
      success: false,
      error: 'Server email service is not configured. Please set EMAIL_API_KEY in the server environment.'
    };
  }

  const subject = `New Portfolio Inquiry — ${name.trim()}`;
  const textContent = `New project inquiry received through the portfolio.

Name:
${name.trim()}

Email:
${email.trim()}

Message:
${message.trim()}

---
Sent from:
Ibarakumo Owonaro Portfolio`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0e17; color: #f1f5f9; padding: 24px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #131728; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; }
    .header { border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }
    .title { color: #38bdf8; font-size: 20px; font-weight: bold; margin: 0; }
    .subtitle { color: #94a3b8; font-size: 13px; margin-top: 4px; }
    .field-group { margin-bottom: 20px; }
    .field-label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 6px; }
    .field-value { background: #0b0e1b; border: 1px solid #1e293b; border-radius: 8px; padding: 12px 16px; color: #f8fafc; font-size: 15px; }
    .message-box { white-space: pre-wrap; line-height: 1.6; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">New Portfolio Project Inquiry</h1>
      <p class="subtitle">Sent from the Ibarakumo Owonaro Portfolio contact hub</p>
    </div>
    
    <div class="field-group">
      <div class="field-label">Sender Name</div>
      <div class="field-value">${escapeHtml(name)}</div>
    </div>
    
    <div class="field-group">
      <div class="field-label">Email Address (Reply-To)</div>
      <div class="field-value"><a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(email)}</a></div>
    </div>
    
    <div class="field-group">
      <div class="field-label">Project Message</div>
      <div class="field-value message-box">${escapeHtml(message)}</div>
    </div>
    
    <div class="footer">
      This message was sent securely from Ibarakumo Owonaro Portfolio. You can reply directly to this email to contact the sender.
    </div>
  </div>
</body>
</html>
`;

  const sendRequest = async (fromSender: string) => {
    const payload: {
      from: string;
      to: string[];
      reply_to?: string;
      subject: string;
      text: string;
      html: string;
    } = {
      from: fromSender,
      to: [recipientEmail],
      subject: subject,
      text: textContent,
      html: htmlContent
    };

    if (email && email.trim().includes('@')) {
      payload.reply_to = email.trim();
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'IbarakumoPortfolio/1.0 (https://resend.com)'
      },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as {
      id?: string;
      message?: string;
      name?: string;
      statusCode?: number;
      error?: string;
    };

    return { response, data };
  };

  try {
    let { response, data } = await sendRequest(fromEmail);

    // If initial dispatch failed with unverified domain error, retry once with onboarding@resend.dev
    if (!response.ok && data.message && data.message.includes('not verified') && fromEmail !== 'Portfolio Inquiry <onboarding@resend.dev>') {
      console.warn(`[EmailService] Custom sender "${fromEmail}" domain not verified on Resend. Retrying automatically with onboarding@resend.dev...`);
      const retryResult = await sendRequest('Portfolio Inquiry <onboarding@resend.dev>');
      response = retryResult.response;
      data = retryResult.data;
    }

    if (!response.ok) {
      console.warn('[EmailService] Resend API response status:', response.status, JSON.stringify(data));
      let errorMessage = data.message || data.error;
      if (!errorMessage && data.name === 'validation_error') {
        errorMessage = 'Email delivery notice: When using the testing sender onboarding@resend.dev, Resend permits sending only to your registered account email. Please verify your custom domain in Resend or use WhatsApp / Mail Client below.';
      }
      return {
        success: false,
        error: errorMessage || `Email delivery failed with status ${response.status}`
      };
    }

    return {
      success: true,
      messageId: data.id
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown network error';
    console.error('[EmailService] Network exception while sending email:', errorMsg);
    return {
      success: false,
      error: errorMsg
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

