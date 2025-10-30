import { CameraControls, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import { Scene } from "./Scene";

export const scenes = [
  {
    path: "models/house1.glb",
    mainColor: "#c0ffe1",
    name: "Modern Villa with Pool",
    description: "A modern urban house with sleek design and efficient use of space, perfect for city living.",
    targetProfitability: 10.3,
    roi: 7.2,
    valuation: "425 ETH",
  },
  // Add more scenes here later
];

const CameraHandler = ({ slideDistance }) => {
  const { viewport } = useThree();
  const controls = useRef();
  const [slide] = useAtom(slideAtom);

  useEffect(() => {
    if (!controls.current) return;

    const targetX = slide * (viewport.width + slideDistance);
    controls.current.setLookAt(
      targetX, 3, 8,  // from
      targetX, 0, 0,  // to
      true            // animate
    );
  }, [slide, viewport.width, slideDistance]);

  return (
    <CameraControls
      ref={controls}
      makeDefault
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={20}
      smoothTime={0.8}
      draggingSmoothTime={0.1}
    />
  );
};

export const Experience = () => {
  const { viewport } = useThree();
  const [slide] = useAtom(slideAtom);
  const { slideDistance } = useControls({
    slideDistance: { value: 2, min: 0, max: 10, step: 0.5 },
  });

  const currentScene = scenes[slide];

  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={0.4} />
      <Environment preset="sunset" />

      <CameraHandler slideDistance={slideDistance} />

      {/* Only render the current scene */}
      <group position={[slide * (viewport.width + slideDistance), 0, 0]}>
        <Scene key={currentScene.path} {...currentScene} />
      </group>
    </>
  );
};