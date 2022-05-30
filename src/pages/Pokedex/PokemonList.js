import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

export default function PokemonList({ pokemon }) {
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/'+pokemon)
  const { loading, error, value } = useFetch(
    currentPageUrl,
    {},
    [currentPageUrl]
  )

  return (
    <li>
      <Link className='button flex column center' to={'/pokedex/'+pokemon}>
          {
            !loading &&
            <>
              <img src={value.sprites.front_default} alt={pokemon}/>
              <span className='margin-right'>{value.id}</span>
            </>
          }
          {pokemon}
      </Link>
    </li>
  )
}
