function Team() {
    const isDesktop = window.innerWidth > 768;
    return (
        <>
            <section
                data-scroll-section
                style={isDesktop ? { height: "90vh" } : { height: "170vh" }}
                className="w-11/12 mb-16 mx-auto flex flex-col md:flex-row rounded-xl before:rounded-xl overflow-hidden bg-tequila-200 md:p-5"
                id="team"
            >
                <img className="absolute rotate-12 w-full h-full -top-10 left-0 -translate-x-1/3 mix-blend-overlay opacity-30" src="./img/icon_logo_sf.svg" alt="logo icon" />

                <div className="flex flex-col justify-around p-5 h-6/6 md:h-full md:p-10 z-10 md:w-6/12">
                    <h3 className="text-flame-pea-500 text-4xl md:text-5xl font-semibold flex flex-col">Nous sommes <span>Duddle</span></h3>
                    <div className="text-flame-pea-500 flex flex-col gap-2">
                        <h4 className="font-bold text-2xl md:text-3xl">Une équipe passionnée, unie par l’amour de l’art et du sticker</h4>
                        <p className="text-justify text-sm flex flex-col gap-4"><span>Chez Duddle, nous croyons que chaque détail compte et que les petites choses, comme un sticker, peuvent raconter de grandes histoires.
                            Notre équipe est composée de créateurs et de passionnés, chacun apportant sa touche unique pour transformer des idées en designs captivants.
                        </span><span>
                                Qu’il s’agisse de paysages traditionnels japonais ou de personnages adorables inspirés de la culture pop, nous travaillons ensemble pour vous offrir des produits qui reflètent notre vision : partager la beauté et l’énergie du Japon à travers des œuvres accessibles à tous.
                            </span><span>
                                Derrière chaque sticker se cache une équipe soudée, prête à explorer de nouvelles idées, à collaborer avec des artistes talentueux, et surtout, à faire briller votre quotidien.</span></p>
                    </div>
                </div>

                <div className="w-1/12 hidden md:block relative"></div>

                <div className="z-10 md:w-5/12 relative h-4/6 md:h-full">
                    <div className="absolute -left-5 md:left-0 w-44 md:w-52"><img src="./img/teams/team_t.png" alt="tony"></img></div>
                    <div className="absolute -right-5 md:right-0 -top-5 w-52 md:w-60"><img src="./img/teams/team_j.png" alt="jean-baptise"></img></div>
                    <div className="absolute left-1/4 md:left-1/3 md:-translate-x-4 w-44 md:w-52"><img src="./img/teams/team_l.png" alt="ludmilla"></img></div>
                    <div className="absolute -left-5 top-1/4 md:left-0 w-44 md:w-52"><img src="./img/teams/team_a.png" alt="alexandra"></img></div>
                    <div className="absolute top-1/4 -translate-y-8 md:-translate-y-2 -right-5 md:right-0 w-52 md:w-56"><img src="./img/teams/team_c.png" alt="camille"></img></div>
                    <div className="absolute top-1/4 -translate-y-6 md:-translate-y-4 left-1/4 md:left-1/3 -translate-x-5 w-52 md:w-60"><img src="./img/teams/team_e.png" alt="emma"></img></div>
                    <div className="absolute bottom-0 -left-10 md:left-0 w-52 md:w-60"><img src="./img/teams/team_mn.png" alt="manon"></img></div>
                    <div className="absolute bottom-0 md:bottom-2 left-1/4 md:left-1/3 -translate-x-3 w-52 md:w-56"><img src="./img/teams/team_m.png" alt="marc"></img></div>
                    <div className="absolute bottom-3 md:bottom-5 -right-4 md:right-0 w-44 md:w-48"><img src="./img/teams/team_o.png" alt="ophelie"></img></div>
                </div>


            </section>
        </>
    )
}
export default Team;