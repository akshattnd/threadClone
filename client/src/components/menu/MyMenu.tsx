import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import { toggleMyMenu } from "../../rtk/slice";

const MyMenu = () => {
  const dispatch = useDispatch();
  const { openMyMenu, darkMode } = useSelector(
    (state: RootState) => state.service
  );

  return (
    <div>
      <Menu
        onClose={() => dispatch(toggleMyMenu(null))}
        anchorEl={openMyMenu}
        open={openMyMenu != null ? true : false}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#333" : "#fff", // Menu background
            color: darkMode ? "#fff" : "#000", // Text color
          },
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "#444" : "#f0f0f0", // Hover effect
            },
          }}
        >
          Unfollow
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "#444" : "#f0f0f0",
            },
          }}
        >
          Go to thread
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
