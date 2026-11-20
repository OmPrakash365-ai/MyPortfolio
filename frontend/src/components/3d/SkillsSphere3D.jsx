import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary3D } from './ErrorBoundary3D';

function TechGlobe() {
  const sphereRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.2;
      ringRef1.current.rotation.x += delta * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.18;
      ringRef2.current.rotation.z += delta * 0.12;
    }
  });

  // Nodes on sphere surface
  const nodePoints = useMemo(() => {
    const pts = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.05;
      pts.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      );
    }
    return pts;
  }, []);

  return (
    <group>
      {/* Central Core Wireframe Sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          wireframe
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>

      {/* Surface Data Nodes */}
      {nodePoints.map((pt, idx) => (
        <mesh key={idx} position={pt}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#22d3ee' : '#c084fc'} />
        </mesh>
      ))}

      {/* Outer Orbital Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
      </mesh>

      {/* Outer Orbital Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export const SkillsSphere3D = () => {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 relative flex items-center justify-center">
      <ErrorBoundary3D
        fallback={
          <div className="w-48 h-48 rounded-full border-2 border-dashed border-cyan-500/40 animate-spin-slow flex items-center justify-center">
            <span className="text-xs font-mono text-cyan-400">3D CORE ACTIVE</span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#06b6d4" />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a855f7" />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <TechGlobe />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </ErrorBoundary3D>
      
      {/* Floating Guidance Badge */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-slate-950/80 border border-cyan-500/30 text-cyan-400 backdrop-blur-md">
          INTERACTIVE 3D TECH MATRIX // DRAG TO ROTATE
        </span>
      </div>
    </div>
  );
};
