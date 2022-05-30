import { useRef, useState } from 'react';
import { useApi } from './../../../hooks/useApi';
import { fetchCatchPokemon } from './../../../api/pokemonRngApi';
import useEffectOnce from './../../../hooks/useEffectOnce';
import { useMyPokemons } from './../../../contexts/MyPokemonsContext';
import { ACTION } from './../../../constants/ActionConstant';
import { useEffect } from 'react';

export default function PokemonCatchModalContent({ show, handleClose, pokemon }) {
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
      case 0: return <MessageWaitingCatch gotoStep={gotoStep} playPokeball={playPokeball} />
      case 1: return <MessageSuccessCatch pokemon={pokemon} nextStep={nextStep} stopPokeball={stopPokeball} gotoStep={gotoStep} handleClose={handleClose} />
      case 2: return <MessageRename pokemon={pokemon} gotoStep={gotoStep} handleClose={handleClose} />
      case 3: return <MessageFailedCatch pokemon={pokemon} gotoStep={gotoStep} stopPokeball={stopPokeball} handleClose={handleClose} />
      default: return <MessageWaitingCatch gotoStep={gotoStep} stopPokeball={stopPokeball} />
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

const MessageWaitingCatch = ({ gotoStep, playPokeball }) => {
  const [response, fetchMethod] = useApi(fetchCatchPokemon)
  
  useEffectOnce(() => {
    playPokeball()
    fetchMethod()
  })

  useEffect(() => {
    if (response.isSuccess) {
      setTimeout(() => {
        response.data ? gotoStep(1) : gotoStep(3)
      }, 3000);
    }
  }, [response])
  
  return (
    <p className='message'>
      PauseChamp...
    </p>
  )
}

const MessageSuccessCatch = ({ pokemon, nextStep, stopPokeball, gotoStep, handleClose }) => {
  const {dispatch} = useMyPokemons()

  useEffectOnce(() => {
    stopPokeball()
  })
  
  function handleCancel() {
    dispatch({
      type: ACTION.ADD,
      payload: {
        pokemon: pokemon,
        name: pokemon.toUpperCase()
      }
    })
    gotoStep(0)
    handleClose()
  }

  return (
    <>
      <p className='message'>
        Gotcha!
        <br/>
        <span className='uppercase'>{pokemon}</span> was caught!
        <br/>
        Do you want to give a nickname?
      </p>
      <div className='buttons margin-top-small'>
        <button onClick={nextStep}>yes</button>
        <button onClick={handleCancel}>no</button>
      </div>
    </>
  )
}

const MessageRename = ({ pokemon, gotoStep, handleClose }) => {
  const {dispatch} = useMyPokemons()
  const nameRef = useRef()

  function handleSubmit() {
    dispatch({
      type: ACTION.ADD,
      payload: {
        pokemon: pokemon,
        name: nameRef.current.value
      }
    })
    gotoStep(0)
    handleClose()
  }

  function handleCancel() {
    dispatch({
      type: ACTION.ADD,
      payload: {
        pokemon: pokemon,
        name: pokemon
      }
    })
    gotoStep(0)
    handleClose()
  }

  return (
    <>
      <span className='uppercase'>{pokemon}</span> nickname:
      <input className='framed no-hd' type='text' maxLength={32} ref={nameRef} />
      <div className='buttons margin-top-small'>
        <button onClick={handleSubmit}>submit</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    </>
  )
}

const MessageFailedCatch = ({ pokemon, gotoStep, stopPokeball, handleClose }) => {

  useEffectOnce(() => {
    stopPokeball()
  })

  function handleRetry() {
    gotoStep(0)
  }
  function handleRun() {
    gotoStep(0)
    handleClose()
  }

  return (
    <>
      <p className='message'>
        <span className='uppercase'>{pokemon}</span> broke free!
      </p>
      <div className='buttons margin-top-small'>
        <button onClick={handleRetry}>retry</button>
        <button onClick={handleRun}>run</button>
      </div>
    </>
  )
}