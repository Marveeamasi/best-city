import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Experience } from "../components/property/Experience";
import { Overlay } from "../components/property/Overlay";
import { useProgress, Html } from "@react-three/drei";
import { useAtom } from "jotai";
import { slideAtom } from "../components/property/Overlay";
import { scenes } from "../components/property/Experience";

// Preload current + next model
const ModelPreloader = () => {
  const [slide] = useAtom(slideAtom);
  const next = (slide + 1) % scenes.length;

  // This runs in Canvas context
  return null;
};

// Loading screen with real progress
const Loader = () => {
  const { progress, loaded, total } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-xs w-full">
        <div className="text-2xl font-bold text-blue-600">Loading Model...</div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600">
          {Math.round(progress)}% • {loaded}/{total} files
        </div>
      </div>
    </Html>
  );
};

export default function Property3D() {
  const [showLeva, setShowLeva] = useState(false);

  //Optional: Toggle Leva with Ctrl+L
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setShowLeva(v => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Leva Controls (Hidden by default) */}
      <Leva collapsed hidden={!showLeva} />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]} // Clamp DPR for mobile
      >
        {/* Background */}
        <color attach="background" args={["#f8f9fa"]} />

        {/* Preload models */}
        <ModelPreloader />

        {/* 3D Scene */}
        <Suspense fallback={<Loader />}>
          <Experience />
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <Overlay />
    </div>
  );
}