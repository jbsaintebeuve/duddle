import { useLoader } from "@react-three/fiber";
import { forwardRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

const stickerModels = {
  coming_soon: "../img/coming_soon_sticker.png",
  rainbow: "../img/rainbow_sticker.png",
  cat: "../img/cat_sticker.png",
  heart: "../img/heart_sticker.png",
};

const Sticker = forwardRef(({ index, position, rotation, model }, ref) => {
  const textureSticker = useLoader(
    TextureLoader,
    model ? stickerModels[model] : stickerModels["coming_soon"]
  );

  return (
    <mesh key={index} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]} ref={ref} >
      <planeGeometry args={[0.8, 0.8]} />
      <meshStandardMaterial map={textureSticker} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
});
export default Sticker;
