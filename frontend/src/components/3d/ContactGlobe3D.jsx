import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary3D } from './ErrorBoundary3D';

function CommGlobe() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.15;
      ringRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group>
      {/* Wireframe Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 18, 18]} />
        <meshStandardMaterial
          wireframe
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.4, 0.02, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
      </mesh>

      {/* Pulsing Beacon in Core */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>

      {/* Signal points */}
      <points>
        <sphereGeometry args={[2.2, 16, 16]} />
        <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.6} />
      </points>
    </group>
  );
}

export const ContactGlobe3D = () => {
  return (
    <div className="w-full h-48 sm:h-64 relative flex items-center justify-center">
      <ErrorBoundary3D fallback={<div className="w-32 h-32 rounded-full border border-cyan-500/20 animate-spin" />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#06b6d4" />
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <CommGlobe />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
};
