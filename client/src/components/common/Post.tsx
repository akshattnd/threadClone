import { LinearScaleOutlined } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import PostOne from "../posts/PostOne";
import PostTwo from "../posts/PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../rtk/slice";
import { RootState } from "../../rtk/store";
const Post: React.FC = () => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      borderBottom="2px solid gray"
      p={isMediumScreen ? 1 : 0}
      mx="auto"
      my={1}
      width={{ xs: "90%", sm: "70%" }}
      maxWidth="800px" // Limit the maximum width for consistency
      sx={{ cursor: "pointer" }}
    >
      {/* Left Section: PostOne and PostTwo */}
      <Stack flexDirection="row">
        <PostOne />
        <PostTwo />
      </Stack>

      {/* Right Section: Time and Icon */}
      <Stack
        direction={"row"} // Stack vertically on small screens
        justifyContent="start"
        gap={1}
        fontSize={{ xs: ".9rem", sm: "1rem" }}
        width="100%" // Ensure it doesn't overflow
        sx={{
          maxWidth: "200px", // Optional: limit the maximum width to prevent it from expanding too much
        }}
      >
        <Typography
          variant="caption"
          position="relative"
          top={2}
          fontSize="1rem"
          color={darkMode ? "white" : "GrayText"}
        >
          24h
        </Typography>
        <IconButton
          sx={{
            alignItems: "start",
            paddingTop: 0,
            height: "40px",
            width: "40px",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={(e) => {
            console.log(e.currentTarget);
            dispatch(toggleMyMenu(e.currentTarget));
          }}
        >
          <LinearScaleOutlined
            fontSize={isMediumScreen ? "large" : "medium"}
            sx={{
              color: darkMode ? "white" : "black", // Adapt icon color to dark mode
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Post;
