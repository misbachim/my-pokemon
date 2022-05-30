import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Modal from '../../../components/Modal/Modal';
import useFetch from '../../../hooks/useFetch';
import PokemonCatchModalContent from './PokemonCatchModalContent';
import PokemonType from './PokemonType';

export default function PokedexDetail() {
  const [modal, setModal] = useState(false)
  const params = useParams();
  const [pokemon, setPokemon] = useState(params.pokemon)
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/"+pokemon)
  const { loading, error, value } = useFetch(
    currentPageUrl,
    {},
    [currentPageUrl]
  )

  function modalOpen() {
    setModal(true)
  }
  function modalClose() {
    setModal(false)
  }

  function addStrengths(strengths) {
    setStrengths(prev => [...prev, ...strengths])
  }
  function addWeaknesses(weaknesses) {
    setWeaknesses(prev => [...prev, ...weaknesses])
  }

  return (
    <>
    {
      loading ? 
      <div>Loading...</div> :
      <>
        <Modal show={modal}>
          <PokemonCatchModalContent show={modal} handleClose={modalClose} pokemon={pokemon}/>
        </Modal>
        <div className='flex'>
          <div className='flex column'>
            <div className='flex'>
              <img className='pokemon' src={value.sprites.front_default} alt={pokemon}/>
              <div className='flex column'>
                <span className='uppercase'>{value.name}</span>
                <div className='pokeball cursor-pointer small margin-top-small' onClick={modalOpen}>
                  <div className='pokeball__button'></div>
                </div>
              </div>
            </div>
            No.{value.id}
            <div className='flex column stats'>
              TYPE
              <div className='flex'>
                {
                  value.types.map(t => {
                    return (
                      <PokemonType key={t.type.name} typeUrl={t.type.url} addStrengths={addStrengths} addWeaknesses={addWeaknesses}>
                        <span>{t.type.name}</span>
                      </PokemonType>
                    )
                  })
                }
              </div>
              <span className='margin-top-small'>
                WEAKNESSES
              </span>
              <div className='flex wrap'>
                {
                  weaknesses.filter(weakness => 
                      !strengths.find(({ name }) => weakness.name === name))
                    .map(weakness => {
                      return (
                        <div key={weakness.name} className={`pkm-type ${weakness.name}`} >
                          <span>{weakness.name}</span>
                        </div>
                      )
                    })
                }
              </div>
            </div>
            <span className='margin-top-small'>BASE STATS</span>
            <div className='framed flex column'>
              {
                value.stats.map(s => {
                  return (
                    <div key={s.stat.name} className='stat uppercase'>
                      {s.stat.name}
                      <div className='number'>
                        {s.base_stat}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='flex column'>
            <div className='margin-left-small'>
              MOVES
              <div className='framed moves'>
                {
                  value.moves.map(m => {
                    return (
                      <div key={m.move.name} className='move uppercase'>
                        {m.move.name}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </>
    }
    </>
  )
}