import { useEffect, useState } from "react";
import axios from "axios";

const URL_API = "http://localhost:3131/";

function useTextCompletion() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function sendMessageToChatGPT(message) {
      setLoading(true)
      try {
        const options = {
          method: "POST",
          url: URL_API + "v1/completions",
          headers: { "Content-Type": "application/json" },
          data: { message: input }
        };
        const response = await axios.request(options);

        if (response?.data?.error) {
          setResponse('');
          setError(response.data.error);
          return
        }

        let textResp = response.data.choices[0].text
        textResp = textResp.split('\n')

        setResponse(textResp);
        console.log(textResp);
        setInput("");
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    if (input) sendMessageToChatGPT(input);
  }, [input]);

  return { response, loading, error, setInput };
}

export default useTextCompletion;
