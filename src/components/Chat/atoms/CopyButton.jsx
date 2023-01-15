import { useState } from "react";
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Check, ContentPaste } from "@mui/icons-material";

const CopyButton = ({text}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      await setTimeout(() => {
        setIsCopied(false)
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      {
        !isCopied ? (
          <IconButton aria-label="" onClick={handleClick} sx={{
            color: '#949494',
            transform: 'scale(0.7)'
          }}>
            <ContentPaste/>
          </IconButton>
        ) : (
          
            <Check sx={{
            color: '#949494',
            transform: 'scale(0.7)'
          }}/>
        )
      }
    </div>
  );
};

export default CopyButton;
