import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
const MainMenu = () => {
  const handleClose = () => {};
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      /* anchorEl need global variable for position*/
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
