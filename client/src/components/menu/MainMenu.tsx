import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import { addMyProfile, toggleMainMenu, toggleTheme } from "../../rtk/slice";
import { useLogoutMutation } from "../../rtk/service";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const [logout, logoutData] = useLogoutMutation();
  const dispatch = useDispatch();
  const { openMainMenu, darkMode, myProfile } = useSelector(
    (state: RootState) => state.service
  );

  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };

  const handleLogout = async () => {
    handleClose();
    await logout('');

  }
  useEffect(() => {
    if (logoutData.isSuccess) {
      dispatch(addMyProfile(null));
      window.location.reload();
    }
  }, [logoutData.isSuccess]);

  return (
    <div>
      <Menu
        onClose={handleClose}
        anchorEl={openMainMenu}
        open={openMainMenu != null ? true : false}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#333" : "#fff", // Menu background
            color: darkMode ? "#fff" : "#000", // Text color
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(toggleTheme());
          }}
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "#444" : "#f0f0f0", // Hover effect
            },
          }}
        >
          Toggle Theme
        </MenuItem>
        <Link to={`profile/threads/${myProfile.user._id}`}>
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f0f0f0",
              },
            }}
          >
            My Profile
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "#444" : "#f0f0f0",
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
