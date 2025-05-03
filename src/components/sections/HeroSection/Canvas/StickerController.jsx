import { useLoader } from "@react-three/fiber";
import React, { useState } from "react";
import { TextureLoader } from "three";

function StickerController({ userSticker, setUserSticker }) {
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [grabbedAxis, setGrabbedAxis] = useState(null); // Axe en cours de grab
  const [initialPosition, setInitialPosition] = useState(null); // Position initiale du curseur
  const [initialRotation, setInitialRotation] = useState(null); // Rotation initiale
  const [initialCursorY, setInitialCursorY] = useState(null);
  const [initialCursorX, setInitialCursorX] = useState(null);
  const [initialRotationZ, setInitialRotationZ] = useState(null);

  const [hoveredX, setHoveredX] = useState(false);
  const [hoveredY, setHoveredY] = useState(false);
  const [hoveredArrow, setHoveredArrow] = useState(false);

  const arrowX = useLoader(TextureLoader, "./img/arrowX.png");
  const arrowXSat = useLoader(TextureLoader, "./img/arrowX_sat.png");
  const arrowY = useLoader(TextureLoader, "./img/arrowY.png");
  const arrowYSat = useLoader(TextureLoader, "./img/arrowY_sat.png");
  const arrowRotate = useLoader(TextureLoader, "./img/arrowRotate.png");
  const arrowRotateSat = useLoader(TextureLoader, "./img/arrowRotate_sat.png");

  const handlePointerDown = (event, axis, isRotation = false) => {
    setIsGrabbed(true);
    setGrabbedAxis(axis); // Définir l'axe à grab (x, y ou rotation)
    setInitialCursorY(event.clientY);
    setInitialCursorX(event.clientX);
    setInitialRotationZ(userSticker.rotation.z);

    if (isRotation) {
      setInitialRotation(userSticker.rotation); // Stocker la rotation initiale
    } else {
      setInitialPosition({
        x: event.point.x,
        y: event.point.y,
      }); // Stocker la position initiale
    }
  };

  const handlePointerMove = (event) => {
    if (isGrabbed) {
      if (initialPosition) {
        const { x, y } = event.point; // Position actuelle du curseur
        const deltaX = x - initialPosition.x;
        const deltaY = y - initialPosition.y;

        // Mise à jour de la position du sticker uniquement sur l'axe grab
        if (grabbedAxis === "x") {
          setHoveredX(true);
          setUserSticker((prev) => ({
            ...prev,
            position: {
              x: prev.position.x + deltaX,
              y: prev.position.y,
              z: prev.position.z,
            },
          }));
        } else if (grabbedAxis === "y") {
          setHoveredY(true);
          setUserSticker((prev) => ({
            ...prev,
            position: {
              x: prev.position.x,
              y: prev.position.y + deltaY,
              z: prev.position.z,
            },
          }));
        }

        // Mettre à jour la position initiale après chaque déplacement pour suivre le mouvement
        setInitialPosition({ x, y });
      } else if (initialRotation) {
        const deltaY = event.clientY - initialCursorY;
        const deltaX = event.clientX - initialCursorX;

        // Définir un seuil pour éviter des mouvements indésirables
        const threshold = 5;

        // Appliquer la rotation seulement si l'un des mouvements dépasse le seuil
        if (Math.abs(deltaY) > threshold || Math.abs(deltaX) > threshold) {
          let newRotationZ = initialRotationZ;

          // Ajustement basé sur la direction principale
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Si le mouvement principal est sur X
            newRotationZ += deltaX * 0.01; // Influence sur la rotation
          } else {
            // Si le mouvement principal est sur Y
            newRotationZ += deltaY * 0.01; // Influence sur la rotation
          }

          setUserSticker((prev) => ({
            ...prev,
            rotation: {
              ...prev.rotation,
              z: newRotationZ,
            },
          }));
        }
      }
    }
  };

  const handlePointerUp = () => {
    setIsGrabbed(false);
    setGrabbedAxis(null); // Réinitialiser l'axe après grab
    setInitialPosition(null); // Réinitialiser la position initiale
    setInitialRotation(null); // Réinitialiser la rotation initiale
    setHoveredArrow(false);
  };

  // const controllerElements = [
  //   { position: [1, 0, 0.1], color: "red", type: "x" },
  //   // { position: [-1, 0, 0.1], color: "green", type: "x" },
  //   { position: [0, 1, 0.1], color: "green", type: "y" },
  //   // { position: [0, -1, 0.1], color: "yellow", type: "y" },
  // ];

  return (
    <>
      <group position={[0, 0, 0.1]}>
        <mesh
          position={[0.2, -0.6, 0.1]}
          onPointerDown={(e) => handlePointerDown(e, "x", false)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={() => setHoveredX(true)}
          onPointerOut={() => setHoveredX(false)}
        >
          <meshStandardMaterial
            map={hoveredX ? arrowXSat : arrowX}
            transparent={true}
          />
          <planeGeometry args={[1.5, 0.4]} />
        </mesh>
        <mesh
          position={[-0.6, 0.2, 0.1]}
          onPointerDown={(e) => handlePointerDown(e, "y", false)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={() => setHoveredY(true)}
          onPointerOut={() => setHoveredY(false)}
        >
          <meshStandardMaterial
            map={hoveredY ? arrowYSat : arrowY}
            transparent={true}
          />
          <planeGeometry args={[0.4, 1.5]} />
        </mesh>
      </group>

      <mesh
        position={[0.6, 0.4, 0.2]}
        onPointerDown={(e) => handlePointerDown(e, "rotation", true)} // Indiquer si c'est un contrôle de rotation
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerOver={() => setHoveredArrow(true)}
      >
        {/* <ringGeometry args={[0.6, 0.8, 8, 2, 0, Math.PI / 2]} /> */}
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial
          map={hoveredArrow ? arrowRotateSat : arrowRotate}
          transparent={true} />
      </mesh>
    </>
  );
}

export default StickerController;
