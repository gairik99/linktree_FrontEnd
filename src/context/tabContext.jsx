import { useContext, useState, createContext } from "react";

const TabContext = createContext();

// eslint-disable-next-line react/prop-types
const TabProvider = ({ children }) => {

    const [activeTab, setActiveTab] = useState('link')
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

const useTab = () => useContext(TabContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useTab, TabProvider };