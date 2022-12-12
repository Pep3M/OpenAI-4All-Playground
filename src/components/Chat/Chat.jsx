/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Container
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect, useRef, useState } from "react";
import Message from "./elements/Message";
import useTextCompletion from "../../hooks/useTextCompletion";

const Chat = () => {
  //states
  const [state, setState] = useState({
    question: "",
    answer: ""
  });
  const [dialog, setDialog] = useState([]);
  const refInputQuestion = useRef(null);

  //custom hooks
  const { response, error, loading, setInput } = useTextCompletion();

  //ref
  const idRef = useRef(0);

  //functions and handlers
  const getDialogId = (newId = false) => {
    if (newId) idRef.current += 1;
    return idRef.current;
  };

  const handleTextChange = (e) => {
    setState((prev) => ({
      ...prev,
      question: e.target.value
    }));
  };

  const send = () => {
    const textToSend = state.question;

    refInputQuestion.current.focus();
    if (textToSend === "") return;

    //reset question input
    setState((prev) => ({
      ...prev,
      question: ""
    }));

    //add new question
    let newDialog = [...dialog];
    newDialog.unshift({
      id: getDialogId(true),
      text: textToSend,
      type: "question"
    });
    setDialog(newDialog);

    //sending a question to hook
    setInput({ id: getDialogId(true), text: textToSend });
  };

  //useEffects
  useEffect(() => {
    refInputQuestion.current.focus();
  }, []);

  useEffect(() => {
    if (response) {
      let newDialog = [...dialog];

      response.forEach((data) => {
        newDialog.unshift({
          ...data,
          type: "response"
        });
      });
      
      setDialog(newDialog);
    }

    if (error) console.log(error);
  }, [response, error]);

  useEffect(() => {
    if (loading) {
      let newDialog = [...dialog];
      newDialog.unshift({
        id: getDialogId(),
        text: "",
        type: "loader"
      });
      setDialog(newDialog);
    } else {
      let newDialog = dialog.filter((item) => item.type !== "loader");
      setDialog(newDialog);
    }
  }, [loading]);

  return (
    <Card
      sx={{
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 275,
        maxWidth: 1000,
        padding: 3
      }}
    >
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column-reverse",
          border: "solid 1px #c4c4c4",
          borderRadius: 1,
          p: 2,
          overflowY: "auto"
        }}
      >
        {dialog.map((d, key) => (
          <Message key={key} text={d.text} type={d.type} />
        ))}

        {/* loading ? <DotMovement color={colorSecundary} show={true}/> : null */}
      </Container>

      <FormControl
        sx={{ flexShrink: 0, mt: 2, width: "100%", backgroundColor: "white" }}
        variant="outlined"
      >
        <InputLabel htmlFor="question">Escríbele algo a la IA</InputLabel>
        <OutlinedInput
          inputRef={refInputQuestion}
          id="question"
          label="Escríbele algo a la IA"
          type="text"
          color="primary"
          autoComplete="off"
          value={state.question}
          onChange={handleTextChange}
          onKeyUp={(e) => {
            if (e.key === "Enter") send();
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="send text" onClick={send} edge="end">
                <SendRoundedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Card>
  );
};

export default Chat;
