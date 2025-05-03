import axios from "axios";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useLocomotiveScroll } from "../../../providers/LocomotiveScrollProvider";
import Header from "../../commons/Header/Header";
import Countdown from "./Countdown/Countdown";
import StickerSelector from "./StickerSelector/StickerSelector";
import API_URL from "../../../api/config";

function UiHeroSection({
  isPreviewing,
  setIsPreviewing,
  userSticker,
  setUserSticker,
  handleCancelSticker,
  inputNewsletter,
  setInputNewsletter,
  isSuccess,
}) {


  const locoScroll = useLocomotiveScroll();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [mailError, setMailError] = useState(false);


  const handleBackButton = () => {
    setIsPreviewing(false)
    handleCancelSticker();
    locoScroll.current.start();
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email) || email === "") {
      // setInputNewsletter(email);
      setIsValidEmail(true);
    } else {
      // alert("Veuillez entrer une adresse e-mail valide.");
      setIsValidEmail(false);
    }
    setInputNewsletter(email);
  };

  const handleValidNewsletter = async () => {
    if (isValidEmail && inputNewsletter !== "") {
      try {
        const response = await axios.get(`${API_URL}/users?email=${inputNewsletter}`);
        if (response.data.exists) {
          setMailError(true);
          return;
        }
      } catch (error) {
        console.error("Failed to check email:", error);
        return;
      }
      setIsPreviewing(true);
      setMailError(false);
      locoScroll.current.scrollTo(0);
      locoScroll.current.stop();
    }
  };


  return (
    <>
      {!isPreviewing && (
        <>
          <Header />
          <div className="infos flex flex-col gap-6 justify-center items-center">
            <div className="relative">
              <div className="absolute w-20 h-20 md:w-32 md:h-32 -top-2 md:top-0 -left-5">
                <img
                  className="h-full w-full"
                  src="/img/icon_logo.png"
                  alt="sticker coming soon"
                />
              </div>
              <h1 className="text-4xl md:text-7xl text-flame-pea-500 font-bold flex flex-col text-white text-center">
                <span className="text-5xl md:text-8xl" id="main-title">Duddle</span>arrive bientôt !
              </h1>
            </div>
            <h2 className="md:text-2xl text-flame-pea-600 w-10/12 md:w-5/12 text-center font-semibold flex flex-col">
              Découvrez des stickers uniques et éthiques,
              <span>Made in Côte d’Azur !</span>
            </h2>
            <Countdown targetDate={"2025-05-15T23:59:59"} />
            {!isSuccess ? (
              <div className="flex flex-col gap-4 w-10/12 md:w-5/12">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <input
                      className={`border-2 px-4 py-2 bg-white rounded-xl focus:outline-none md:w-8/12 ${isValidEmail ? "border-casper-400" : " border-flame-pea-600"} `}
                      placeholder="Adresse mail"
                      value={inputNewsletter}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <button
                      className="bg-casper-400 text-white-50 hover:bg-white-50 hover:text-casper-400 transition border-casper-400  border-2 font-semibold px-4 py-2 rounded-xl md:w-4/12"
                      onClick={handleValidNewsletter}
                    >
                      S'inscrire
                    </button>
                  </div>
                  {mailError && (
                    <p className="text-center text-xs text-red-500">Vous êtes déjà inscrit à la newsletter.</p>
                  )}
                </div>
                <p className="text-center font-medium text-xs text-flame-pea-700">
                  Inscrivez-vous dès maintenant à notre newsletter, soyez les
                  premiers informés du lancement officiel, et collez votre
                  propre sticker sur notre mur de bienvenue !
                </p>
              </div>
            ) : (
              <p className="flex flex-col text-center w-5/6 text-sm font-semibold text-flame-pea-500">Merci d'avoir participer au lancement de Duddle ! <span>Nous vous informerons du lancement de la boutique et de son actualité.</span></p>
            )}
          </div>
        </>
      )}
      {isPreviewing && (
        <>
          <div className="absolute top-10 left-10">
            <button
              onClick={() => handleBackButton()}
              className="bg-casper-400 px-5 py-2 rounded-xl text-white-50 hover:bg-white-50 hover:text-casper-400 b text-sm hover:cursor-pointer font-semibold flex gap-2 items-center border transition hover:border-casper-400">
              <FaArrowAltCircleLeft />Retour à l'accueil
            </button>
          </div>
          <div className="h-svh w-screen flex justify-center absolute top-0 left-0 pointer-events-none z-30">
            <StickerSelector
              userSticker={userSticker}
              setUserSticker={setUserSticker}
            />
          </div>
        </>
      )}
    </>
  )
}
export default UiHeroSection;