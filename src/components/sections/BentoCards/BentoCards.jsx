function BentoCards() {
    const isDesktop = window.innerWidth > 768;
    return (
        <section
            data-scroll-section
            style={{ height: "100vh" }}
            className="w-10/12 my-12 md:my-24 mx-auto flex flex-col md:flex-row gap-10"
            id="bentoCards"
        >
            <div className="md:w-4/12 max-h-min relative" data-scroll data-scroll-sticky={isDesktop ? true : undefined} data-scroll-target="#bentoCards" >
                <div className="relative md:mt-24 flex flex-col gap-4">
                    <h3 className="text-casper-300 font-bold text-5xl">Des stickers qui parlent pour vous</h3>
                    <p className="font-medium">Chez Duddle, nous croyons que chaque sticker est une forme d’expression unique. De l’idée au design final, nous mettons tout en œuvre pour offrir des produits qui vous ressemblent, peu importe où vous êtes.</p>
                </div>
            </div>

            <div className="md:w-8/12 overflow-x-scroll md:overflow-x-visible overflow-y-hidden md:overflow-y-visible flex flex-row md:flex-wrap justify-end md:py-8 md:h-1/2 gap-4 relative">
                <div className="w-fit md:w-7/12 flex flex-col rounded-xl h-full bg-flame-pea-500 p-5 md:px-10 md:py-4 gap-4">
                    <div className="relative flex justify-around py-4 h-2/6 md:h-1/2">
                        <img alt="coming soon sticker" className="w-auto h-full rotate-12" src="./img/coming_soon_sticker.png" />
                        <img alt="heart sticker" className="w-auto h-full -rotate-6" src="./img/heart_sticker.png" />
                    </div>
                    <div className="flex text-white-50 w-60 md:w-full flex-col gap-2 md:h-1/2">
                        <h4 className="font-bold text-xl">Une panoplie de thématiques</h4>
                        <p className="text-xs font-medium">Que vous soyez fan de mangas, de comics, de designs minimalistes ou artistiques, nous avons ce qu’il vous faut. Chez Duddle, la diversité est au cœur de notre création : un sticker pour chaque passion, chaque émotion, et chaque envie.</p>
                    </div>
                </div>
                <div className="w-fit md:w-4/12 rounded-xl h-full bg-tequila-300 p-5 flex flex-col justify-center">
                    <p className="text-flame-pea-700 font-medium text-justify text-sm w-40 md:w-full">Chaque sticker que nous produisons passe par un contrôle rigoureux pour garantir un rendu impeccable. Chez Duddle, nous marions innovation et savoir-faire pour créer des produits qui allient esthétique et robustesse.</p>
                </div>
                <div className="w-fit md:w-4/12 rounded-xl h-full bg-tequila-300 p-5  flex flex-col justify-center">
                    <p className="text-flame-pea-700 font-medium text-sm text-justify w-40 md:w-full">Nos designs sont pensés pour inspirer et connecter des communautés à travers le monde. Qu’il s’agisse de personnaliser vos objets du quotidien ou de transformer un espace, nos stickers s’adaptent à toutes vos idées et projets.</p>
                </div>
                <div className="w-fit md:w-7/12 rounded-xl h-full bg-casper-300 flex flex-col px-10 md:py-4 md:px-10 gap-10">
                    <div className="h-1/2 relative flex items-center justify-center w-full">
                        <div className="relative w-full md:w-1/2 h-full translate-x-16 md:translate-x-8 mt-14 md:mt-3">
                            <img alt="materiau blanc texturé" className="w-4/12 md:w-5/12 h-auto translate-y-3 -translate-x-12 absolute -rotate-12  shadow-casper-500 drop-shadow-xl" src="./img/mat_3.png" />
                            <img alt="materiau metal brossé" className="w-5/12 md:w-6/12 h-auto translate-x-16 absolute rotate-12 shadow-casper-500 drop-shadow-xl" src="./img/mat_2.png" />
                            <img alt="materiau reflet holographique" className="w-7/12 md:w-8/12 h-auto -translate-x-4 translate-y-7 absolute rotate-4 shadow-casper-500 drop-shadow-xl" src="./img/mat_1.png" />
                        </div>
                    </div>
                    <div className="h-1/3 w-64 md:w-full flex flex-col justify-center gap-2">
                        <h3 className="text-white-50 font-semibold italic text-lg md:text-xl">Une diversité de matériaux</h3>
                        <p className="text-xs font-medium">Nous utilisons des matériaux haut de gamme : holographiques, texturés, mats ou brillants. Notre priorité est de garantir des stickers aussi durables que visuellement impactants, pour que chaque création soit à la hauteur de vos attentes.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default BentoCards;