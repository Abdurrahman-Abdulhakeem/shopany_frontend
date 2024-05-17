
import { useReducer, createContext, useContext } from "react";

const initialState = {
    isOpen: false
}

function reducer(state, action) {
    switch(action.type) {
        case "toggleBar" :
            return {...state, isOpen: !state.isOpen}
        
        case "closeBar":
            return {...state, isOpen: false}
        
        default:
            return state

    }
}

const HamContext = createContext()

function HamProvider({children}) {
    const [{isOpen:toggleBar}, dispatch] = useReducer(reducer, initialState)
    
  return (
    <HamContext.Provider value={{
        toggleBar,
        dispatch
    }}>

        {children}
    </HamContext.Provider>
  )
}

export default HamProvider


export function useHam() {
    return useContext(HamContext)
}