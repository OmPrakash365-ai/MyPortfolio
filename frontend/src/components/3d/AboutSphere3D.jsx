import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary3D } from './ErrorBoundary3D';

function HolographicShield() {
  const coreRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.4;
    }
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.25;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Central 3D Icosahedron Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          wireframe
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Floating Torus Rings */}
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
      </mesh>

      <mesh ref={ring2} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Particle shell */}
      <points>
        <sphereGeometry args={[2.0, 24, 24]} />
        <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.4} />
      </points>
    </group>
  );
}

export const AboutSphere3D = () => {
  return (
    <div className="w-full h-52 sm:h-64 relative flex items-center justify-center">
      <ErrorBoundary3D
        fallback={
          <div className="w-36 h-36 rounded-full border border-cyan-500/30 animate-spin-slow"></div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <HolographicShield />
          </Float>
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
};
