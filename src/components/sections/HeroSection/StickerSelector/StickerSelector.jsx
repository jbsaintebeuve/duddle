import "./StickerSelector.scss";
import { useState, useEffect } from "react";

const stickersModels = [
  {
    id: 1,
    src: "../img/coming_soon_sticker.png",
    type: "coming_soon",
  },
  {
    id: 2,
    src: "../img/rainbow_sticker.png",
    type: "rainbow",
  },
  {
    id: 3,
    src: "../img/cat_sticker.png",
    type: "cat",
  },
  {
    id: 4,
    src: "../img/heart_sticker.png",
    type: "heart",
  },
];

function StickerSelector({ setUserSticker }) {
  const [activeSticker, setActiveSticker] = useState(1);
  const [isSelectorOpen, setIsSelectorOpen] = useState(true);

  useEffect(() => {
    setUserSticker((prev) => ({
      ...prev,
      model: stickersModels.find((sticker) => sticker.id === activeSticker).type,
    }));
  }, [activeSticker, setActiveSticker, setUserSticker]);

  const handleClickedSticker = (sticker) => {
    setUserSticker((prev) => ({
      ...prev,
      model: sticker.type,
    }));
    setActiveSticker(sticker.id);
  };

  const toggleSelector = () => {
    setIsSelectorOpen((prev) => !prev);
  };

  return (
    <div className={`stickerSelectorContainer ${isSelectorOpen ? "open" : "closed"}`}>
      <button className="buttonWrapperSelector" onClick={toggleSelector}>Stickers</button>
      <div className={`stickerSelector `}>
        {stickersModels.map((sticker) => (
          <img
            key={sticker.id}
            src={sticker.src}
            className={activeSticker === sticker.id ? "active" : ""}
            onClick={() => handleClickedSticker(sticker)}
            alt={sticker.type}
          />
        ))}
      </div>
    </div>
  );
}
export default StickerSelector;
