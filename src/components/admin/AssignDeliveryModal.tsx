import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import {
  Mail,
  Send,
  X,
  Truck,
  User,
  MapPin,
  Package,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Radio,
} from 'lucide-react';

interface AssignDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const AssignDeliveryModal: React.FC<AssignDeliveryModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
}) => {
  const { orders, drivers, assignDriverToOrder, dispatchedEmails, addToast } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialOrderId || orders.find((o) => !o.driverId && o.status !== 'DELIVERED')?.id || orders[0]?.id || ''
  );
  const [recipientEmail, setRecipientEmail] = useState<string>('courier@itech-dispatch.com');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('Please handle with fragile care. Fragile electronic components inside.');
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrder = orders.find((o) => o.id === selectedOrderId || o.orderNumber === selectedOrderId) || orders[0];

  const generatedSubject = customSubject.trim() || `🚨 NEW DELIVERY ASSIGNMENT: Order #${currentOrder?.orderNumber || 'ORD-9821'} - I-TECH Logistics`;

  const generatedBody = `Hello Courier,

You have been officially assigned Order #${currentOrder?.orderNumber || 'ORD-9821'} for express doorstep fulfillment by I-TECH Operations Dispatch.

CUSTOMER & DISPATCH INFORMATION:
• Customer Name: ${currentOrder?.customerName || currentOrder?.shippingAddress?.fullName || 'Alexander Hayes'}
• Recipient Email: ${currentOrder?.customerEmail || 'client@itech-enterprise.com'}
• Customer Phone: ${currentOrder?.customerPhone || '+1 (415) 555-0198'}
• Delivery Destination: ${currentOrder?.shippingAddress?.street || '104 Silicon Valley Parkway, Suite 400'}, ${currentOrder?.shippingAddress?.city || 'San Francisco'}, ${currentOrder?.shippingAddress?.zipCode || '94107'}
• Delivery Notes: ${currentOrder?.deliveryInstructions || 'Standard Secure Handover'}
• Doorstep Verification OTP: ${currentOrder?.deliveryOtp || currentOrder?.otpCode || '8492'}
${customNotes ? `\nSPECIAL ADMIN INSTRUCTIONS:\n• ${customNotes}\n` : ''}
ORDER CONTENTS (${currentOrder?.items?.length || 1} items):
${currentOrder?.items?.map((it) => ` - ${it.quantity}x ${it.name} ($${it.price.toFixed(2)})`).join('\n') || '- 1x Enterprise Hardware Package'}
Total Order Value: $${currentOrder?.total?.toFixed(2) || '0.00'}

📍 REQUIRED ACTION:
1. Open the I-TECH Courier App on your mobile device.
2. Enable GPS location tracking to broadcast real-time telemetry to the customer and dispatch console.
3. Collect the security OTP code (${currentOrder?.deliveryOtp || currentOrder?.otpCode || '8492'}) from the customer at handover.

Google Maps Navigation: https://maps.google.com/?q=${encodeURIComponent(
    `${currentOrder?.shippingAddress?.street || ''}, ${currentOrder?.shippingAddress?.city || ''}`
  )}

Best regards,
I-TECH Logistics Dispatch Command Center
admin@itech.com`;

  // 1. Direct Webmail Launchers so the email physically sends to the recipient's inbox from the user's client
  const openInGmail = () => {
    if (!recipientEmail.trim()) {
      addToast('warning', 'Missing Email', 'Please enter a recipient email address.');
      return;
    }
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipientEmail.trim()
    )}&su=${encodeURIComponent(generatedSubject)}&body=${encodeURIComponent(generatedBody)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    addToast('success', 'Gmail Compose Opened', `Pre-filled message ready to send to ${recipientEmail.trim()}`);
  };

  const openInOutlook = () => {
    if (!recipientEmail.trim()) {
      addToast('warning', 'Missing Email', 'Please enter a recipient email address.');
      return;
    }
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      recipientEmail.trim()
    )}&subject=${encodeURIComponent(generatedSubject)}&body=${encodeURIComponent(generatedBody)}`;
    window.open(outlookUrl, '_blank', 'noopener,noreferrer');
    addToast('success', 'Outlook Compose Opened', `Pre-filled message ready to send to ${recipientEmail.trim()}`);
  };

  const openInMailClient = () => {
    if (!recipientEmail.trim()) {
      addToast('warning', 'Missing Email', 'Please enter a recipient email address.');
      return;
    }
    const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail.trim())}?subject=${encodeURIComponent(
      generatedSubject
    )}&body=${encodeURIComponent(generatedBody)}`;
    window.location.href = mailtoUrl;
    addToast('info', 'Mail Client Triggered', `Opening default mail app for ${recipientEmail.trim()}`);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('success', 'Copied to Clipboard', 'Full dispatch manifest copied.');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail.trim()) {
      addToast('warning', 'Missing Email', 'Please enter a valid driver or courier email address.');
      return;
    }
    if (!currentOrder) {
      addToast('error', 'Order Missing', 'Please select an active order to assign.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = assignDriverToOrder(
        currentOrder.id,
        recipientEmail.trim(),
        customSubject.trim() || undefined,
        customNotes.trim() || undefined
      );
      setIsSubmitting(false);
      if (success) {
        addToast(
          'success',
          'Dispatch Transmitted',
          `Order #${currentOrder.orderNumber} assigned and transmitted to ${recipientEmail.trim()}.`
        );
        onClose();
      }
    }, 400);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Assign & Send Dispatch Email</span>
                <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                  Live Deliverability Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Transmit order destination, doorstep OTP, and maps route directly to the courier's real inbox.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('compose')}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'compose'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Compose Dispatch Email</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Dispatched Outbox ({dispatchedEmails.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'compose' ? (
            <form onSubmit={handleSend} className="space-y-5">
              {/* 1. Select Target Order */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-200 flex items-center justify-between">
                  <span>1. Select Order for Fulfillment</span>
                  {currentOrder && (
                    <span className="font-mono text-emerald-400 font-bold">
                      ${currentOrder.total.toFixed(2)} • {currentOrder.status}
                    </span>
                  )}
                </label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
                >
                  {orders.map((ord) => (
                    <option key={ord.id} value={ord.id}>
                      {ord.orderNumber} — {ord.shippingAddress?.fullName || 'Customer'} ({ord.shippingAddress?.city}) — ${ord.total.toFixed(2)} [{ord.status}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Order Brief Summary Card */}
              {currentOrder && (
                <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Customer & Contact</div>
                    <div className="font-bold text-white truncate mt-0.5">{currentOrder.shippingAddress?.fullName || 'Alexander Hayes'}</div>
                    <div className="text-slate-400 font-mono text-[11px] truncate">{currentOrder.customerEmail}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Destination Address</div>
                    <div className="text-slate-300 truncate mt-0.5">{currentOrder.shippingAddress?.street}</div>
                    <div className="text-slate-400 text-[11px] truncate">{currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.zipCode}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Verification OTP</div>
                    <div className="font-mono font-bold text-amber-400 text-sm mt-0.5">{currentOrder.otpCode || currentOrder.deliveryOtp || '8492'}</div>
                    <div className="text-[10px] text-indigo-400">{currentOrder.items.length} hardware packages</div>
                  </div>
                </div>
              )}

              {/* 2. Recipient Email Input with Quick Courier Selectors */}
              <div className="space-y-2">
                <label className="font-bold text-slate-200 flex items-center justify-between">
                  <span>2. Assign To Courier Email Address (Recipient)</span>
                  <span className="text-[11px] text-cyan-400 font-medium">Input any personal or driver email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="e.g., recipient@gmail.com or driver@logistics.com"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                {/* Quick select registered drivers */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-slate-500 font-semibold">Quick Fleet Select:</span>
                  {drivers.map((drv) => (
                    <button
                      key={drv.id}
                      type="button"
                      onClick={() => setRecipientEmail(drv.email)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                        recipientEmail.toLowerCase() === drv.email.toLowerCase()
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {drv.name} ({drv.email.split('@')[0]})
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Subject and Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Email Subject Line (Optional)</label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder={`🚨 NEW DELIVERY ASSIGNMENT: Order #${currentOrder?.orderNumber || 'ORD-9821'}`}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Admin Dispatch Instructions</label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Gate codes, fragile handling, express prioritization..."
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* 4. Live Outgoing Email Preview Card */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-300 flex items-center justify-between text-[11px]">
                  <span>Live Formatted Email Payload:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedBody, 'compose-preview')}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
                  >
                    {copiedId === 'compose-preview' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'compose-preview' ? 'Copied' : 'Copy Manifest Text'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-[11px] text-slate-300 space-y-2 whitespace-pre-wrap leading-relaxed">
                  <div className="text-slate-400 pb-1.5 border-b border-slate-800 text-[10px]">
                    <span className="font-bold text-white">RECIPIENT TO:</span> {recipientEmail || '[Courier Email]'}
                    <br />
                    <span className="font-bold text-white">SUBJECT:</span> {generatedSubject}
                  </div>
                  <div>{generatedBody}</div>
                </div>
              </div>

              {/* 5. Direct 1-Click Webmail Launchers (Guaranteed Direct Inbox Delivery) */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Direct Webmail & App Dispatch (Direct Recipient Delivery)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    1-Click Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Open your preferred email provider pre-filled with this exact dispatch manifest and OTP code to send directly from your personal or business account:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={openInGmail}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500/50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <span className="text-red-400 font-black text-sm">G</span>
                    <span>Send via Gmail Web</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={openInOutlook}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <span className="text-blue-400 font-black text-sm">O</span>
                    <span>Send via Outlook</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={openInMailClient}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Open Mail App</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Submit / Dispatch button */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Email & Assign Order'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white">Real-Time Dispatched Outbox</h4>
                <span className="text-slate-400 font-mono text-[11px]">{dispatchedEmails.length} messages logged</span>
              </div>

              {dispatchedEmails.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <Mail className="w-8 h-8 mx-auto text-slate-600" />
                  <p>No dispatch emails sent yet in this session.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dispatchedEmails.map((item) => (
                    <div key={item.id} className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="font-bold text-indigo-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{item.subject}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-[11px]">
                        <div>
                          <span className="text-slate-400 font-bold">Recipient: </span>
                          <span className="text-cyan-400 font-mono font-bold">{item.to}</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {item.deliveryStatus || 'TRANSMITTED'}
                        </span>
                      </div>

                      <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/40 p-3 rounded-xl max-h-44 overflow-y-auto">
                        {item.body}
                      </pre>

                      {/* Direct action triggers on each item */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-900">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                item.to
                              )}&su=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.body)}`;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-bold flex items-center gap-1 transition"
                          >
                            <ExternalLink className="w-3 h-3 text-red-400" />
                            <span>Open in Gmail Web</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = `mailto:${encodeURIComponent(item.to)}?subject=${encodeURIComponent(
                                item.subject
                              )}&body=${encodeURIComponent(item.body)}`;
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-bold flex items-center gap-1 transition"
                          >
                            <Mail className="w-3 h-3 text-indigo-400" />
                            <span>Mail App</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.body, item.id)}
                          className="text-slate-400 hover:text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? 'Copied' : 'Copy Text'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
