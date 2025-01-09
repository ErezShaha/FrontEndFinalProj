import { createContext, useContext } from "react";

export const GamePageContext = createContext();

export const useGamePageContext = () => useContext(GamePageContext);