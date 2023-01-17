/* eslint-disable react-hooks/exhaustive-deps */
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Container,
  useMediaQuery
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect, useRef, useState } from "react";
import Message from "./elements/Message";
import useTextCompletion from "../../hooks/useTextCompletion";
import Toast from "../Toast/Toast";

const Chat = () => {
  const mobileBreakpoint = useMediaQuery("(max-width: 599px)");

  //states
  const [dialog, setDialog] = useState([]);
  const [inputText, setInputText] = useState(false);
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
    const text = refInputQuestion.current.value;
    refInputQuestion.current.value = text.substring(0, 150);
    if (text && !inputText) setInputText(true);
    if (!text && inputText) setInputText(false);
  };

  const send = () => {
    const textToSend = refInputQuestion.current.value;

    refInputQuestion.current.focus();
    if (textToSend === "") return;

    //reset question input
    refInputQuestion.current.value = "";
    setInputText(false);

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
    <>
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column-reverse",
          border: mobileBreakpoint ? "none" : "solid 1px #c4c4c4",
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
        sx={{
          flexShrink: 0,
          mt: 2,
          width: mobileBreakpoint ? "calc(100% - 32px)" : "100%",
          backgroundColor: "white",
          marginInline: mobileBreakpoint ? 2 : 0
        }}
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
          onChange={handleTextChange}
          onKeyUp={(e) => {
            if (e.key === "Enter") send();
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="send text"
                onClick={send}
                edge="end"
                disabled={!inputText}
              >
                <SendRoundedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {error && <Toast message="No se pudo acceder al servicio" />}
    </>
  );
};

export default Chat;
