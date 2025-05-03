import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function CameraCustom({ mouseXY, wallRef, isPreviewing }) {
  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 10 });
  const initialPosition = { x: 0, y: 0, z: 10 };

  useFrame(() => {
    if (cameraRef.current && wallRef.current) {
      const targetX = isPreviewing ? initialPosition.x : 3 * mouseXY.x;
      const targetY = isPreviewing ? initialPosition.y : 3 * mouseXY.y;
      const targetZ = initialPosition.z;

      // Interpolation linéaire pour lisser les mouvements
      const lerpFactor = 0.05; // Ajustez ce facteur pour plus ou moins d'inertie
      cameraPosition.x += (targetX - cameraPosition.x) * lerpFactor;
      cameraPosition.y += (targetY - cameraPosition.y) * lerpFactor;
      cameraPosition.z += (targetZ - cameraPosition.z) * lerpFactor;

      cameraRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      cameraRef.current.lookAt(wallRef.current.position);
    }
  });

  return (
    <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef} />
  );
}

export default CameraCustom;
