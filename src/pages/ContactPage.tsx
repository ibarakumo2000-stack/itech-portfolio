import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { contactConfig, socialLinks } from '../data/socials';
import {
  ContactFormData,
  validateContactForm,
  generateWhatsAppUrl,
  generateWhatsAppMessage,
  getGeneralWhatsAppUrl,
  generateMailtoUrl,
  generateGmailWebUrl,
  sendContactEmail
} from '../lib/contact';
import {
  Phone,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Github,
  Linkedin,
  Palette,
  Dribbble,
  Instagram,
  Youtube,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Submission channel states
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [isPreparingWhatsApp, setIsPreparingWhatsApp] = useState(false);
  const [whatsAppSuccess, setWhatsAppSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (emailError) {
      setEmailError(null);
    }
  };

  // Option 1: WhatsApp submission flow
  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors as { [key: string]: string });
      return;
    }

    setIsPreparingWhatsApp(true);
    setErrors({});
    setEmailError(null);

    const waUrl = generateWhatsAppUrl(formData);
    setWhatsAppUrl(waUrl);

    setTimeout(() => {
      setIsPreparingWhatsApp(false);
      setWhatsAppSuccess(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  // Option 2: Direct silent background Email submission flow
  const handleEmailSubmit = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const validation = validateContactForm(formData);

      if (!validation.isValid) {
        setErrors(validation.errors as { [key: string]: string });
        return;
      }

      setIsSendingEmail(true);
      setErrors({});
      setEmailError(null);

      const result = await sendContactEmail(formData);
      setIsSendingEmail(false);

      if (result && result.success) {
        setEmailSuccess(true);
      } else {
        let safeError = 'Something went wrong while sending your message. Please try again or use WhatsApp.';
        if (result && typeof result.error === 'string') {
          safeError = result.error;
        } else if (result && result.error && typeof (result.error as any).message === 'string') {
          safeError = (result.error as any).message;
        }
        setEmailError(safeError);
      }
    } catch (err: unknown) {
      setIsSendingEmail(false);
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while sending your message.';
      setEmailError(message);
    }
  };

  const handleCopyMessage = () => {
    const msg = generateWhatsAppMessage(formData);
    navigator.clipboard.writeText(msg);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleResetForm = () => {
    setEmailSuccess(false);
    setWhatsAppSuccess(false);
    setEmailError(null);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'behance':
        return <Palette className="w-4 h-4" />;
      case 'dribbble':
        return <Dribbble className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="COMMUNICATION & INQUIRIES"
        title="HAVE AN IDEA? LET'S BUILD IT."
        subtitle="Whether you have a web project, software idea, AI solution, design need, or creative collaboration in mind, choose how you'd like to reach me."
        breadcrumbs={[{ label: 'Contact' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Action Buttons & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <GlassCard variant="glow" className="p-6 sm:p-8 space-y-6 border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Direct Channels</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Speak Directly With Ibarakumo
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    Choose your preferred communication channel for instant responses.
                  </p>
                </div>

                {/* Direct Call & WhatsApp Quick Actions */}
                <div className="space-y-3 pt-2">
                  {/* Call Button */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>PHONE CALL</span>
                      <span className="text-emerald-400 font-semibold">{contactConfig.call.display}</span>
                    </div>
                    <Button
                      variant="call"
                      size="lg"
                      href={contactConfig.call.tel}
                      icon={<Phone className="w-5 h-5" />}
                      className="w-full justify-center text-sm font-semibold"
                      aria-label="Call Ibarakumo"
                    >
                      CALL IBARAKUMO
                    </Button>
                  </div>

                  {/* WhatsApp Quick Chat */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>WHATSAPP MESSAGING</span>
                      <span className="text-[#4ade80] font-semibold">{contactConfig.whatsapp.display}</span>
                    </div>
                    <Button
                      variant="whatsapp"
                      size="lg"
                      href={getGeneralWhatsAppUrl()}
                      external
                      icon={<MessageSquare className="w-5 h-5" />}
                      className="w-full justify-center text-sm font-semibold"
                      aria-label="WhatsApp Ibarakumo"
                    >
                      CHAT ON WHATSAPP
                    </Button>
                  </div>
                </div>

                {/* Direct Info Badges */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{contactConfig.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{contactConfig.availability}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-slate-300">
                      {contactConfig.email}
                    </span>
                  </div>
                </div>

                {/* Social Connect Links */}
                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 font-semibold">
                    CONNECT WITH ME
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
                        aria-label={social.name}
                      >
                        {getSocialIcon(social.platform)}
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Contact & Project Inquiries Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <GlassCard variant="default" className="p-6 sm:p-8 border-slate-800">
                <div className="mb-6 pb-4 border-b border-slate-800/80">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Send a Project Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                    Fill out your project details below, then choose whether to send via WhatsApp or directly via Email.
                  </p>
                </div>

                {/* STATE 1: EMAIL SUCCESS */}
                {emailSuccess ? (
                  <div className="p-6 sm:p-8 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-5 animate-in fade-in">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white font-display">
                          MESSAGE DELIVERED
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Your message has been sent successfully to Ibarakumo (<span className="text-cyan-300 font-mono">{contactConfig.email}</span>). Thank you for reaching out! I'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/50 border border-slate-800/80 text-xs font-mono space-y-2">
                      <div className="text-slate-400 flex justify-between">
                        <span>SENDER:</span>
                        <span className="text-white font-semibold">{formData.name}</span>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>REPLY-TO:</span>
                        <span className="text-cyan-400 font-semibold">{formData.email}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-slate-300 whitespace-pre-line">
                        {formData.message}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleResetForm}
                        icon={<RefreshCw className="w-4 h-4" />}
                      >
                        SEND ANOTHER MESSAGE
                      </Button>
                      <Button
                        variant="whatsapp"
                        size="md"
                        href={getGeneralWhatsAppUrl()}
                        external
                        icon={<MessageSquare className="w-4 h-4" />}
                      >
                        CHAT ON WHATSAPP
                      </Button>
                    </div>
                  </div>
                ) : whatsAppSuccess ? (
                  /* STATE 2: WHATSAPP SUCCESS / DISPATCH */
                  <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-4 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          Ready to Send on WhatsApp!
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                          Your message has been formatted. If WhatsApp did not open automatically in a new tab, click the button below to complete sending to <strong className="text-white">{contactConfig.whatsapp.display}</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line">
                      {generateWhatsAppMessage(formData)}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        variant="whatsapp"
                        size="md"
                        href={whatsAppUrl}
                        external
                        icon={<ExternalLink className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        OPEN WHATSAPP NOW
                      </Button>

                      <Button
                        variant="secondary"
                        size="md"
                        onClick={handleCopyMessage}
                        icon={isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      >
                        {isCopied ? 'COPIED TO CLIPBOARD' : 'COPY MESSAGE'}
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        onClick={handleResetForm}
                      >
                        SEND ANOTHER
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* STATE 3: FORM INPUT */
                  <form
                    className="space-y-5"
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEmailSubmit(e);
                    }}
                  >
                    
                    {/* Error Banner if Email delivery fails */}
                    {emailError && (
                      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-3 animate-in fade-in">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-bold text-rose-300 uppercase tracking-wider block">UNABLE TO SEND EMAIL</span>
                            <p className="text-slate-300 leading-relaxed">
                              {typeof emailError === 'string' ? emailError : String(emailError || '')}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-rose-900/50 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            href={generateGmailWebUrl(formData)}
                            icon={<Mail className="w-3.5 h-3.5" />}
                            className="text-xs"
                          >
                            OPEN IN GMAIL
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            href={generateMailtoUrl(formData)}
                            icon={<Mail className="w-3.5 h-3.5" />}
                            className="text-xs"
                          >
                            SEND VIA MAIL CLIENT
                          </Button>
                          <Button
                            type="button"
                            variant="whatsapp"
                            size="sm"
                            onClick={handleWhatsAppSubmit}
                            icon={<MessageSquare className="w-3.5 h-3.5" />}
                            className="text-xs"
                          >
                            CHAT ON WHATSAPP
                          </Button>
                          <Button
                            type="button"
                            variant="call"
                            size="sm"
                            href={contactConfig.call.tel}
                            icon={<Phone className="w-3.5 h-3.5" />}
                            className="text-xs"
                          >
                            CALL IBARAKUMO
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSendingEmail || isPreparingWhatsApp}
                        placeholder="e.g. Alex Johnson"
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-400 text-sm focus:outline-none transition-all duration-200 ${
                          errors.name
                            ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/40'
                            : 'border-slate-800 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20'
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        Your Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSendingEmail || isPreparingWhatsApp}
                        placeholder="alex@company.com"
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-400 text-sm focus:outline-none transition-all duration-200 ${
                          errors.email
                            ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/40'
                            : 'border-slate-800 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20'
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        Project / Inquiries Message <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSendingEmail || isPreparingWhatsApp}
                        placeholder="Tell Ibarakumo about your project, goals, timeline, and requirements..."
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-400 text-sm focus:outline-none transition-all duration-200 resize-none ${
                          errors.message
                            ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/40'
                            : 'border-slate-800 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20'
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Dual-Channel Contact Action Selector */}
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          HOW WOULD YOU LIKE TO SEND IT?
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Option 1: WhatsApp */}
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                              <MessageSquare className="w-4 h-4" />
                              <span>WHATSAPP CHAT</span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Direct messaging with Ibarakumo on WhatsApp.
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="whatsapp"
                            size="md"
                            disabled={isSendingEmail || isPreparingWhatsApp}
                            onClick={handleWhatsAppSubmit}
                            icon={isPreparingWhatsApp ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                            className="w-full justify-center text-xs font-bold"
                          >
                            {isPreparingWhatsApp ? 'PREPARING...' : 'CHAT ON WHATSAPP'}
                          </Button>
                        </div>

                        {/* Option 2: Direct Silent Email */}
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                              <Mail className="w-4 h-4" />
                              <span>DIRECT EMAIL</span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Send inquiry directly to <span className="text-slate-300 font-mono">ibarakumo22@gmail.com</span>.
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="primary"
                            size="md"
                            disabled={isSendingEmail || isPreparingWhatsApp}
                            onClick={handleEmailSubmit}
                            icon={isSendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            className="w-full justify-center text-xs font-bold"
                          >
                            {isSendingEmail ? 'SENDING...' : 'SEND VIA EMAIL'}
                          </Button>
                        </div>
                      </div>

                      <p className="text-center text-[11px] font-mono text-slate-400 pt-1">
                        Silent email dispatches directly to Ibarakumo's inbox without opening third-party mail clients.
                      </p>
                    </div>

                  </form>
                )}

              </GlassCard>
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
};
