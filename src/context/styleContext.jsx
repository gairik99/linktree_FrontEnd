import { useContext, useState, createContext } from "react";

const StyleContext = createContext();

// eslint-disable-next-line react/prop-types
const StyleProvider = ({ children }) => {
    const [style, setStyle] = useState({
        buttonAlignment: '',
        buttonStyle: '',
        buttonColor: '',
        buttonFontColor: '',
        theme: ''
    });


    return (
        <StyleContext.Provider value={{ style, setStyle }}>
            {children}
        </StyleContext.Provider>
    );
};

const useStyle = () => useContext(StyleContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useStyle, StyleProvider };