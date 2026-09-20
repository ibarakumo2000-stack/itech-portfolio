import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerPage } from '../../types';
import { ItechLogo } from '../common/ItechLogo';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

export const AuthPages: React.FC<{ activeAuthPage: CustomerPage }> = ({ activeAuthPage }) => {
  const {
    setCustomerPage,
    setCurrentUser,
    setPortalMode,
    setAdminPage,
    addToast,
  } = useApp();

  // Login state
  const [email, setEmail] = useState('Admin@itech.com');
  const [password, setPassword] = useState('admin@itech');
  const [showPassword, setShowPassword] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // OTP state
  const [otpValues, setOtpValues] = useState(['8', '4', '9', '2', '', '']);
  const [phoneOtpValues, setPhoneOtpValues] = useState(['5', '9', '1', '2', '', '']);
  const [tfaCode, setTfaCode] = useState('');

  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === 'admin@itech.com' && password === 'admin@itech') {
      setCurrentUser({
        id: 'usr-admin',
        name: 'Chief Administrator',
        email: 'Admin@itech.com',
        role: 'ADMIN',
        phone: '+1 (800) 555-0199',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        createdAt: '2026-01-01',
        isVerified: true,
        walletBalance: 8540.00,
        referralCode: 'ITECH-ADMIN',
        twoFactorEnabled: true,
      });
      setPortalMode('admin');
      setAdminPage('admin-overview');
      addToast('success', 'Admin Authorized', 'Welcome back, Administrator. Full permissions granted.');
    } else {
      // Default customer login
      setCurrentUser({
        id: 'user-custom-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: 'CUSTOMER',
        phone: '+1 (415) 555-0198',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString(),
        isVerified: true,
        walletBalance: 150.00,
        referralCode: 'ITECH-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      });
      setCustomerPage('cust-home');
      addToast('success', 'Welcome Back', `Logged in as ${email}`);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPassword) {
      addToast('warning', 'Missing Details', 'Please complete all required fields.');
      return;
    }
    setCustomerPage('auth-verify-email');
    addToast('info', 'Verification Sent', `We sent a 6-digit confirmation code to ${regEmail}.`);
  };

  const authNavigationTabs: { id: CustomerPage; label: string }[] = [
    { id: 'auth-login', label: 'Login' },
    { id: 'auth-register', label: 'Register' },
    { id: 'auth-forgot-password', label: 'Forgot Password' },
    { id: 'auth-reset-password', label: 'Reset Password' },
    { id: 'auth-verify-email', label: 'Verify Email' },
    { id: 'auth-verify-phone', label: 'Verify Phone' },
    { id: 'auth-otp', label: 'OTP Verification' },
    { id: 'auth-2fa', label: 'Two Factor (2FA)' },
  ];

  return (
    <div className="min-h-[85vh] bg-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6">
      {/* Sub tabs for viewing each auth screen */}
      <div className="max-w-xl mx-auto w-full mb-6 bg-white p-1 rounded-2xl shadow-xs border border-slate-200 overflow-x-auto no-scrollbar">
        <div className="flex gap-1 min-w-max">
          {authNavigationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCustomerPage(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeAuthPage === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <ItechLogo variant="light" size="lg" />
          <p className="text-xs text-slate-500 mt-2">Enterprise Auth & Multi-Factor Identity</p>
        </div>

        {/* 1. LOGIN SCREEN */}
        {activeAuthPage === 'auth-login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Quick Demo Credentials Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>Admin Demo Account Credentials:</span>
              </div>
              <div className="mt-1 font-mono text-[11px] space-y-0.5">
                <div>Email: <strong className="text-slate-900">Admin@itech.com</strong></div>
                <div>Password: <strong className="text-slate-900">admin@itech</strong></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('Admin@itech.com');
                  setPassword('admin@itech');
                }}
                className="mt-2 text-[11px] font-bold text-amber-700 hover:text-amber-900 underline"
              >
                Auto-fill Admin Credentials
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setCustomerPage('auth-forgot-password')}
                  className="text-[11px] text-indigo-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Sign In</span>
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setCustomerPage('auth-register')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Register Now
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTER SCREEN */}
        {activeAuthPage === 'auth-register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  placeholder="Alexander Hayes"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Corporate or Personal Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  placeholder="alex.hayes@enterprise.io"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone (for Delivery SMS & OTP)</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  placeholder="+1 (415) 555-0198"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
            >
              <span>Create Account & Verify</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setCustomerPage('auth-login')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD */}
        {activeAuthPage === 'auth-forgot-password' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your verified email address to receive a secure cryptographic password reset token.
            </p>

            {resetEmailSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-emerald-900">Reset Instructions Dispatched</div>
                <p className="text-[11px] text-emerald-700">Check your inbox for a secure one-time reset link.</p>
                <button
                  onClick={() => setCustomerPage('auth-reset-password')}
                  className="mt-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Proceed to Reset Password
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.hayes@enterprise.io"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <button
                  onClick={() => setResetEmailSent(true)}
                  className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
                >
                  Send Reset Token
                </button>
              </div>
            )}

            <button
              onClick={() => setCustomerPage('auth-login')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* 4. RESET PASSWORD */}
        {activeAuthPage === 'auth-reset-password' && (
          <div className="space-y-4">
            {resetPasswordSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-emerald-900">Password Updated Successfully</div>
                <p className="text-[11px] text-emerald-700">You can now sign in with your updated credentials.</p>
                <button
                  onClick={() => setCustomerPage('auth-login')}
                  className="mt-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    setResetPasswordSuccess(true);
                    addToast('success', 'Password Updated', 'Your security password has been changed.');
                  }}
                  className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
                >
                  Save New Password
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. VERIFY EMAIL */}
        {activeAuthPage === 'auth-verify-email' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verify Your Email Address</h3>
            <p className="text-xs text-slate-500">
              We sent a 6-digit confirmation code to <strong className="text-slate-800">alex.hayes@enterprise.io</strong>.
            </p>

            {emailVerified ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Email Verified! Redirecting...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => {
                        const copy = [...otpValues];
                        copy[idx] = e.target.value;
                        setOtpValues(copy);
                      }}
                      className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-600 outline-none"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setEmailVerified(true);
                    setTimeout(() => setCustomerPage('cust-home'), 1000);
                  }}
                  className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow"
                >
                  Verify Email
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. VERIFY PHONE */}
        {activeAuthPage === 'auth-verify-phone' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verify Mobile Phone Number</h3>
            <p className="text-xs text-slate-500">
              SMS passcode sent to <strong className="text-slate-800">+1 (415) 555-0198</strong> for real-time delivery notices.
            </p>

            {phoneVerified ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Phone Number Verified!</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {phoneOtpValues.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => {
                        const copy = [...phoneOtpValues];
                        copy[idx] = e.target.value;
                        setPhoneOtpValues(copy);
                      }}
                      className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setPhoneVerified(true);
                    setTimeout(() => setCustomerPage('cust-home'), 1000);
                  }}
                  className="w-full bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow"
                >
                  Confirm Phone Number
                </button>
              </div>
            )}
          </div>
        )}

        {/* 7. OTP SCREEN */}
        {activeAuthPage === 'auth-otp' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">One-Time Security Passcode (OTP)</h3>
            <p className="text-xs text-slate-500">
              Enter the 6-digit cryptographic authentication code sent to your registered device.
            </p>

            <div className="flex justify-center gap-2">
              {['8', '4', '9', '2', '0', '1'].map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  defaultValue={val}
                  className="w-10 h-12 text-center text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-600 outline-none"
                />
              ))}
            </div>

            <button
              onClick={() => {
                addToast('success', 'OTP Verified', 'Authentication successful.');
                setCustomerPage('cust-home');
              }}
              className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* 8. TWO FACTOR AUTH */}
        {activeAuthPage === 'auth-2fa' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-slate-500">
              Open your Google Authenticator or hardware security key app to retrieve your rotating 6-digit token.
            </p>

            <div>
              <input
                type="text"
                placeholder="123 456"
                value={tfaCode}
                onChange={(e) => setTfaCode(e.target.value)}
                className="w-48 text-center text-xl tracking-widest font-mono font-bold py-2 bg-slate-50 border border-slate-300 rounded-xl mx-auto block"
              />
            </div>

            <button
              onClick={() => {
                addToast('success', '2FA Accepted', 'Two-Factor token validated.');
                setCustomerPage('cust-home');
              }}
              className="w-full bg-purple-600 text-white font-bold text-xs py-2.5 rounded-xl shadow"
            >
              Verify Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
