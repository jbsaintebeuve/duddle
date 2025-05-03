import { useEffect, useRef, createContext, useContext } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useLoaderProgress } from './ProgressProvider';

const LocomotiveScrollContext = createContext(null);

function LocomotiveScrollProvider({ children }) {
  const containerRef = useRef(null);
  const locoScroll = useRef(null);

  const { isLoading } = useLoaderProgress();

  useEffect(() => {
    locoScroll.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      // multiplier: 5,
      mobile: {
        breakpoint: 0,
        smooth: true,
        // multiplier: 1,
        // class: "is-reveal",
      },
      tablet: {
        breakpoint: 0,
        smooth: true,
        multiplier: 1,
        // class: "is-reveal",
      },
    });

    locoScroll.current.stop(); // Stop LocomotiveScroll by default

    return () => locoScroll.current.destroy();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      locoScroll.current.start();
    }
  }, [isLoading]);

  return (
    <LocomotiveScrollContext.Provider value={locoScroll}>
      <div data-scroll-container ref={containerRef}>
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
}

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext);
export default LocomotiveScrollProvider;