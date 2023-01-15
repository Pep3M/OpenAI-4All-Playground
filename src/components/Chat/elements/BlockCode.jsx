import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import LanguageDetect from "languagedetect";
import CopyButton from "../atoms/CopyButton";
import { Card } from "@mui/material";

const BlockCode = ({ code }) => {
  const lngDetector = new LanguageDetect();
  const language = lngDetector.detect(code, 1);

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <Card sx={{
        bgcolor: 'RGB(40,44,52)',
        paddingInline: 1,
        mt: 2,
        mb: 1
      }}>
        <SyntaxHighlighter language={language} style={atomOneDark}>
          {code}
        </SyntaxHighlighter>
      </Card>
      <div
        style={{
          width: 40,
          height: 40,
          position: "absolute",
          top: -30,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CopyButton text={code} />
      </div>
    </div>
  );
};

export default BlockCode;
