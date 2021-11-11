import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePokedex(page, setLoading) {
  const [error, setError] = useState(false);
  const [pokemons, setpokemons] = useState([]);

  useEffect(() => {
    setpokemons([]);
  }, [page]);

  useEffect(() => {
    if (page !== '') {
      setLoading(true);
      setError(false);
      let cancel;
      axios({
        method: 'GET',
        url: 'http://localhost:3000/pokedex',
        params: { page },
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      })
        .then(response => {
          setpokemons(response.data.currentPokes);
          setLoading(false);
        })
        .catch(e => {
          if (axios.isCancel(e)) return;
          console.log(e);
          setError(true);
        });
      return () => cancel();
    }
  }, [page]);

  return { error, pokemons };
}
