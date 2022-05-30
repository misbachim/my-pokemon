import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { useEffect, useState } from 'react';

export default function PokemonType({ typeUrl, addStrengths, addWeaknesses }) {
  const [data, setData] = useState(null)
  const { loading, error, value } = useFetch(
    typeUrl,
    {},
    [typeUrl]
  )

  useEffect(() => {
    if (value) {
      if (data === null) {
        addStrengths(value.damage_relations.half_damage_from)
        addWeaknesses(value.damage_relations.double_damage_from)
        setData(value)
      }
    }
  }, [value])
  
  return (
    <>
      {
        value &&
        <div className={'pkm-type '+value.name} >
          <span>{value.name}</span>
        </div>
      }
    </>
  )
}
