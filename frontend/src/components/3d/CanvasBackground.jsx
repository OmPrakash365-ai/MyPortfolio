import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary3D } from './ErrorBoundary3D';

function UniverseEnvironment({ isMobile, mouseRef, scrollRef }) {
  const pointsRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();
  const mesh1 = useRef();
  const mesh2 = useRef();

  const particleCount = isMobile ? 220 : 680;

  // Particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#a855f7');
    const colorBlue = new THREE.Color('#3b82f6');

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const r = Math.random();
      const c = r < 0.45 ? colorCyan : r < 0.75 ? colorPurple : colorBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state, delta) => {
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const scrollY = scrollRef.current;

    // Smooth subtle camera drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 1.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouseY * 1.2 - scrollY * 0.002, 0.03);

    // Particle field slow rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.012;
    }

    // Distant cyber planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }

    // Floating geometric structures
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.15;
      mesh1.current.rotation.y += delta * 0.2;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y -= delta * 0.14;
      mesh2.current.rotation.z += delta * 0.16;
    }
  });

  return (
    <group>
      {/* Deep Space Stars */}
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 1200 : 3200}
        factor={3}
        saturation={0.5}
        fade
        speed={0.6}
      />

      {/* Cyber Floating Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Distant Cyber Planet with Orbital Ring in Upper Right */}
      {!isMobile && (
        <group position={[14, 8, -22]}>
          <mesh ref={planetRef}>
            <sphereGeometry args={[3.2, 32, 32]} />
            <meshStandardMaterial
              color="#0d1428"
              emissive="#1e1b4b"
              emissiveIntensity={0.6}
              roughness={0.7}
              metalness={0.4}
            />
          </mesh>
          {/* Atmospheric Glow */}
          <mesh>
            <sphereGeometry args={[3.45, 32, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.12}
              side={THREE.BackSide}
            />
          </mesh>
          {/* Planetary Orbital Ring */}
          <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[5.2, 0.04, 16, 64]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.45} />
          </mesh>
        </group>
      )}

      {/* Floating Wireframe Geometries */}
      {!isMobile && (
        <>
          <mesh ref={mesh1} position={[-14, -8, -16]}>
            <octahedronGeometry args={[2.4, 0]} />
            <meshStandardMaterial
              wireframe
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.45}
              transparent
              opacity={0.3}
            />
          </mesh>

          <mesh ref={mesh2} position={[-10, 11, -18]}>
            <icosahedronGeometry args={[2.8, 0]} />
            <meshStandardMaterial
              wireframe
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.4}
              transparent
              opacity={0.25}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

export const CanvasBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <ErrorBoundary3D fallback={<div className="absolute inset-0 bg-grid-pattern opacity-10" />}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 55 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.45} />
            <directionalLight position={[10, 12, 10]} intensity={0.9} color="#00f0ff" />
            <pointLight position={[-12, -10, -5]} intensity={0.8} color="#a855f7" />
            <UniverseEnvironment isMobile={isMobile} mouseRef={mouseRef} scrollRef={scrollRef} />
          </Suspense>
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
};
