'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Center,
  useGLTF,
  Html,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  autoRotate?: boolean;
}

function Model({ url, autoRotate = true }: ModelProps) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Center>
      <group ref={modelRef}>
        <primitive object={scene} scale={1} />
      </group>
    </Center>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mb-4" />
        <p className="text-cyan text-sm font-medium">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

function PlaceholderModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Optical table base */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4, 0.3, 2.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Table legs */}
      {[[-1.7, -2.5, -1], [1.7, -2.5, -1], [-1.7, -2.5, 1], [1.7, -2.5, 1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.1, 0.1, 2.3, 16]} />
          <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Laser module housing */}
      <mesh ref={meshRef} position={[-1.2, -0.5, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.5]} />
        <meshStandardMaterial color="#0f3460" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Beam path visualization */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>

      {/* Galvo scanner */}
      <mesh position={[0.2, -0.3, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Detection objective */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sample chamber */}
      <mesh position={[0.8, -0.7, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#00d9ff" transparent opacity={0.3} />
      </mesh>

      {/* Camera */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f3460" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Various optical posts */}
      {[[0.5, -0.85, 0.3], [-0.5, -0.85, -0.2], [1, -0.85, -0.3]].map((pos, i) => (
        <mesh key={`post-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

interface CADViewerProps {
  modelUrl?: string;
  className?: string;
  showPlaceholder?: boolean;
}

export default function CADViewer({
  modelUrl,
  className = '',
  showPlaceholder = true
}: CADViewerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`w-full h-full min-h-[400px] bg-gradient-to-b from-primary-bg to-primary-surface rounded-xl overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [5, 3, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0f', 1);
        }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d9ff" />

        <Suspense fallback={<LoadingFallback />}>
          {modelUrl && !hasError ? (
            <Model url={modelUrl} autoRotate />
          ) : showPlaceholder ? (
            <PlaceholderModel />
          ) : null}
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={2}
          maxDistance={20}
        />

        <Environment preset="city" />

        {/* Grid helper */}
        <gridHelper args={[10, 10, '#1a1a2e', '#0a0a0f']} position={[0, -3.7, 0]} />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-xs text-text-secondary/60 bg-primary-bg/80 px-3 py-2 rounded-lg backdrop-blur-sm">
        <span className="hidden sm:inline">Drag to rotate • Scroll to zoom • Shift+drag to pan</span>
        <span className="sm:hidden">Touch to rotate • Pinch to zoom</span>
      </div>
    </div>
  );
}

// Preload models for better performance
// useGLTF.preload('/models/rslsm.glb');
