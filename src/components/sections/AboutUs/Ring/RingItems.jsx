import { useFrame } from "@react-three/fiber";
import Sticker from "../../HeroSection/Canvas/Sticker";
import { useRef } from "react";
function RingItems() {

  const cubeArray = Array(24).fill(Math.random() / 3);
  const stickers = ["rainbow", "cat", "heart", "coming_soon"];
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime() * 0.5;
      // ringRef.current.position.x = 0.5 * Math.cos(time);
      // ringRef.current.position.y = 0.5 * Math.sin(time);

      // ringRef.current.rotation.x = Math.cos(time) * 0.5;
      ringRef.current.rotation.z = Math.sin(time) * 0.12;
      // ringRef.current.rotation.y = time;
    }
  });

  return <>
    <group ref={ringRef}>
      {cubeArray.map((_, index) => {
        const angle = (index / cubeArray.length) * 2 * Math.PI;
        const x = Math.cos(angle) * 8;
        const z = Math.sin(angle) * 8;
        const rotationY = Math.atan2(x, z);
        return (
          <Sticker
            model={stickers[index % stickers.length]}
            key={index}
            position={{ x: x, y: 0, z: z }}
            rotation={{ x: 0, y: rotationY, z: 0 }}
          />
        );
      })}
    </group>
  </>;
}
export default RingItems;