import {
  Download,
  DownloadForOfflineRounded,
  DownloadRounded
} from "@mui/icons-material";
import { Box, Dialog, IconButton } from "@mui/material";
import axios from "axios";
import React from "react";
import Image from "./Image";

const DialogShowImg = ({ img, open = false, onClose }) => {
 
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          width: "80vw",
          maxWidth: 512,
          minWidth: 200,
          height: "80vw",
          maxHeight: 512,
          minHeight: 200,
          borderRadius: 1,
          position: "relative"
        }}
      >
        <Image src={img} width={"100%"} height={"100%"} />
        
      </Box>
    </Dialog>
  );
};

export default DialogShowImg;
