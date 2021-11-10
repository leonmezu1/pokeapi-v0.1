import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePokeSearch(query) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [pokemon, setpokemon] = useState([])

  useEffect(() => {
    setpokemon([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    if (query !== '') {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/search',
        params: { search: query.trim() },
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(response => {
        console.log(response.data)
        setLoading(false)
      }).catch(e => {
        if (axios.isCancel(e)) return
        console.log(e)
        setError(true)
      })
      return () => cancel()
    }
  }, [query])

  return { loading, error, pokemon }
}


