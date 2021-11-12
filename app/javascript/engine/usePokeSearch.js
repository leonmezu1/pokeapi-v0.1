import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePokeSearch(query, setLoading) {
  const [error, setError] = useState(false);
  const [pokemons, setResults] = useState([]);

  useEffect(() => {
    setResults([]);
  }, [query]);

  useEffect(() => {
    if (query !== '') {
      setLoading(true);
      setError(false);
      let cancel;
      axios({
        method: 'GET',
        url: '/search',
        params: { search: query.trim() },
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      })
        .then(response => {
          setResults(response.data.pokemons);
          setLoading(false);
        })
        .catch(e => {
          if (axios.isCancel(e)) return;
          console.log(e);
          setError(true);
        });
      return () => cancel();
    }
  }, [query]);

  return { error, pokemons };
}
