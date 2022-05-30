import React, { createContext, useContext, useEffect, useReducer } from "react"
import useMyPokemonsReducer, { initializer } from '../reducers/useMyPokemonsReducer'

const MyPokemonsContext = createContext()

export function useMyPokemons() {
  return useContext(MyPokemonsContext)
}

export const MyPokemonsProvider = ({ children }) => {
  const [myPokemons, dispatch] = useReducer(useMyPokemonsReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  return (
    <MyPokemonsContext.Provider value={{myPokemons,dispatch}}>
      {children}
    </MyPokemonsContext.Provider>
  )
}