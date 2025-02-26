import { useContext, useState, createContext, useEffect } from "react";

const LinkContext = createContext();

// eslint-disable-next-line react/prop-types
const LinkProvider = ({ children }) => {
    const getInitialLinks = () => {
        try {
            return JSON.parse(localStorage.getItem("link")) || [];
        } catch (error) {
            console.error("Error parsing link data from localStorage:", error);
            return [];
        }
    };

    const [link, setLink] = useState(getInitialLinks);

    useEffect(() => {
        // Always save to localStorage regardless of array content
        localStorage.setItem("link", JSON.stringify(link));
    }, [link]);

    return (
        <LinkContext.Provider value={{ link, setLink }}>
            {children}
        </LinkContext.Provider>
    );
};

const useLink = () => useContext(LinkContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useLink, LinkProvider };