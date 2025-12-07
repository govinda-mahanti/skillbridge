import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Model() {
  const gltf = useGLTF("/YogaPlace_1.glb");
  const ref = useRef();

  // Automatic rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust speed as needed
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      scale={1.5} 
      position={[0, -1.5 , 0]} 
      ref={ref} 
    />
  );
}

export default function YogaModel() {
  return (
    <Canvas 
      style={{ height: 500 }}
      camera={{ 
        position: [0, 2, 5], 
        fov: 45,
        near: 0.1,
        far: 1000
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Environment preset="sunset" />
      <Model />
      <OrbitControls 
        enableZoom={false} 
        enableRotate={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}