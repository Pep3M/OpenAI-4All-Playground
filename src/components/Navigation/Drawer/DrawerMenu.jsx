import { Drawer } from "@mui/material";

const DrawerMenu = ({ open, close, children }) => {
  return (
    <Drawer anchor={"left"} open={open} onClose={() => close(true)}>
      {children}
    </Drawer>
  );
};

export default DrawerMenu;
