import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
const MainMenu = () => {
  const handleClose = () => {};
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      \ /* anchorEl need global variable for position*/
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
