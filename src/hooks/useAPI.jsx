import { useState, useEffect } from 'react';
import axios from 'axios';

function useAPI() {
  const [options, setOptions] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.request(options);
        setResponse(res.data);
        setIsLoading(false);     
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log('Request Error 😒');        
      }
    };
    if (options) fetchData();
  }, [options]);

  return { setOptions, response, error, isLoading };
}

export default useAPI;