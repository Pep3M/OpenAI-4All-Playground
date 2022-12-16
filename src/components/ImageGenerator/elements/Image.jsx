import { Box, Skeleton } from "@mui/material";
import React, { useRef, useState } from "react";

const Image = ({ src, width, height, radius=1 }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: radius,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{
            zIndex: 1
          }}
        />
      )}

      <img
        ref={ref}
        src={src}
        alt=""
        width="100%"
        height="100%"
        style={{
          opacity: loaded ? 1 : 0,
          position: "absolute",
          top: 0,
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 0,
          objectFit: "cover",
          objectPosition: "center center",
          filter: loaded ? "blur(0px)" : "blur(10px)",
          transition: "0.2s ease"
        }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
};

export default Image;
