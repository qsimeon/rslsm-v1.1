'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Lightbulb,
  Camera,
  Cpu,
  Code,
  ExternalLink,
  BookOpen,
  Microscope,
  Brain,
  Zap
} from 'lucide-react';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import PhaseCard from '@/components/ui/PhaseCard';
import Container from '@/components/ui/Container';
import { CADViewer } from '@/components/three';
import VideoPlayer from '@/components/ui/VideoPlayer';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-accent/10 to-transparent pointer-events-none" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-light leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We <span className="text-cyan">(re)designed</span> and{' '}
              <span className="text-cyan">(re)built</span> a remote scanning light sheet microscope to image voltage in a whole brain.{' '}
              <span className="text-cyan">From scratch.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building on{' '}
              <a
                href="https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline inline-flex items-center gap-1"
              >
                Zeguan Wang&apos;s pioneering rsLSM design
                <ExternalLink className="w-4 h-4" />
              </a>
              , we&apos;re rebuilding the microscope to enable whole-brain voltage imaging in zebrafish—a
              key step toward observing consciousness dynamics across an entire vertebrate brain.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/build">
                <Button variant="primary" size="lg">
                  Explore Build Guide <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/cad">
                <Button variant="secondary" size="lg">
                  View CAD Models
                </Button>
              </Link>
              <Link href="/bom">
                <Button variant="outline" size="lg">
                  Browse BOM
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Interactive 3D CAD Section */}
      <section className="py-12 md:py-20 bg-primary-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
              <Microscope className="inline-block w-8 h-8 mr-2 text-cyan" />
              The rsLSM v1.1
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Explore our full optical table design in 3D. This rebuild follows the optical
              principles established in Wang et al.&apos;s{' '}
              <a
                href="https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                rsLSM preprint
              </a>
              , optimized for whole-brain zebrafish voltage imaging.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-800"
          >
            <CADViewer
              modelUrl="/models/rslsm.glb"
              showPlaceholder={true}
              className="h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-6"
          >
            <Link href="/cad">
              <Button variant="secondary">
                View More CAD Models <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Original Design Attribution Section */}
      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-accent/20 to-cyan/10 rounded-2xl border border-primary-accent/30 p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-cyan" />
                  <span className="text-cyan text-sm font-medium uppercase tracking-wide">
                    Building on Prior Work
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-light mb-4">
                  Based on the Original rsLSM Design
                </h2>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  The rsLSM v1.1 is a rebuild of the remote-scanning light sheet microscope
                  originally designed and built by <strong className="text-text-light">Zeguan Wang</strong> as
                  part of his PhD thesis at MIT. Wang&apos;s groundbreaking work demonstrated that
                  remote scanning—using conjugate optics and piezo actuators—enables high-speed
                  volumetric imaging without sample motion, achieving rates of 100-500 Hz.
                </p>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Our v1.1 rebuild follows the same optical principles while incorporating
                  updated components and improved documentation for reproducibility. All credit
                  for the original innovation belongs to Wang and the Boyden Lab team.
                </p>
                <div className="bg-primary-bg/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-text-secondary font-mono mb-2">Citation:</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Wang, Z. et al. Imaging the voltage of neurons distributed across entire brains of larval zebrafish.{' '}
                    <em>bioRxiv</em> 2023.12.15.571964 (2023){' '}
                    <a
                      href="https://doi.org/10.1101/2023.12.15.571964"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan hover:underline inline-flex items-center gap-1"
                    >
                      doi:10.1101/2023.12.15.571964
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-primary-surface/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="font-bold text-text-light mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan" />
                    Key Innovations (Original rsLSM)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                      Remote focal scanning eliminates sample motion artifacts
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                      Achieves 100-500 Hz volumetric imaging rates
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                      Whole zebrafish brain coverage (~100,000 neurons)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                      Compatible with voltage-sensitive indicators
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-surface/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="font-bold text-text-light mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan" />
                    v1.1 Rebuild Goals
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                      Complete optical rebuild with updated components
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                      Comprehensive documentation for reproducibility
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                      Open-source CAD files and bill of materials
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                      Enable consciousness imaging experiments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-primary-surface/30">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="4 Months" label="Build Time" delay={0} animate={false} />
            <StatCard value="547" label="Components" delay={0.1} />
            <StatCard value="8" label="Vendors" delay={0.2} />
            <StatCard value="500 Hz" label="Volume Rate" delay={0.3} />
          </div>
        </Container>
      </section>

      {/* Zebrafish Neuron Video Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
                <Brain className="inline-block w-8 h-8 mr-2 text-cyan" />
                Whole-Brain Imaging
              </h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                The rsLSM enables simultaneous imaging of ~100,000 neurons across the entire
                zebrafish brain. This 3D visualization shows segmented neurons from a larval
                zebrafish, demonstrating the dense neural coverage possible with this technique.
              </p>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Combined with genetically encoded voltage indicators (GEVIs), this allows us
                to observe electrical activity patterns across the brain in real-time—a critical
                capability for studying the neural correlates of consciousness.
              </p>
              <Link href="/technical">
                <Button variant="secondary">
                  Read Technical Details <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden border border-gray-800"
            >
              {/* Video will be loaded from /videos/zebrafish-neurons.mp4 */}
              <VideoPlayer
                src="/videos/zebrafish-neurons.mp4"
                poster="/images/zebrafish-poster.jpg"
                title="3D Rotation of Segmented Zebrafish Neurons"
                autoPlay={true}
                loop={true}
                muted={true}
              />
              {/* Fallback placeholder if video not present */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 to-cyan/10 flex items-center justify-center -z-10">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-cyan/50 mx-auto mb-4" />
                  <p className="text-text-secondary text-sm">
                    Zebrafish Neuron Visualization
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Build Phase Cards Section */}
      <section className="py-16 md:py-24 bg-primary-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-light mb-4">
              Build Progression
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Four phases spanning September 2025 to January 2026, from initial design
              to final software integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PhaseCard
              phase={1}
              title="Illumination Path"
              description="Design and assemble the laser illumination system with remote scanning capabilities."
              dates="Sept 18 - Oct 15, 2025"
              href="/build/illumination"
              icon={Lightbulb}
              delay={0}
            />
            <PhaseCard
              phase={2}
              title="Imaging Path"
              description="Align detection optics and cameras for whole-brain voltage imaging."
              dates="Oct 16 - Nov 20, 2025"
              href="/build/imaging"
              icon={Camera}
              delay={0.1}
            />
            <PhaseCard
              phase={3}
              title="Electronics Integration"
              description="Assemble and integrate control electronics, DAQ systems, and power distribution."
              dates="Nov 21 - Dec 15, 2025"
              href="/build/electronics"
              icon={Cpu}
              delay={0.2}
            />
            <PhaseCard
              phase={4}
              title="Software Setup"
              description="Configure control and acquisition software for synchronized imaging."
              dates="Dec 16 - Jan 31, 2026"
              href="/build/software"
              icon={Code}
              delay={0.3}
            />
          </div>
        </Container>
      </section>

      {/* Featured Photos Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-light mb-4">
              Build in Progress
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Visual documentation of the complete rebuild process, from initial assembly
              to final integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative aspect-square bg-primary-surface rounded-lg overflow-hidden border border-gray-800 hover:border-cyan transition-all duration-300 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 to-cyan/10 flex items-center justify-center">
                  <div className="text-text-secondary text-sm font-mono">Photo {i}</div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-cyan text-sm font-semibold">View</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/build">
              <Button variant="secondary">
                View All Build Photos <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-primary-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-accent/20 to-cyan/10 rounded-2xl border border-primary-accent/30 p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
              Ready to explore the complete build?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Dive into the detailed build guide, explore 3D CAD models, or download
              the complete bill of materials with 547 components.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/build">
                <Button variant="primary" size="lg">
                  View Full Build Guide <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/bom">
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5" /> Download BOM
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
