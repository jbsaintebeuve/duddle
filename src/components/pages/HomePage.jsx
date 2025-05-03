import React, { useEffect } from 'react';
import HeroSection from '../sections/HeroSection/HeroSection';
import AboutUs from '../sections/AboutUs/AboutUs';
import BentoCards from '../sections/BentoCards/BentoCards';
import Team from '../sections/Team/Team';
import InProgress from '../sections/InProgress/InProgress';
import Footer from '../sections/Footer/Footer';
import { useLocomotiveScroll } from '../../providers/LocomotiveScrollProvider';
import { useLocation } from 'react-router-dom';
import { useLoaderProgress } from '../../providers/ProgressProvider';

function HomePage() {

    const locoScroll = useLocomotiveScroll();
    const location = useLocation();

    const { setIsLoading } = useLoaderProgress();

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
            setIsLoading(true);
        }
    }, [location, locoScroll]);
    return (
        <>
            <HeroSection />
            <AboutUs />
            <BentoCards />
            <Team />
            <InProgress />
            <Footer />
        </>

    );

}
export default HomePage;