import React, { useState, useEffect } from 'react';
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

export default function App() {
  const getPathFromLocation = (): string => {
    if (typeof window === 'undefined') return '/';
    // Check hash first (e.g. #/about, #about)
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash && hash !== '') {
      return `/${hash}`;
    }
    const path = window.location.pathname;
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
        {renderPage()}
      </main>

      {/* Primary Footer with Page Links */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
