import { createContext, useState, useContext } from "react";

const ResetContext = createContext();

const ResetProvider = ({children}) =>{
    const [resetToken, setResetToken] = useState("");
  
    return (
        <ResetContext.Provider value={{resetToken, setResetToken}}>
            {children}
        </ResetContext.Provider>
    );
};

const useReset = ()=> useContext(ResetContext);

export {useReset, ResetProvider};