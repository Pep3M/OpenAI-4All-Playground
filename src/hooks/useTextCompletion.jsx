import { useEffect, useState } from "react";
import axios from "axios";

const URL_API = "https://openai4all.onrender.com/";

const codeRequest = '. Si tu respuesta incluyo algo con codigo, redealo con un <code> y </code>, si no ignora esto'

function useTextCompletion() {
  const [input, setInput] = useState({});
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function sendMessageToChatGPT(message) {
      const idInput = input.id;
      setLoading(true);
      setError(false);
      try {
        const options = {
          method: "POST",
          url: URL_API + "v1/completions",
          headers: { "Content-Type": "application/json" },
          data: { message: input.text + codeRequest }
        };
        const response = await axios.request(options);

        if (response?.data?.error) {
          setResponse("");
          setError(response.data.error);
          return;
        }

        let dataResp = response.data.choices[0].text;
        //dataResp = dataResp.split("\n");
        let dataFormatted = [];
        let id = idInput;
        //dataResp.forEach((resp) => {
          id += 1;
          dataFormatted.push({
            id,
            text: dataResp
          });
        //});
        
        setResponse(dataFormatted);
        setInput({ id: 0, text: "" });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    if (input.text) sendMessageToChatGPT(input);
  }, [input]);

  return { response, loading, error, setInput };
}

export default useTextCompletion;
