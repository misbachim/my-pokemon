import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import PokemonList from './PokemonList';
import { useMyPokemons } from './../../contexts/MyPokemonsContext';

export default function Pokemon() {
  const { myPokemons } = useMyPokemons()
  
  return (
    <>
      {
        myPokemons.length === 0 ?
        <div>
          You have no pokemon!
        </div> :
        <>
          <ul className='buttons compact'>
          {myPokemons.map(p => (
            <PokemonList key={p.name} id={p.id} name={p.name} pokemon={p.pokemon} />
            ))}
            </ul>
        </>
      }
    </>
  )
}
