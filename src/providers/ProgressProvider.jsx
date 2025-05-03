import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

function ProgressProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ProgressContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </ProgressContext.Provider>
    );
}
export const useLoaderProgress = () => useContext(ProgressContext);
export default ProgressProvider;