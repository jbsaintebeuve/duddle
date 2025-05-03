import { useLocomotiveScroll } from "../../../providers/LocomotiveScrollProvider";
import "./InProgress.scss";

function InProgress() {

    const locoScroll = useLocomotiveScroll();
    const scrollToSection = (target) => {
        locoScroll.current.scrollTo(target);
        console.log("scrollToSection", target);
    }

    const isDesktop = window.innerWidth > 768;
    return (
        <section className="direction mt-36 md:mt-60" data-scroll-section style={{ height: "80vh" }}>
            <div className="relative " style={isDesktop ? { height: "50vh" } : { height: "30vh" }}>
                <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="8" id="direction-1" data-scroll-target=".direction">
                    <span className="text-tequila-200 bg-casper-400 text-6xl md:text-9xl w-full font-bold py-5">Work in Progress • Work in Progress • Work in Progress • Work in Progress</span>
                </div>
                <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="-6" id="direction-2" data-scroll-target=".direction">
                    <span className="text-tequila-200 bg-casper-400 text-6xl md:text-9xl w-full font-bold py-5">Work in Progress • Work in Progress • Work in Progress • Work in Progress</span>
                </div>
            </div>

            <div className="md:w-6/12 relative mx-auto flex flex-col items-center text-center gap-5">
                <p className="font-medium text-2xl">Encore un peu de patience, votre boutique Duddle est en cours de construction</p>
                <button
                    className="bg-casper-300 font-semibold px-4 py-2 rounded-xl md:w-5/12 text-white-50 hover:bg-white-50 hover:text-casper-300 transition border-casper-300  border-2"
                    onClick={() => scrollToSection(document.querySelector("#header"))}
                >
                    Être averti du lancement
                </button>
            </div>
        </section>
    )
}
export default InProgress;