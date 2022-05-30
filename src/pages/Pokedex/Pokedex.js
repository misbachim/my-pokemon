import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useEffectOnce from './../../hooks/useEffectOnce';
import PokemonList from './PokemonList';

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const { loading, error, value } = useFetch(
    currentPageUrl,
    {},
    [currentPageUrl]
  )

  useEffect(() => {
    if (value !== undefined) {
      setNextPageUrl(value.next)
      setPrevPageUrl(value.previous)
      setPokemon(value.results)
    }
  }, [value])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  
  return (
    <>
      {
        loading ?
        <div>Loading...</div> :
        <>
          <ul className='buttons compact'>
            {pokemon.map(p => (
              <PokemonList key={p.name} pokemon={p.name} />
            ))}
          </ul>
          <Pagination 
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </>
      }
    </>
  )
}

function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className='margin-top-small flex center'>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}