import { useState, useEffect } from 'react';
import axios from 'axios';

function useAPI() {
  const [options, setOptions] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Call useEffect API');
    const fetchData = async () => {
      setIsLoading(true);
      console.log('Initializing...');
      try {
        const res = await axios.request(options);
        setResponse(res.data);
        setIsLoading(false);
        console.log('Request done!');        
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