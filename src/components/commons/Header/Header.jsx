import { FaInstagram, FaPinterest, FaFacebook, FaLinkedin, FaBars, FaTimes, FaTiktok } from "react-icons/fa";
import { useLocomotiveScroll } from '../../../providers/LocomotiveScrollProvider';
import { useState } from 'react';

function Header({ deleteStickers }) {
  const locoScroll = useLocomotiveScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (target) => {
    locoScroll.current.scrollTo(target);
    // console.log("scrollToSection", target);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header data-scroll data-scroll-repeat data-scroll-speed="-8" data-scroll-position="top" data-scroll-section data-scroll-target="#header" id="header" className="flex w-10/12 my-8 mx-auto justify-between absolute items-center">
        <img data-scroll data-scroll-direction="horizontal" data-scroll-speed="-2" data-scroll-position="top" data-scroll-target="#header" className="w-3/6 md:w-2/12" src={"./img/logo_flame_pea.svg"} alt="Logo Duddle" />
        <nav className="w-fit text-flame-pea-600 hidden md:flex" data-scroll data-scroll-direction="horizontal" data-scroll-speed="2" data-scroll-position="top" data-scroll-target="#header" >
          <ul className="justify-end w-full gap-10 flex items-center font-semibold uppercase">
            <li onClick={() => scrollToSection(document.querySelector("#aboutUs"))} className="hover:cursor-pointer hover:underline hover:text-flame-pea-700">Le Projet</li>
            <li onClick={() => scrollToSection(document.querySelector("#team"))} className="hover:underline hover:cursor-pointer hover:text-flame-pea-700">L'équipe</li>
            <li className="flex gap-4 text-lg">
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/duddle.fr/"><FaInstagram className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@duddle.fr?is_from_webapp=1&sender_device=pc"><FaTiktok className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61567840586018"><FaFacebook className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://pin.it/4zuDMd9mL"><FaPinterest className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/oph%C3%A9lie-courieux-960b47334/"><FaLinkedin className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
            </li>
          </ul>
        </nav>
        <div className="md:hidden" data-scroll data-scroll-direction="horizontal" data-scroll-speed="2" data-scroll-position="top" data-scroll-target="#header" >
          <FaBars onClick={toggleMobileMenu} className=" text-flame-pea-500 text-2xl cursor-pointer" />
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed bg-tequila-300 w-full h-full inset-0  z-50 flex flex-col items-center justify-center">
          <FaTimes onClick={toggleMobileMenu} className="text-2xl cursor-pointer mb-8 text-flame-pea-500" />
          <ul className="flex flex-col items-center gap-6 font-semibold uppercase text-flame-pea-500">
            <li onClick={() => { toggleMobileMenu(); scrollToSection(document.querySelector("#aboutUs")); }} className="hover:cursor-pointer hover:text-flame-pea-700">Le Projet</li>
            <li onClick={() => { toggleMobileMenu(); scrollToSection(document.querySelector("#team")); }} className="hover:underline hover:cursor-pointer">L'équipe</li>
            <li className="flex gap-4 text-lg">
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/duddle.fr/"><FaInstagram className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@duddle.fr?is_from_webapp=1&sender_device=pc"><FaTiktok className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61567840586018"><FaFacebook className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://pin.it/4zuDMd9mL"><FaPinterest className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/oph%C3%A9lie-courieux-960b47334/"><FaLinkedin className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default Header;
