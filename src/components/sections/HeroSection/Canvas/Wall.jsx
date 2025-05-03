import { useLoader } from "@react-three/fiber";
import React, { useMemo } from "react";
import * as THREE from "three";
import { ShaderMaterial, TextureLoader } from "three";
import Sticker from "./Sticker";
import StickerController from "./StickerController";

import brickTextureImage from './img/plaster_brick_pattern_diff_HD.jpg';
import displacementMapImage from './img/plaster_brick_pattern_disp_HD.jpg';
import normalMapImage from './img/plaster_brick_pattern_nor_gl_HD.png';
import roughnessMapImage from './img/plaster_brick_pattern_rough_HD.png';
import { Html } from "@react-three/drei";

// import cursorTexture from './img/cursor_1.svg';

// extend({ BrickShaderMaterial });

function Wall({
  isAddingSticker,
  userSticker,
  previewPosition,
  handleDrop,
  handlePointerMove,
  handlePointerOut,
  tmpSticker,
  stickers,
  setUserSticker,
  wallRef,
  setPosRotSticker,
  handleCancelSticker,
}) {

  const normalMap = useLoader(TextureLoader, normalMapImage);
  const displacementMap = useLoader(TextureLoader, displacementMapImage);
  const roughnessMap = useLoader(TextureLoader, roughnessMapImage);
  const brickTexture = useLoader(TextureLoader, brickTextureImage);

  [brickTexture, normalMap, displacementMap, roughnessMap].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8); // Ajustez les valeurs pour contrôler la répétition
  });

  // brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
  // normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  // roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  // displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;

  // const cursorTexture = useLoader(
  //   TextureLoader,
  //   cursorTexture
  // );

  const material = useMemo(() => new ShaderMaterial({
    uniforms: {
      map: { value: brickTexture },
      normalMap: { value: normalMap },
      displacementMap: { value: displacementMap },
      roughnessMap: { value: roughnessMap },
      color: { value: new THREE.Color('#F3DFC3') },
      repeat: { value: new THREE.Vector2(10, 10) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec3 color;
      uniform vec2 repeat;
      varying vec2 vUv;

      void main() {
        vec4 texColor = texture2D(map, vUv * repeat);
        gl_FragColor = vec4(texColor.rgb * color * 1.5, texColor.a);
      }
    `
  }), [brickTexture, normalMap, displacementMap, roughnessMap]);

  return (
    <mesh
      onClick={handleDrop}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      ref={wallRef}
    >
      <boxGeometry args={[25, 20, 0.1]} />
      {/* <brickShaderMaterial
        uBrickTexture={brickTexture}
        uNormalMap={normalMap}
        uRoughnessMap={roughnessMap}
        uDisplacementMap={displacementMap}
      /> */}
      {/* <meshStandardMaterial
        map={brickTexture}
        normalMap={normalMap}
        displacementMap={displacementMap}
        displacementScale={0.1} // Ajustez l'intensité de la carte de déplacement
        roughnessMap={roughnessMap}
        color="#A8C2E0" // Appliquer la teinte sur la texture
      /> */}
      <primitive object={material} attach="material" />

      {/* <group position={[7, 2, 0.1]}  >
        <Sticker position={[0,0,0.1]} model={'heart'}/>
        <mesh position={[0.8,-0.5,0.12]}>
          <boxGeometry args={[0.8, 0.3, 0]} />
          <meshStandardMaterial map={cursorTexture} transparent="true" />
        </mesh>
      </group>

      <group position={[0, 0, 0.1]} >
        <Sticker position={[0,0,0.1]} model={'coming_soon'}/>
        <mesh position={[0.8,-0.5,0.12]}>
          <boxGeometry args={[0.8, 0.3, 0]} />
          <meshStandardMaterial map={cursorTexture} transparent="true" />
        </mesh>
      </group> */}

      {stickers.map((sticker, index) => (
        <Sticker key={index} position={sticker.position} rotation={sticker.rotation} model={sticker.model} />
      ))}
      {userSticker.position && (
        <>
          <group position={[userSticker.position.x, userSticker.position.y, userSticker.position.z]} rotation={[0, 0, 0]} ref={tmpSticker}>
            {isAddingSticker && (
              <Html position={[-1.2, -1, 0.1]}>
                <div className="absolute flex gap-4">
                  <button className="bg-green-500 transition px-5 py-2 rounded-xl text-white-50 hover:bg-white-50 hover:text-green-500 text-sm hover:cursor-pointer font-semibold flex gap-2 items-center"
                    onClick={setPosRotSticker}
                  >
                    Ajouter
                  </button>
                  <button
                    className="bg-red-500 transition px-5 py-2 rounded-xl text-white-50 hover:bg-white-50 hover:text-red-500 text-sm hover:cursor-pointer font-semibold flex gap-2 items-center"
                    onClick={handleCancelSticker}
                  >
                    Annuler
                  </button>
                </div>
              </Html>
            )}
            <Sticker position={{ x: 0, y: 0, z: 0.2 }} rotation={{ x: userSticker.rotation.x, y: userSticker.rotation.y, z: userSticker.rotation.z }} model={userSticker.model} />
            <StickerController userSticker={userSticker} setUserSticker={setUserSticker} />
          </group>
        </>
      )}
      {previewPosition && !isAddingSticker && (
        <Sticker position={previewPosition} rotation={{ x: 0, y: 0, z: 0 }} model={userSticker.model} />
      )}
    </mesh>
  );
}

export default Wall;
