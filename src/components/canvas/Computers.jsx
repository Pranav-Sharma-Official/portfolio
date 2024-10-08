import React, { Suspense, useEffect, useState } from "react";
import { Canvas, events } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({isMobile}) => {

  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />

      {/* Hemisphere light for soft overall lighting */}
      <hemisphereLight intensity={0.4} groundColor="black" />

      {/* PointLight near the screen for glowing effect */}
      <pointLight 
        intensity={7}  // Increase intensity for brightness on screen
        position={[1.25, 0, 0]}  // Positioning the light near the screen (adjust as needed)
        color="white"  // Light color (you can adjust this)
      />

      {/* Spotlight focused on the desk area for extra brightness */}
      <spotLight
        position={[-10, 15, 10]}  // Adjust position to focus on the desk
        angle={0.3}
        penumbra={1}
        intensity={2.5}  // Brighter spotlight for desk
        castShadow
        shadow-mapSize={1024}
      />

      {/* Computer object */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* OrbitControls for camera control */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Render the computer scene */}
        <Computers isMobile = {isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
