import { Canvas } from "@react-three/fiber";
import React from "react";
import RingCamera from "./RingCamera";
import RingItems from "./RingItems";

function Ring() {


  return (
    <>
      <Canvas
      >
        <ambientLight intensity={4} />
        <RingCamera />
        <RingItems />
      </Canvas>
    </>
  );
}
export default Ring;
