import React from 'react';

function Loader() {
    return (
        <div className="w-screen h-screen bg-tequila-300 z-50 absolute overflow-hidden flex flex-col gap-4 items-center justify-center">
            <img src="../img/icon_logo_sf.svg" alt="Duddle logo" className="w-20 h-20 relative" />
            <p className='font-bold text-2xl'>Chargement<span className="ml-2 dot-1">.</span><span className="dot-2 mx-1">.</span><span className="dot-3">.</span></p>
        </div>
    );
}

export default Loader;