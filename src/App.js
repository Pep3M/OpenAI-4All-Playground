import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import ImageGenerator from "./components/ImageGenerator/ImageGenerator";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "./components/Navigation/Drawer/DrawerMenu";
import Navigation from "./components/Navigation/Navigation";

const ShowModule = ({ moduleAct }) => {
  switch (moduleAct) {
    case "textCompletion":
      return <Chat />;

    case "imageGeneration":
      return <ImageGenerator />;

    default:
      return <Chat />;
  }
};

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [moduleActive, setModuleActive] = useState("textCompletion");

  const mobileBreakpoint = useMediaQuery("(max-width: 1000px)");

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
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={() => setOpenDrawer(true)}
          edge="start"
          sx={{ mr: 2, display: mobileBreakpoint ? "" : "none" }}
        >
          <MenuIcon />
        </IconButton>

        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"
          style={{
            width: 50,
            marginRight: 25
          }}
        />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "calc(100% - 50px)",
            flexGrow: 1
          }}
        >
          <Navigation
            open={openDrawer}
            selected={(c) => setModuleActive(c)}
            close={setOpenDrawer}
            drawerMode={mobileBreakpoint}
          />
          <ShowModule moduleAct={moduleActive} />
        </Box>

        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ pt: 2, flexShrink: 0 }}
        >
          Powered by <a href="https://github.com/Pep3M">Pep3M</a>
        </Typography>
      </Box>
    </div>
  );
}

export default App;
