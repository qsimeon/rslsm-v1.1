'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Building2,
  GraduationCap,
  Heart,
  Users
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const team = [
  {
    name: 'Quilee Simeon',
    role: 'Project Lead',
    affiliation: 'MIT Brain and Cognitive Sciences',
    bio: 'PhD candidate at MIT Brain and Cognitive Sciences working on whole-brain voltage imaging in zebrafish. Leading the rsLSM v1.1 redesign and rebuild as part of consciousness research under Dr. Ed Boyden.',
    image: null,
    links: {
      email: 'quilee.simeon@gmail.com',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Corban Swain',
    role: 'Chief Architect & Builder',
    affiliation: 'MIT Media Lab',
    bio: 'Postdoctoral researcher in the Boyden Lab (PhD from MIT). Chief architect of the v1.1 rebuild, leading the optical and mechanical system design and assembly.',
    image: null,
    links: {
      email: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Shahar Bracha',
    role: 'Chief Scientist & Experimentalist',
    affiliation: 'MIT Media Lab',
    bio: 'Postdoctoral researcher in the Boyden Lab. Leading the consciousness imaging experiments using ketamine anesthesia in zebrafish once the microscope build is complete.',
    image: null,
    links: {
      email: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Zeguan Wang',
    role: 'Original Designer & Creator',
    affiliation: 'MIT Media Lab (Alumni)',
    bio: 'Designed and built the original rsLSM v1.0 system as part of his PhD thesis at MIT. Pioneered remote scanning light sheet microscopy for high-speed volumetric imaging.',
    image: null,
    links: {
      email: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Ed Boyden',
    role: 'Principal Investigator',
    affiliation: 'MIT Media Lab',
    bio: 'Professor at MIT Media Lab, McGovern Institute, and Koch Institute. Pioneer in optogenetics, expansion microscopy, and neural engineering. PI overseeing the rsLSM rebuild project.',
    image: null,
    links: {
      email: '#',
      linkedin: '#'
    }
  }
];

const acknowledgments = [
  {
    category: 'Funding',
    items: [
      'Google Research Grant for Zebrafish Consciousness Studies',
      'MIT Media Lab Consortium',
      'Boyden Lab Operating Funds'
    ]
  },
  {
    category: 'Technical Support',
    items: [
      'Thorlabs Application Engineering Team',
      'Newport Optical Table Systems',
      'IDEX/Semrock Filter Design Consultation'
    ]
  },
  {
    category: 'Academic Collaborators',
    items: [
      'Boyden Lab members for feedback and testing',
      'MIT BCS microscopy facility',
      'MIT.nano fabrication support'
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-4">
            About This Project
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Meet the team behind the rsLSM v1.1 rebuild and learn about our mission
            to advance whole-brain voltage imaging for consciousness research.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-primary-accent/20 to-cyan/10 rounded-2xl border border-primary-accent/30 p-8 md:p-12 mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-light mb-4">
            Our Mission
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            The rsLSM v1.1 project aims to enable the first-ever observation of consciousness
            dynamics across an entire vertebrate brain. By rebuilding and optimizing a
            remote-scanning light sheet microscope, we can capture voltage changes in every
            neuron of a zebrafish brain simultaneously, opening new frontiers in understanding
            how neural activity gives rise to conscious experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan mb-1">100,000+</div>
              <div className="text-sm text-text-secondary">Neurons Imaged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan mb-1">200 Hz</div>
              <div className="text-sm text-text-secondary">Volumetric Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan mb-1">Whole Brain</div>
              <div className="text-sm text-text-secondary">Coverage</div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-cyan" />
            <h2 className="text-2xl font-bold text-text-light">The Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-primary-surface border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/30 to-primary-accent/30 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-cyan">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-light">{member.name}</h3>
                    <p className="text-cyan font-medium">{member.role}</p>
                    <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
                      <Building2 className="w-3 h-3" />
                      {member.affiliation}
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary mt-4 text-sm leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800">
                  {member.links.email && (
                    <a
                      href={`mailto:${member.links.email}`}
                      className="p-2 rounded-lg bg-primary-bg hover:bg-cyan/20 text-text-secondary hover:text-cyan transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      className="p-2 rounded-lg bg-primary-bg hover:bg-cyan/20 text-text-secondary hover:text-cyan transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      className="p-2 rounded-lg bg-primary-bg hover:bg-cyan/20 text-text-secondary hover:text-cyan transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Acknowledgments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-cyan" />
            <h2 className="text-2xl font-bold text-text-light">Acknowledgments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {acknowledgments.map((section) => (
              <div
                key={section.category}
                className="bg-primary-surface border border-gray-800 rounded-xl p-6"
              >
                <h3 className="font-bold text-text-light mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-text-light mb-4">Get in Touch</h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Interested in collaborating or have questions about the rsLSM rebuild?
            We would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:quilee@mit.edu">
              <Button variant="primary">
                <Mail className="w-5 h-5" />
                Contact Us
              </Button>
            </a>
            <a href="https://boydenlab.org" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-5 h-5" />
                Visit Boyden Lab
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Citations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-primary-bg border border-gray-800 rounded-xl p-6"
        >
          <h3 className="font-bold text-text-light mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan" />
            How to Cite
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-cyan font-medium mb-2">Original rsLSM Design:</p>
              <code className="block text-sm text-text-secondary font-mono bg-primary-surface p-4 rounded-lg overflow-x-auto">
                Wang, Z., et al. (2023). Imaging the voltage of neurons distributed across entire brains of larval zebrafish. *bioRxiv*.
                <a
                  href="https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline ml-1"
                >
                  doi.org/10.1101/2023.12.15.571964
                </a>
              </code>
            </div>

            <div>
              <p className="text-sm text-cyan font-medium mb-2">This Build Documentation:</p>
              <code className="block text-sm text-text-secondary font-mono bg-primary-surface p-4 rounded-lg overflow-x-auto">
                Simeon, Q. (2026). rsLSM v1.1: Rebuilding a Remote-Scanning Light Sheet Microscope
                for Whole-Brain Voltage Imaging. MIT Media Lab, Boyden Lab.
                https://rslsm-v1-1.vercel.app
              </code>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
