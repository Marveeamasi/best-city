import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect, useMemo } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

export const Scene = ({ mainColor = "#c0ffe1", path, ...props }) => {
  const { scene } = useGLTF(path);

  // Optimize: Only traverse once on mount
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Optional: improve performance on low-end
        child.frustumCulled = true;
      }
    });
  }, [scene]);

  // Responsive scale based on viewport width
  const scale = useMemo(() => {
    const ratio = window.innerWidth / 1920;
    return Math.min(1.3, Math.max(0.6, ratio));
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[4, 4, 16]}
        fov={45}
        near={0.1}
        far={100}
      />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={DEG2RAD * 80}
        minDistance={8}
        maxDistance={12}
      />

      {/* Model */}
      <primitive object={scene} scale={scale} position={[0, -1, 0]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Optimized Shadows */}
      <AccumulativeShadows
        frames={30}           // Reduced from 100
        alphaTest={0.85}
        scale={18}
        position={[0, -0.01, 0]}
        color="#2d2d2d"
        opacity={0.5}
        temporal
        blend={30}
      >
        <RandomizedLight
          amount={2}
          radius={8}
          intensity={0.6}
          ambient={0.4}
          position={[8, 6, 10]}
          bias={0.001}
        />
      </AccumulativeShadows>

      {/* Environment + Background */}
      <Environment preset="sunset" background blur={0.7}>
        {/* Custom back wall with mainColor */}
        <mesh scale={[30, 20, 1]} position={[0, 0, -10]}>
          <planeGeometry />
          <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
        </mesh>
      </Environment>
    </group>
  );
};