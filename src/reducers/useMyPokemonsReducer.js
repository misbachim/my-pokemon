import { v4 as uuidV4 } from "uuid"
import { ACTION } from './../constants/ActionConstant';
import { Temporal } from "@js-temporal/polyfill";

// payload:
// {
//   id: string
//   pokemon: string,
//   name: string,
//   renameCount: int (default: 0),
//   createdAt: datetime,
//   updatedAt: datetime,
// }
const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("myPokemons")) || initialValue;

const reducer = (state, action) => {
  const payload = action.payload
  switch (action.type) {
    case ACTION.ADD:
        return [...state, newPokemon( payload )]
    case ACTION.EDIT:
      return state.map(myPokemon => {
        if (myPokemon.id === payload.id) {
          return { ...myPokemon, name: payload.name, renameCount: payload.renameCount, updatedAt: Temporal.Now.plainDateTimeISO().toString() } 
        } 
        return myPokemon
      });
    case ACTION.DELETE:
      return state.filter(myPokemon => {
        return myPokemon.id !== payload.id
      })
    default:
      return state;
  }
};
export default reducer;


function newPokemon({ pokemon, name }) {
  console.log({ id: uuidV4(), pokemon, name, renameCount: 0, createdAt: Temporal.Now.plainDateTimeISO().toString() });
  return { id: uuidV4(), pokemon, name, renameCount: 0, createdAt: Temporal.Now.plainDateTimeISO().toString() };
}
