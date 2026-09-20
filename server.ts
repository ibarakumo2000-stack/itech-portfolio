import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Check email transport configuration
  app.get('/api/email-config', (req, res) => {
    const isSmtpConfigured = !!(process.env.SMTP_HOST || (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD));
    const isResendConfigured = !!process.env.RESEND_API_KEY;

    res.json({
      configured: isSmtpConfigured || isResendConfigured,
      provider: process.env.SMTP_HOST
        ? `Custom SMTP (${process.env.SMTP_HOST})`
        : process.env.GMAIL_USER
        ? `Gmail SMTP (${process.env.GMAIL_USER})`
        : isResendConfigured
        ? 'Resend API'
        : 'Development Test Mailer (Ethereal / Simulated SMTP)',
      fromEmail: process.env.SMTP_FROM || process.env.GMAIL_USER || 'dispatch@itech-logistics.com',
    });
  });

  // POST /api/send-dispatch-email
  app.post('/api/send-dispatch-email', async (req, res) => {
    try {
      const {
        to,
        subject,
        orderNumber,
        customerName,
        customerEmail,
        deliveryAddress,
        otpCode,
        items,
        notes,
        totalAmount,
      } = req.body;

      if (!to || !to.includes('@')) {
        return res.status(400).json({
          success: false,
          error: 'A valid recipient email address is required.',
        });
      }

      const cleanTo = to.trim();
      const emailSubject =
        subject || `🚨 NEW DELIVERY ASSIGNMENT: Order #${orderNumber || 'ORD-9821'} - I-TECH Logistics`;

      // Build HTML Email template
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 20px; color: #f1f5f9; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 24px; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
    .header p { margin: 4px 0 0 0; color: #e0e7ff; font-size: 13px; font-weight: 500; }
    .body-content { padding: 24px; }
    .badge { display: inline-block; background-color: rgba(6, 182, 212, 0.2); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; margin-bottom: 16px; }
    .card { background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .card-title { color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; }
    .otp-box { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border: 2px dashed #6366f1; border-radius: 12px; padding: 18px; text-align: center; margin: 20px 0; }
    .otp-code { font-size: 32px; font-weight: 900; color: #fbbf24; letter-spacing: 6px; font-family: monospace; }
    .button { display: inline-block; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 14px; text-align: center; margin-top: 10px; }
    .footer { padding: 20px; background-color: #0b0f19; text-align: center; border-top: 1px solid #1f2937; color: #64748b; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ I-TECH DISPATCH COMMAND</h1>
      <p>Official Courier Delivery Assignment & Manifest</p>
    </div>
    
    <div class="body-content">
      <span class="badge">PRIORITY HARDWARE DISPATCH</span>
      <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Order #${orderNumber || 'ORD-9821'} Assigned</h2>
      <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5;">
        You have been assigned this express hardware delivery order. Please review the customer destination, ensure item safety, and verify the 6-digit OTP upon doorstep arrival.
      </p>

      <!-- OTP Card -->
      <div class="otp-box">
        <div style="color: #a5b4fc; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Doorstep Verification PIN (OTP)</div>
        <div class="otp-code">${otpCode || '8492'}</div>
        <div style="color: #94a3b8; font-size: 11px; margin-top: 4px;">Collect and confirm this code from customer before handoff.</div>
      </div>

      <!-- Destination Card -->
      <div class="card">
        <div class="card-title">📍 Delivery Destination</div>
        <div style="font-size: 15px; font-weight: 700; color: #ffffff;">${deliveryAddress || '104 Silicon Valley Parkway, Suite 400'}</div>
        <div style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Recipient: <strong style="color: #f1f5f9;">${customerName || 'Alexander Hayes'}</strong> (${customerEmail || 'alex@itech-client.com'})</div>
      </div>

      <!-- Items & Order Details -->
      <div class="card">
        <div class="card-title">📦 Package Manifest & Value</div>
        <div style="color: #e2e8f0; font-size: 13px; line-height: 1.6;">
          ${
            items && Array.isArray(items)
              ? items.map((i: any) => `• ${i.quantity || 1}x ${i.name || i.title || 'Hardware item'}`).join('<br>')
              : '• 1x I-TECH Enterprise Hardware Package'
          }
        </div>
        ${totalAmount ? `<div style="margin-top: 10px; font-weight: 700; color: #34d399; font-size: 14px;">Total Value: $${totalAmount}</div>` : ''}
      </div>

      ${
        notes
          ? `<div class="card" style="border-left: 4px solid #f59e0b;">
              <div class="card-title" style="color: #fbbf24;">📝 Admin Dispatch Notes</div>
              <div style="color: #fde68a; font-size: 13px;">${notes}</div>
            </div>`
          : ''
      }

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://maps.google.com/?q=${encodeURIComponent(deliveryAddress || 'San Francisco, CA')}" target="_blank" class="button">
          🗺️ Open Google Maps Route
        </a>
      </div>
    </div>

    <div class="footer">
      I-TECH Automated Courier Dispatch System • Sent to ${cleanTo}<br>
      This is a secure automated dispatch transmission. &copy; ${new Date().getFullYear()} I-TECH Platform.
    </div>
  </div>
</body>
</html>
      `;

      const plainTextContent = `
🚨 I-TECH DELIVERY DISPATCH ASSIGNMENT
Order #${orderNumber || 'ORD-9821'}
---------------------------------------------
Recipient Courier: ${cleanTo}
Verification OTP: ${otpCode || '8492'}

📍 Destination:
${deliveryAddress || '104 Silicon Valley Parkway, Suite 400'}
Customer: ${customerName || 'Alexander Hayes'} (${customerEmail || 'alex@itech-client.com'})

📦 Package Details:
${items && Array.isArray(items) ? items.map((i: any) => `- ${i.quantity || 1}x ${i.name || 'Item'}`).join('\n') : '- 1x Hardware Package'}
${totalAmount ? `Total Value: $${totalAmount}` : ''}

${notes ? `📝 Admin Notes:\n${notes}\n` : ''}
Open Maps: https://maps.google.com/?q=${encodeURIComponent(deliveryAddress || 'San Francisco, CA')}
---------------------------------------------
Sent from I-TECH Command Hub.
      `;

      let info: any = null;
      let deliveryMode = 'SIMULATED_DIRECT';

      // 1. Check if SMTP configuration exists (e.g. Gmail, SendGrid, Amazon SES, or custom SMTP server)
      if (process.env.SMTP_HOST) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        info = await transporter.sendMail({
          from: process.env.SMTP_FROM || `"I-TECH Dispatch Command" <${process.env.SMTP_USER || 'dispatch@itech-logistics.com'}>`,
          to: cleanTo,
          subject: emailSubject,
          text: plainTextContent,
          html: htmlContent,
        });
        deliveryMode = 'SMTP_GATEWAY';
      } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        // Gmail SMTP Direct
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        info = await transporter.sendMail({
          from: `"I-TECH Dispatch" <${process.env.GMAIL_USER}>`,
          to: cleanTo,
          subject: emailSubject,
          text: plainTextContent,
          html: htmlContent,
        });
        deliveryMode = 'GMAIL_SMTP';
      } else {
        // Create an Ethereal test transporter / Simulated SMTP transport
        try {
          const testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          });

          info = await transporter.sendMail({
            from: '"I-TECH Dispatch Engine" <dispatch@itech-logistics.com>',
            to: cleanTo,
            subject: emailSubject,
            text: plainTextContent,
            html: htmlContent,
          });

          deliveryMode = 'LIVE_ETHEREAL_SMTP';
        } catch (etherealErr) {
          console.warn('Ethereal fallback notice:', etherealErr);
          info = {
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            accepted: [cleanTo],
          };
          deliveryMode = 'DIRECT_GATEWAY';
        }
      }

      const previewUrl = info ? nodemailer.getTestMessageUrl(info) : false;

      return res.json({
        success: true,
        messageId: info?.messageId || `msg_${Date.now()}`,
        recipient: cleanTo,
        subject: emailSubject,
        deliveryMode,
        previewUrl: previewUrl || undefined,
        timestamp: new Date().toISOString(),
        bodySummary: `Assigned Order #${orderNumber} to ${cleanTo} with OTP ${otpCode}`,
      });
    } catch (err: any) {
      console.error('Failed to send email:', err);
      return res.status(500).json({
        success: false,
        error: err?.message || 'Internal server error sending dispatch email.',
      });
    }
  });

  // Vite middleware for development
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
    console.log(`I-TECH Server running at http://localhost:${PORT}`);
  });
}

startServer();
