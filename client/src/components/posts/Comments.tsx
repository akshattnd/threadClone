import { LinearScaleOutlined } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RootState } from "../../rtk/store";
import { useSelector } from "react-redux";
import { useState } from "react";

const Comments = () => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDeleteComment = () => {
    // Logic for handling comment deletion
  };
  const [commentMenu, setCommentMenu] = useState<any>(null);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={2}
        pb={4}
        borderBottom="1px solid gray"
        mx="auto"
        width={{ xs: "90%", sm: "70%" }}
        maxWidth="800px" // Restricts layout width for consistency
      >
        {/* User Info and Comment */}
        <Stack direction="row" gap={2}>
          <Avatar src="" alt="User Avatar" />
          <Stack direction="column">
            <Typography
              variant="h6"
              fontWeight="bold"
              color={darkMode ? "white" : "GrayText"}
              fontSize={{ xs: ".9rem", sm: "1rem" }}
            >
              Akshattandon__
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={{ xs: ".8rem", sm: ".9rem" }}
              color={darkMode ? "white" : "GrayText"}
            >
              this is comment
            </Typography>
          </Stack>
        </Stack>

        {/* Timestamp and Options */}
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          fontSize={{ xs: ".8rem", sm: ".9rem" }}
        >
          <Typography
            position="relative"
            color={darkMode ? "white" : "GrayText"}
            variant="subtitle1"
            fontSize="inherit"
          >
            24 min
          </Typography>
          <IconButton
            sx={{ alignItems: "start", paddingTop: "0px" }}
            onClick={(e) => {
              setCommentMenu(e.currentTarget);
            }}
          >
            <LinearScaleOutlined
              fontSize={isMediumScreen ? "large" : "medium"}
              className={darkMode ? "text-white" : "text-gray-600"}
            />
          </IconButton>
        </Stack>
      </Stack>

      {/* Dropdown Menu */}
      <Menu
        id="basic-menu"
        anchorEl={commentMenu}
        open={commentMenu != null ? true : false}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => {
          setCommentMenu(null);
        }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comments;
