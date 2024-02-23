import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import styled /* , { keyframes } */ from "styled-components";
import { colorPrimary, colorSecundary } from "../../../styles/styles";
import DotMovement from "../../loaders/DotMovement";
import BlockCode from "./BlockCode";

/* const riseMsgAnimation = keyframes`
  0% {
    top: 20px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`; */
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

const removeInitialDot = (string) => {
  let splited = string.split("\n");
  if (splited[0] === ".") splited.shift();
  let joined = splited.join("\n");
  if (joined.substring(0, 2) === ". ") joined = joined.substring(2);
  return joined;
};

const MessageContent = ({ data }) => {
  return (
    <Box sx={{ p: 1 }}>
      {data.map((item, i) => {
        switch (item.type) {
          case "code":
            return <BlockCode key={i} code={item.content} />;

          default:
            const lines = item.content.split("\n");
            return lines.map((line, i) =>
              line ? (
                <Typography key={i} variant="body1" style={{ zIndex: 2 }}>
                  {line}
                </Typography>
              ) : (
                <br key={i} />
              )
            );
        }
      })}
    </Box>
  );
};

const Message = ({ text = "", type = "question" }) => {
  if (!text && type !== "loader") return <></>;

  const formatText = () => {
    let string = text.trim();
    //const reg = /<code>(.*?)<\/code>/gs;  // utilizando <code>
    const reg = /(?<=```)[\s\S]*(?=```)/g   // utilizando ```

    const splited = string.split(/```/g).filter((item) => item);
    let isCode = string.search(/```/g) === 0;

    let result = [];

    splited.forEach((item) => {
      result.push({
        type: isCode ? "code" : "text",
        content: removeInitialDot(item)
      });
      isCode = !isCode;
    });

    return result;
  };

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
