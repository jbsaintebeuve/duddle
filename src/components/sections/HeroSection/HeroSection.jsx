import { Canvas } from "@react-three/fiber";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderProgress } from "../../../providers/ProgressProvider";

import "../../../App.scss";
import { useLocomotiveScroll } from "../../../providers/LocomotiveScrollProvider";
import CameraCustom from "./Canvas/CameraCustom";
import Wall from "./Canvas/Wall";
import UiHeroSection from "./UiHeroSection";
import API_URL from "../../../api/config";

function HeroSection() {
  const [isAddingSticker, setIsAddingSticker] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(null);
  const [inputNewsletter, setInputNewsletter] = useState("");
  const [isSuccess, setIsSuccess] = useState(localStorage.getItem("ddl-isSuccess") || false);
  const [userSticker, setUserSticker] = useState({
    position: null,
    rotation: null,
    model: null,
  });
  const [isPreviewing, setIsPreviewing] = useState(false);

  const { setIsLoading } = useLoaderProgress();

  const [stickers, setStickers] = useState([]);
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  const wallRef = useRef();
  const tmpSticker = useRef();

  const locoScroll = useLocomotiveScroll();

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await axios.get(`${API_URL}/stickers`);
        // console.log("Stickers:", response.data);
        setStickers(response.data);
        // setIsLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Failed to get stickers:", error);
        // setIsLoading(false); // Fin du chargement même en cas d'erreur
      }
    };
    fetchStickers();
    // console.log("Stickers:", stickers);

  }, []);

  const handleDrop = (e) => {
    if (!isAddingSticker && isPreviewing) {
      const sticker = {
        position: { x: e.point.x, y: e.point.y, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 },
        model: userSticker.model,
      };
      setIsAddingSticker(true);
      setUserSticker(sticker);
    }
  };

  const handlePointerMove = (e) => {
    if (isPreviewing) {
      setPreviewPosition({ x: e.point.x, y: e.point.y, z: 0.2 });
    }
  };

  const handlePointerOut = () => {
    setPreviewPosition(null);
  };

  const handleCancelSticker = () => {
    setUserSticker((prev) => ({
      ...prev,
      position: null,
      rotation: null,
    }));
    setIsAddingSticker(false);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const normalizedX = clientX / event.view.screen.width - 0.5;
    const normalizedY = -(clientY / event.view.screen.height - 0.5);
    setMouseXY({ x: normalizedX, y: normalizedY });
  };

  const setPosRotSticker = async () => {
    if (tmpSticker.current) {
      const data = {
        email: inputNewsletter,
        sticker: {
          position: {
            x: tmpSticker.current.position.x,
            y: tmpSticker.current.position.y,
            z: tmpSticker.current.position.z,
          },
          rotation: {
            x: 0,
            y: 0,
            z: userSticker.rotation.z,
          },
          model: userSticker.model,
        }
      };
      try {
        // console.log("sticker", data);
        await axios.post(`${API_URL}/stickers`, data);
        // handleCancelSticker();
        setUserSticker({
          position: null,
          rotation: null,
          model: null
        });
        setStickers((prev) => [...prev, data.sticker]);
        setIsPreviewing(false);
        localStorage.setItem("ddl-isSuccess", true);
        setPreviewPosition(null);
        setInputNewsletter("");
        setIsSuccess(true);
        locoScroll.current.start();
      } catch (error) {
        console.error("Failed to add stickers:", error);
      }
    } else {
      console.log("tmpSticker.current is not initialized");
    }
  };

  return (
    <>
      <section data-scroll-section style={{ height: "100vh" }}>
        <Canvas onCreated={() => setIsLoading(false)}>
          <CameraCustom
            mouseXY={mouseXY}
            wallRef={wallRef}
            isPreviewing={isPreviewing}
          />
          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 10, 5]} intensity={1.8} />
          <Wall
            isAddingSticker={isAddingSticker}
            setIsAddingSticker={setIsAddingSticker}
            userSticker={userSticker}
            setUserSticker={setUserSticker}
            previewPosition={previewPosition}
            setPreviewPosition={setPreviewPosition}
            handleDrop={handleDrop}
            handlePointerMove={handlePointerMove}
            handlePointerOut={handlePointerOut}
            tmpSticker={tmpSticker}
            stickers={stickers}
            wallRef={wallRef}
            handleCancelSticker={handleCancelSticker}
            setPosRotSticker={setPosRotSticker}
          />
        </Canvas>
        <div
          className={`ui ${!isPreviewing ? "expanded" : "reduced"}`}
          onMouseMove={handleMouseMove}
        >
          <UiHeroSection
            isPreviewing={isPreviewing}
            setIsPreviewing={setIsPreviewing}
            userSticker={userSticker}
            setUserSticker={setUserSticker}
            setStickers={setStickers}
            isAddingSticker={isAddingSticker}
            handleCancelSticker={handleCancelSticker}
            tmpSticker={tmpSticker}
            inputNewsletter={inputNewsletter}
            setInputNewsletter={setInputNewsletter}
            setIsSuccess={setIsSuccess}
            isSuccess={isSuccess}
          />
        </div>
      </section>
    </>
  );
}
export default HeroSection;
