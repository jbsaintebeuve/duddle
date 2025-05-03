import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RingCamera() {

    const cameraRef = useRef();
    useFrame((state) => {
        if (cameraRef.current) {
            const time = state.clock.getElapsedTime() * 0.1;
            cameraRef.current.position.x = 10.5 * Math.sin(time);
            cameraRef.current.position.z = 10.5 * Math.cos(time);
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return <>
        <PerspectiveCamera makeDefault position={[0, 0, 0]} ref={cameraRef} />
    </>
}
export default RingCamera;