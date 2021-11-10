import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePokedex(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setpokemons] = useState([]);

  useEffect(() => {
    setpokemons([]);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    if (page !== '') {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/pokedex',
        params: { page },
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      })
        .then(response => {
          console.log(response.data);
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

  return { loading, error, pokemons };
}
