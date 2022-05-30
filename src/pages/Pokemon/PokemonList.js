import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

export default function PokemonList({ id, name, pokemon }) {
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/'+pokemon)
  const { loading, error, value } = useFetch(
    currentPageUrl,
    {},
    [currentPageUrl]
  )

  return (
    <li>
      <Link className='button flex column center' to={'/pokemon/'+id}>
          {
            !loading &&
            <>
              <img src={value.sprites.front_default} alt={pokemon}/>
            </>
          }
          <span>{name}</span>
          <span>/{pokemon}</span>
      </Link>
    </li>
  )
}
