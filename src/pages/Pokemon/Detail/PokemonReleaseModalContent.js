import { useRef, useState } from 'react';
import { useApi } from './../../../hooks/useApi';
import { fetchPokemon, fetchReleasePokemon } from './../../../api/pokemonRngApi';
import useEffectOnce from './../../../hooks/useEffectOnce';
import { useMyPokemons } from './../../../contexts/MyPokemonsContext';
import { ACTION } from './../../../constants/ActionConstant';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PokemonReleaseModalContent({ show, handleClose, pokemon }) {
  const [step, setStep] = useState(0)
  const [pokeball, setPokeball] = useState('play')

  function playPokeball() {
    setPokeball('play')
  }
  function stopPokeball() {
    setPokeball('stop')
  }

  function nextStep() {
    setStep(prev => prev+1)
  }
  function gotoStep(step) {
    setStep(step)
  }

  function message(step) {
    switch(step) {
      case 0: return <MessageWaiting pokemon={pokemon} gotoStep={gotoStep} playPokeball={playPokeball} />
      case 1: return <MessageSuccess pokemon={pokemon} nextStep={nextStep} stopPokeball={stopPokeball} gotoStep={gotoStep} handleClose={handleClose} />
      case 2: return <MessageFailed pokemon={pokemon} gotoStep={gotoStep} stopPokeball={stopPokeball} handleClose={handleClose} />
      default: return <MessageWaiting gotoStep={gotoStep} stopPokeball={stopPokeball} />
    }
  }

  return (
    show &&
    <div className='flex column center'>
      <div className={`pokeball ${pokeball} small`}>
        <div className={`pokeball__button ${pokeball}`}></div>
      </div>
      <div className='framed'>
        {message(step)}
      </div>
    </div>
  )
}

const MessageWaiting = ({ pokemon, gotoStep, playPokeball }) => {
  const [response, fetchMethod] = useApi(fetchReleasePokemon)
  
  useEffectOnce(() => {
    playPokeball()
    fetchMethod()
  })

  useEffect(() => {
    if (response.isSuccess) {
      setTimeout(() => {
        isPrime(response.data) ? gotoStep(1) : gotoStep(2)
      }, 3000);
    }
  }, [response])
  
  const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
  }

  return (
    <p className='message'>
      Releasing {pokemon.name}...
    </p>
  )
}

const MessageSuccess = ({ pokemon, nextStep, stopPokeball, gotoStep, handleClose }) => {
  const {dispatch} = useMyPokemons()

  useEffectOnce(() => {
    stopPokeball()
    dispatch({
      type: ACTION.DELETE,
      payload: {
        id: pokemon.id,
      }
    })
  })
  
  return (
    <>
      <p className='message'>
        {pokemon.name} was released outside.
        <br/>
        Bye {pokemon.name}!
      </p>
      <div className='buttons margin-top-small'>
        <Link to='/pokemon'>
          <button onClick={handleClose}>bye</button>
        </Link>
      </div>
    </>
  )
}

const MessageFailed = ({ pokemon, gotoStep, stopPokeball, handleClose }) => {

  useEffectOnce(() => {
    stopPokeball()
  })

  function handleRetry() {
    gotoStep(0)
  }
  function handleCancel() {
    gotoStep(0)
    handleClose()
  }

  return (
    <>
      <p className='message'>
        <span className='uppercase'>{pokemon.name}</span> doesn't want to be released!
      </p>
      <div className='buttons margin-top-small'>
        <button onClick={handleRetry}>retry</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    </>
  )
}