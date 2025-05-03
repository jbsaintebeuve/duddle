import { Outlet, Link, useLocation } from "react-router-dom";
import { useLoaderProgress } from "../../providers/ProgressProvider";
import { useEffect } from "react";
import { FaInstagram, FaPinterest, FaFacebook, FaLinkedin, FaBars, FaTimes, FaTiktok } from "react-icons/fa";
import { useLocomotiveScroll } from "../../providers/LocomotiveScrollProvider";
import { useState } from 'react';

const Layout = () => {
    const { setIsLoading } = useLoaderProgress();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const locoScroll = useLocomotiveScroll();
    const location = useLocation();

    const updateLocoScroll = () => {
        return new Promise((resolve) => {
            locoScroll.current.update();
            resolve();
        });
    }

    useEffect(() => {
        if (locoScroll.current) {
            updateLocoScroll().then(() => {
                locoScroll.current.scrollTo("top", {
                    duration: 0,
                    disableLerp: true
                });
            });
        }
    }, [location, locoScroll]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        <>
            <div className="bg-tequila-200">
                <header id="header" className="flex w-10/12 py-8 mx-auto justify-between relative items-center">
                    <Link className="w-3/6 md:w-2/12" to="/"><img className="w-full h-full" src={"../img/logo_flame_pea.svg"} alt="Logo Duddle" /></Link>
                    <nav className="w-fit text-flame-pea-600 hidden md:flex"    >
                        <ul className="justify-end w-full gap-10 flex items-center font-semibold uppercase">
                            <Link to="/#aboutUs"><li className="hover:cursor-pointer hover:underline hover:text-flame-pea-700">Le Projet</li></Link>
                            <Link to="/#team"><li className="hover:underline hover:cursor-pointer hover:text-flame-pea-700">L'équipe</li></Link>
                            <li className="flex gap-4 text-lg">
                                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/duddle.fr/"><FaInstagram className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@duddle.fr?is_from_webapp=1&sender_device=pc"><FaTiktok className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61567840586018"><FaFacebook className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://pin.it/4zuDMd9mL"><FaPinterest className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/oph%C3%A9lie-courieux-960b47334/"><FaLinkedin className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                            </li>
                        </ul>
                    </nav>
                    <div className="md:hidden"    >
                        <FaBars onClick={toggleMobileMenu} className=" text-flame-pea-500 text-2xl cursor-pointer" />
                    </div>
                </header>
            </div>
            {isMobileMenuOpen && (
                <div className="fixed bg-tequila-300 w-full h-screen inset-0 z-50 flex flex-col justify-center items-center">
                    <FaTimes onClick={toggleMobileMenu} className="text-2xl cursor-pointer mb-8 text-flame-pea-500" />
                    <ul className="flex flex-col items-center gap-6 font-semibold uppercase text-flame-pea-500">
                        <Link to="/#aboutUs"><li className="hover:cursor-pointer hover:underline hover:text-flame-pea-700">Le Projet</li></Link>
                        <Link to="/#team"><li className="hover:underline hover:cursor-pointer hover:text-flame-pea-700">L'équipe</li></Link>
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
            <section className="w-10/12 mx-auto my-10 flex flex-col gap-5 h-fit">
                <Outlet />
            </section>

            <footer style={{ height: "80vh" }} className="bg-tequila-200 w-full relative flex flex-col items-center justify-between">

                <div className="w-10/12 flex flex-col gap-10 md:flex-row justify-between mt-16">
                    <div className="w-7/12">
                        <div className="flex flex-col gap-5 w-full md:w-3/12">
                            <img src="../img/logo_sf_noir.svg" alt="logo" className="w-full h-full" />
                            <div className="flex justify-between">
                                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/duddle.fr/"><FaInstagram className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@duddle.fr?is_from_webapp=1&sender_device=pc"><FaTiktok className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61567840586018"><FaFacebook className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://pin.it/4zuDMd9mL"><FaPinterest className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/oph%C3%A9lie-courieux-960b47334/"><FaLinkedin className="hover:cursor-pointer hover:text-flame-pea-700" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-5/12 flex justify-between gap-5">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold -tracking-widest text-3xl">mentions légales</h4>
                            <ul className="text-sm flex flex-col gap-3">
                                <Link to="/page/cgv"><li>Conditions générales de vente</li></Link>
                                <Link to="/page/rgpd"><li>RGPD</li></Link>
                                <Link to="/page/mentions-legales"><li>Mentions légales</li></Link>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold -tracking-widest text-3xl">contact</h4>
                            <ul>
                                <a href="mailto:contact@duddle.fr"><li>Contact</li></a>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 z-10 w-full px-2 md:px-10 md:pb-1 grid grid-cols-2 text-white-50 font-medium text-xs md:text-xl -tracking-widest">
                    <p className="">©Duddle</p>
                    <p className="flex justify-end">{new Date().getFullYear()}</p>
                </div>
                <img src="../img/duddle_text.svg" alt="footer" className="w-full h-auto transform translate-y-1" />
            </footer>
        </>
    )
};

export default Layout;