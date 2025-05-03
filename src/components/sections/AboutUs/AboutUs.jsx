import Images from "./Images/Images";
import Ring from "./Ring/Ring";

const isDesktop = window.innerWidth > 768;

function AboutUs() {
  return (
    <>
      <section
        data-scroll-section
        style={isDesktop ? { height: "300vh" } : { height: "200vh" }}
        className="w-10/12 mt-16 mx-auto flex flex-col  md:gap-24"
        id="aboutUs"
      >
        <div classNmae="w-full flex">
          <h3
            data-scroll
            data-scroll-speed="2"
            className="text-6xl text-flame-pea-500 font-bold md:w-6/12"
          >
            L'Art du Sticker, au cœur de la Côte d'Azur
          </h3>
        </div>
        <div className="flex justify-end">
          <p
            className="md:w-6/12 text-xl font-medium text-justify"
            data-scroll
            data-scroll-speed="4"
          >
            Duddle est une boutique en ligne française dédiée aux stickers créatifs, inspirée par l'art et la culture du Japon, où le sticker est omniprésent. Chez Duddle, nous collaborons avec des artistes indépendants pour créer des stickers uniques, vendus à l’unité ou en planches parfaites pour le scrapbooking.
          </p>
        </div>

        <Images />


        <p className="md:w-6/12 text-xl font-medium text-justify flex items-end" style={{ height: "100vh" }} data-scroll data-scroll-speed="2">
          Notre engagement : offrir des créations originales et une qualité d’impression irréprochable. Nous imprimons localement pour garantir une production française de qualité et accessible pour tous les budgets.
        </p>

        <div
          className="w-full hidden md:block relative"
          style={{ height: "60vh" }}
        >
          <Ring />
        </div>
      </section>

    </>
  );
}
export default AboutUs;
