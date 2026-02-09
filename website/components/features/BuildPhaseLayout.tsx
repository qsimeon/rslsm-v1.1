'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  Menu,
  X,
  Lightbulb,
  Camera,
  Cpu,
  Code,
  BookOpen,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface BuildPhaseLayoutProps {
  phase: {
    number: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: string;
    status?: 'completed' | 'in-progress' | 'planned';
  };
  children: React.ReactNode;
  sections?: Array<{ id: string; label: string }>;
  previousPhase?: { href: string; title: string };
  nextPhase?: { href: string; title: string };
}

const phaseIcons: Record<number, any> = {
  0: BookOpen,
  1: Lightbulb,
  2: Camera,
  3: Cpu,
  4: Code,
};

const BuildPhaseLayout: React.FC<BuildPhaseLayoutProps> = ({
  phase,
  children,
  sections = [],
  previousPhase,
  nextPhase,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const PhaseIcon = phaseIcons[phase.number] || Lightbulb;

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section =>
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.find(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <Container size="full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-6 px-4">
          <Link href="/" className="hover:text-cyan transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/build" className="hover:text-cyan transition-colors">
            Build Guide
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-light">{phase.title}</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden px-4 mb-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-surface border border-gray-800 rounded-lg hover:border-cyan/50 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-cyan" />
            ) : (
              <Menu className="w-5 h-5 text-cyan" />
            )}
            <span className="text-sm text-text-light">
              {sidebarOpen ? 'Close' : 'Table of Contents'}
            </span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              {/* Phase Header Card */}
              <div className="bg-primary-surface border border-gray-800 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan/20 to-primary-accent/20 flex items-center justify-center">
                    <PhaseIcon className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <div className="text-xs text-cyan font-medium">
                      Phase {phase.number}
                    </div>
                    <div className="text-sm font-semibold text-text-light">
                      {phase.title}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Duration
                    </span>
                    <span>{phase.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Dates</span>
                    <span>{new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}</span>
                  </div>
                  {phase.status && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      phase.status === 'completed'
                        ? 'bg-success/20 text-success'
                        : phase.status === 'in-progress'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-gray-700 text-text-secondary'
                    }`}>
                      {phase.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                      {phase.status === 'completed' ? 'Complete' : phase.status === 'in-progress' ? 'In Progress' : 'Planned'}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              {sections.length > 0 && (
                <nav className="bg-primary-surface border border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-text-light mb-3">
                    On This Page
                  </h3>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === section.id
                              ? 'bg-cyan/10 text-cyan'
                              : 'text-text-secondary hover:bg-primary-accent/10 hover:text-text-light'
                          }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Back to Build Guide */}
              <Link
                href="/build"
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-cyan hover:text-cyan-hover transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Build Guide
              </Link>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-primary-bg border-r border-gray-800 overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 text-text-secondary hover:text-text-light"
                >
                  <X className="w-5 h-5" />
                </button>

                <nav className="mt-8">
                  <h3 className="text-sm font-semibold text-text-light mb-4">
                    On This Page
                  </h3>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === section.id
                              ? 'bg-cyan/10 text-cyan'
                              : 'text-text-secondary hover:bg-primary-accent/10 hover:text-text-light'
                          }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </motion.div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4">
            {/* Phase Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan/20 to-primary-accent/20 flex items-center justify-center shrink-0">
                  <PhaseIcon className="w-8 h-8 text-cyan" />
                </div>
                <div className="flex-1">
                  <span className="text-cyan text-sm font-medium">
                    Phase {phase.number}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-light mb-2">
                    {phase.title}
                  </h1>
                  <p className="text-lg md:text-xl text-text-secondary">
                    {phase.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            {children}

            {/* Navigation Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 mt-12 border-t border-gray-800"
            >
              {previousPhase ? (
                <Link href={previousPhase.href} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4" />
                    Previous: {previousPhase.title}
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextPhase ? (
                <Link href={nextPhase.href} className="w-full sm:w-auto">
                  <Button variant="default" className="w-full">
                    Next: {nextPhase.title}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/build" className="w-full sm:w-auto">
                  <Button variant="default" className="w-full">
                    Back to Build Guide
                  </Button>
                </Link>
              )}
            </motion.div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default BuildPhaseLayout;
