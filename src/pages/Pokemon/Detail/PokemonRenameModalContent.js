import { useRef, useState } from 'react';
import { useApi } from './../../../hooks/useApi';
import { fetchCatchPokemon, fetchRenamePokemon } from './../../../api/pokemonRngApi';
import useEffectOnce from './../../../hooks/useEffectOnce';
import { useMyPokemons } from './../../../contexts/MyPokemonsContext';
import { ACTION } from './../../../constants/ActionConstant';
import { useEffect } from 'react';

export default function PokemonRenameModalContent({ show, handleClose, pokemon }) {
  const [response, fetchMethod] = useApi(() => fetchRenamePokemon(pokemon))
  const {dispatch} = useMyPokemons()

  useEffectOnce(() => {
    fetchMethod()
  })
  
  useEffect(() => {
    console.log(response);
    if (response.isSuccess) {
      dispatch({
        type: ACTION.EDIT,
        payload: {
          ...pokemon,
          renameCount: pokemon.renameCount++
        }
      })
    }
  }, [response])
  
  return (
    show &&
    <div className='flex column center'>
      {
        response.isFetching || response.data === null ?
        <span>Loading...</span> :
        <div className='flex column center'>
          <span>
            You have successfully renamed {pokemon.renameCount} times.
          </span>
          <span>
            Your pokemon now named as {response.data}.
          </span>
          <button className='margin-top-small' onClick={handleClose}>ok</button>
        </div>
      }
    </div>
  )
}