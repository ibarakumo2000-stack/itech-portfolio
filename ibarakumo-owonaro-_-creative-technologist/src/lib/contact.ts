import { contactConfig } from '../data/socials';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Please enter your message.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters so Ibarakumo can understand your request.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateWhatsAppMessage(data: ContactFormData): string {
  return `Hello Ibarakumo,

I would like to discuss a project with you.

Name:
${data.name.trim()}

Email:
${data.email.trim()}

Message:
${data.message.trim()}`;
}

export function generateWhatsAppUrl(data: ContactFormData): string {
  const text = generateWhatsAppMessage(data);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${contactConfig.whatsapp.raw}?text=${encodedText}`;
}

export function getGeneralWhatsAppUrl(): string {
  const encodedText = encodeURIComponent(contactConfig.whatsapp.defaultMessage);
  return `https://wa.me/${contactConfig.whatsapp.raw}?text=${encodedText}`;
}

export function generateMailtoUrl(data: ContactFormData): string {
  const subject = encodeURIComponent(`Project Inquiry — ${data.name.trim()}`);
  const body = encodeURIComponent(`Hi Ibarakumo,

${data.message.trim()}

---
From: ${data.name.trim()}
Email: ${data.email.trim()}`);
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
}

/**
 * Sends the contact inquiry silently to the backend /api/contact endpoint.
 * Works seamlessly with both full-stack Node/Express and Vercel Serverless deployments.
 */
export async function sendContactEmail(data: ContactFormData): Promise<SendEmailResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim()
      })
    });

    const contentType = response.headers.get('content-type') || '';
    let responseData: { success?: boolean; message?: string; error?: string } = {};

    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }
    } else {
      const rawText = await response.text().catch(() => '');
      if (response.status === 404 || rawText.includes('The page could not be found')) {
        return {
          success: false,
          error: 'The backend email service endpoint (/api/contact) was not reached. Please ensure your Vercel deployment has EMAIL_API_KEY environment variable configured.'
        };
      }
      if (!response.ok) {
        return {
          success: false,
          error: `Server returned HTTP ${response.status}. Please use WhatsApp or Mail Client below.`
        };
      }
    }

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || `Server error (${response.status}). Please try WhatsApp or Mail Client.`
      };
    }

    return {
      success: true,
      message: responseData.message || 'Your message has been delivered to Ibarakumo.'
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network connection failed.';
    return {
      success: false,
      error: errorMsg
    };
  }
}
