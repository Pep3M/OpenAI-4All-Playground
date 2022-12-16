import { Box, Toolbar, Typography } from "@mui/material";
import Chat from "./components/Chat/Chat";
import ImageGenerator from "./components/ImageGenerator/ImageGenerator";

function App() {
  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Toolbar>
        <Typography variant="h4" color="primary">
          AI 4 All
        </Typography>
      </Toolbar>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          height: "calc(100% - 100px)",
          flexDirection: "column",
          background: "linear-gradient(0deg, #FFFFFF 0%, #EEEEEE 100%)"
        }}
      >
        {/* <Chat /> */}
        <ImageGenerator />
        <Typography variant="subtitle2" color="primary" sx={{pt:2}}>
          Powered by <a href="https://github.com/Pep3M">Pep3M</a>
        </Typography>
      </Box>
    </div>
  );
}

export default App;
