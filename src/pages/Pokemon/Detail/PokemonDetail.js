import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Modal from '../../../components/Modal/Modal';
import useFetch from '../../../hooks/useFetch';
import PokemonType from './PokemonType';
import { useMyPokemons } from './../../../contexts/MyPokemonsContext';
import PokemonRenameModalContent from './PokemonRenameModalContent';
import PokemonReleaseModalContent from './PokemonReleaseModalContent';

export default function PokemonDetail() {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const { myPokemons } = useMyPokemons()
  const params = useParams();
  const [pokemon, setPokemon] = useState(myPokemons.find(pokemon => pokemon.id === params.id))
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/"+pokemon.pokemon)
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
  function openModalRename() {
    modalOpen()
    setModalContent('rename')
  }
  function openModalRelease() {
    modalOpen()
    setModalContent('release')
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
          {
            modalContent === 'rename' ?
            <PokemonRenameModalContent show={modal} handleClose={modalClose} pokemon={pokemon}/>
            :
              <PokemonReleaseModalContent show={modal} handleClose={modalClose} pokemon={pokemon}/>
          }
        </Modal>
        <div className='flex'>
          <div className='flex column'>
            <div className='flex'>
              <img className='pokemon' src={value.sprites.front_default} alt={pokemon}/>
              <div className='flex column'>
                <span>{pokemon.name}</span>
                <span className='uppercase'>/{pokemon.pokemon}</span>
                <ul className='framed no-hd buttons'>
                  <li><button onClick={openModalRename}>rename</button></li>
                  <li><button onClick={openModalRelease}>release</button></li>
                </ul>
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