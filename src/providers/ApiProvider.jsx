import React, { createContext, useContext, useState } from 'react';
import API_URL from '../api/config';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch stickers
    const getStickers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/stickers`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des stickers');
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return [];
        }
    };

    // Check if user exists
    const checkUserExists = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/users?email=${email}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la vérification de l\'utilisateur');
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { exists: false };
        }
    };

    // Create new sticker and user
    const createSticker = async (email, sticker) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/stickers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, sticker }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la création du sticker');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    // État et méthodes à exposer
    const value = {
        loading,
        error,
        getStickers,
        checkUserExists,
        createSticker
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;