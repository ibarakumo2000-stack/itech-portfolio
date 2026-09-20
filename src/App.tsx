import React, { useState, useEffect, Component } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WhatIDoPage } from './pages/WhatIDoPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { MusicPage } from './pages/MusicPage';
import { JourneyPage } from './pages/JourneyPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error boundary to prevent full-screen unmounting / blank screen crashes
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Unhandled UI error caught by ErrorBoundary:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0d0f18] border border-rose-500/30 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-display text-white">Something went wrong</h2>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              An unexpected error occurred while rendering this view. You can return to home or reload.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const getPathFromLocation = (): string => {
    if (typeof window === 'undefined') return '/';
    // Check hash first (e.g. #/about, #about)
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (hash && hash !== '') {
      const cleanHash = hash.replace(/\/$/, '');
      return `/${cleanHash}`;
    }
    const path = window.location.pathname.split('?')[0].replace(/\/$/, '') || '/';
    return path && path.length > 0 ? path : '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = getPathFromLocation();
      setCurrentPath(newPath);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Update browser URL and state
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', cleanPath);
    }
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const renderPage = () => {
    // Check if it is a project case study route: /projects/:slug
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '').replace(/\/$/, '');
      return <ProjectDetailPage slug={slug} onNavigate={navigateTo} />;
    }

    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/what-i-do':
        return <WhatIDoPage onNavigate={navigateTo} />;
      case '/projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case '/skills':
        return <SkillsPage onNavigate={navigateTo} />;
      case '/music':
        return <MusicPage onNavigate={navigateTo} />;
      case '/journey':
        return <JourneyPage onNavigate={navigateTo} />;
      case '/services':
        return <ServicesPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactPage onNavigate={navigateTo} />;
      case '/':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col font-sans">
      {/* Primary Sticky Multi-Page Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Dynamic Page Router Container */}
      <main className="flex-grow pt-20 sm:pt-24 min-h-[calc(100vh-320px)]">
        <ErrorBoundary>
          {renderPage()}
        </ErrorBoundary>
      </main>

      {/* Primary Footer with Page Links */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
