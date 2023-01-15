import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import styled, { keyframes } from "styled-components";
import { colorPrimary, colorSecundary } from "../../../styles/styles";
import DotMovement from "../../loaders/DotMovement";

const riseMsgAnimation = keyframes`
  0% {
    top: 20px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`;
/* animation-name: ${riseMsgAnimation};
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); */

const MessagePaper = styled(Paper)`
  padding: 8px;
  color: white;
  position: relative;
  min-width: 20px;
  max-width: 90%;
  flex-wrap: wrap;
  word-break: break-word;
  background-color: ${(props) =>
    props.type === "question" ? colorPrimary : colorSecundary};
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 12px;
    ${(props) => (props.type === "question" ? "left" : "right")}: -5px;
    width: 15px;
    height: 15px;
    border-radius: 3px;
    background-color: ${(props) =>
      props.type === "question" ? colorPrimary : colorSecundary};
    z-index: -1;
    transform: rotate(45deg);
  }
`;

const MessageContent = ({ data }) => {
  return (
    <Box>
      {data.map((item, i) => {
        switch (item.type) {
          case "code":
            return (
              <pre>
                <code>{item.content}</code>
              </pre>
            );

          default:
            return item.content ? (
              <Typography key={i} variant="body1" style={{ zIndex: 2 }}>
                {`${item.content}`}
              </Typography>
            ) : (
              <br />
            );
        }
      })}
    </Box>
  );
};

const Message = ({ text = "", type = "question" }) => {
  if (!text && type !== "loader") return <></>;

  const formatText = () => {
    //const reParse = `${text.trim().split("\n").join("\n")}`;
    let string = text.trim();
    const reg = /<code>(.*?)<\/code>/gs;

    const match = string.match(reg) || [];
    const splited = string.split(reg).filter((item) => item);
    let isCode = string.search(reg) === 0;

    let result = [];

    splited.forEach((item) => {
      result.push({
        type: isCode ? "code" : 'text',
        content: item
      });
      isCode = !isCode;
    });

    console.log(`Hay ${match.length} bloques de codigo:`, text);
    
    /* let result = match.map((val) => {
      if (val.includes("<code>")) {
        return {
          type: "code",
          content: val.replace(/<code>|<\/code>/g, "")
        };
      } else {
        return {
          type: "text",
          content: val
        };
      }
    }); */
    return result;
  };

  //console.log("formatText", formatText());
  return (
    <Box
      sx={{
        mt: 1,
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: type === "question" ? "flex-start" : "flex-end"
      }}
    >
      <MessagePaper type={type}>
        {type === "loader" ? (
          <DotMovement />
        ) : (
          <MessageContent data={formatText()} />
        )}
      </MessagePaper>
    </Box>
  );
};

export default Message;
