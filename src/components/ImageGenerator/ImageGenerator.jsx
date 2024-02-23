import {
  Box,
  Card,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import React, { useEffect, useRef, useState } from "react";
import useAPI from "../../hooks/useAPI";
import { imageRequest } from "../../utils/apiRequests";
import Image from "./elements/Image";
import DialogShowImg from "./elements/DialogShowImg";

const ImageGenerator = () => {
  const [message, setMessage] = useState("");
  const { setOptions, response, isLoading, error } = useAPI();
  const idQuery = useRef(0);
  const [imagesHistory, setImagesHistory] = useState([]);
  const refInputQuestion = useRef(null);

  //dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentImg = useRef(null);
  const handleImageClick = (e, img) => {
    currentImg.current = img;
    setDialogOpen(true);
  };

  const send = (e) => {
    setMessage("");
    setOptions(imageRequest(message));
    idQuery.current = idQuery.current += 1;
    setImagesHistory((prev) => [
      {
        id: idQuery.current,
        query: message,
        isLoading: true,
        images: []
      },
      ...prev
    ]);
  };
  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };


  // useEffects
  useEffect(() => {
    const newImgsHist = imagesHistory.map((item) => {
      if (item.id === idQuery.current) {
        return {
          ...item,
          isLoading: false,
          images: response.data
        };
      } else return item;
    });

    setImagesHistory(newImgsHist);
  }, [response]);

  return (
    <Box
      sx={{
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 275,
        maxWidth: 1000,
        padding: 3,
        pt: 0
      }}
    >
      <FormControl
        sx={{ flexShrink: 0, mt: 0, width: "100%", backgroundColor: "white" }}
        variant="outlined"
        disabled={isLoading}
      >
        <InputLabel htmlFor="question">Escríbele algo a la IA</InputLabel>
        <OutlinedInput
          inputRef={refInputQuestion}
          id="question"
          label="Escríbele algo a la IA"
          type="text"
          color="primary"
          autoComplete="off"
          value={message}
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
      <Card
        sx={{
          mt: 1,
          flexGrow: 1,
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {imagesHistory.map((request, key) => {
          return (
            <Box
              key={key}
              sx={{
                width: "calc(100% - 32px)",
                //border: '1px solid #c4c4c4',
                borderRadius: 2,
                m: 1,
                p: 1
              }}
            >
              <Typography variant="h6" color="primary">
                {request.query}
              </Typography>
              {request.isLoading ? <LinearProgress /> : <Divider />}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}
              >
                {request.images.map((item, key) => (
                  <Card
                    key={key}
                    elevation={2}
                    onClick={(e) => handleImageClick(e, item.url)}
                    sx={{
                      cursor: "pointer",
                      mt: 1,
                      mr: 1,
                      position: "relative"
                    }}
                  >
                    <Image src={item.url} width={250} height={250} radius={1} />
                    
                  </Card>
                ))}
              </Box>
            </Box>
          );
        })}
      </Card>
      <DialogShowImg
        img={currentImg.current}
        open={dialogOpen}
        onClose={setDialogOpen}
      />
    </Box>
  );
};

export default ImageGenerator;
