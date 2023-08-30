import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    (function () {
      try {
        setLoading(true);
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then((response) => {
          console.log(response);
          setData(response.data.results || response.data);
        });
        
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
