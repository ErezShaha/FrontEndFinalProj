import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalStateProvider = ({children}) => {
    const [mainUser, setmainUser] = useState({username: '', password: ''});

    return (
        <GlobalContext.Provider value={{mainUser,setmainUser}}>
            {children}
        </GlobalContext.Provider>
    )
}