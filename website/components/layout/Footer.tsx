import React from 'react';
import Link from 'next/link';
import { Microscope, Mail, Github, Linkedin } from 'lucide-react';

const footerLinks = {
  sections: [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Build Guide', href: '/build' },
        { name: 'CAD Models', href: '/cad' },
        { name: 'BOM', href: '/bom' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Timeline', href: '/timeline' },
        { name: 'Downloads', href: '/resources' },
        { name: 'Technical Docs', href: '/technical' },
        { name: 'About', href: '/about' },
      ],
    },
  ],
  social: [
    { name: 'Email', icon: Mail, href: 'mailto:qsimeon@mit.edu' },
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ],
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-bg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Microscope className="w-6 h-6 text-cyan" />
              <span className="text-text-light font-bold text-xl">rsLSM v1.1</span>
            </div>
            <p className="text-text-secondary text-sm mb-4 max-w-md">
              Complete rebuild documentation of a remote-scanning lightsheet microscope
              for whole-brain zebrafish voltage imaging. A groundbreaking project to
              observe consciousness across an entire vertebrate brain.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-lg bg-primary-surface flex items-center justify-center text-text-secondary hover:text-cyan hover:bg-primary-accent transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-text-light font-semibold text-sm mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-cyan text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {currentYear} Quilee Simeon. All rights reserved.</p>
            <p className="hidden md:block">•</p>
            <p>Built with Next.js, hosted on Vercel</p>
          </div>
          <div>
            <p>Last updated: February 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
