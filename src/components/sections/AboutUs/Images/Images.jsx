import ImageItem from "./ImageItem";
function Images() {
    return (
        <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="16" className="flex gap-10 items-end" style={{ width: "150vw", height: "100vh" }}>
            <div data-scroll data-scroll-speed="-2" className="md:w-4/12 md:h-4/6">
                <div className="w-full h-full overflow-hidden relative">
                    <ImageItem img={"./img/about_1.webp"} />
                </div>
            </div>

            <div data-scroll data-scroll-speed="1" className="md:w-2/12 md:h-auto">
                <div className="w-full h-2/6 overflow-hidden relative">
                    <ImageItem img={"./img/about_2.webp"} />
                </div>
            </div>

            <div data-scroll data-scroll-speed="-3" className="md:w-3/12 md:h-4/6">
                <div className="w-full h-full overflow-hidden relative">
                    <ImageItem img={"./img/about_3.webp"} />
                </div>
            </div>
        </div>
    );
}
export default Images;