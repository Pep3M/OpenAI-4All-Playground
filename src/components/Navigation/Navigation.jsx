import React from "react";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import DrawerMenu from "./Drawer/DrawerMenu";
import NavCard from "./NavCard/NavCard";
import { CodeOff } from "@mui/icons-material";

const modules = [
  {
    code: "textCompletion",
    name: "Generador de texto",
    icon: <TextsmsIcon />
  },
  {
    code: "imageGeneration",
    name: "Generador de imágenes",
    icon: <ImageSearchIcon />
  },
  /* {
    code: "codeGeneration",
    name: "Generador de código",
    icon: <CodeOff />
  } */
];

const NavigationItems = ({ selected, close }) => {
  const handleClick = (moduleSelected) => {
    selected(moduleSelected.code);
    close(true);
  };

  return (
    <List>
      <ListItemText>
        <Typography
          variant="h4"
          color="primary"
          sx={{ ml: 2, userSelect: "none" }}
        >
          AI 4 All
        </Typography>
      </ListItemText>
      <Divider />
      {modules.map((item, key) => (
        <ListItem key={key} disablePadding>
          <ListItemButton onClick={(e) => handleClick(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Navigation = ({ open, selected, close, drawerMode }) => {
  if (drawerMode) {
    return (
      <div>
        <DrawerMenu open={open} close={(c) => close(!c)}>
          <NavigationItems selected={selected} close={(c) => close(!c)} />
        </DrawerMenu>
      </div>
    );
  } else {
    return (
      <NavCard>
        <NavigationItems selected={selected} close={(c) => close(!c)} />
      </NavCard>
    );
  }
};

export default Navigation;
