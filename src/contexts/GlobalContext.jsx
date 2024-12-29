import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalStateProvider = ({children}) => {
    const potentialUsername = sessionStorage.getItem('user');
    const [mainUser, setmainUser] = useState({username: potentialUsername ? potentialUsername : '', password: ''});

    return (
        <GlobalContext.Provider value={{mainUser,setmainUser}}>
            {children}
        </GlobalContext.Provider>
    )
}