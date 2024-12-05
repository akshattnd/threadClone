import {
  Stack,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addPostModel } from "../rtk/slice";

const InputThread: React.FC = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md")); // 768px and above
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // 600px and below
  const dispatch = useDispatch();
  return (
    <Stack
      onClick={() => {
        dispatch(addPostModel(true));
      }}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={isMediumScreen ? "70%" : "90%"} // Width adjusts based on screen size
      mx={"auto"}
      height={"3.5rem"}
      my={4}
      py={isSmallScreen ? 1 : 0} // Extra padding for smaller screens
      borderBottom={"2px solid gray"}
      sx={{
        gap: isSmallScreen ? 1 : 2, // Adjusts spacing between elements for smaller screens
      }}
    >
      {/* Left section: Avatar and Placeholder */}
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={isSmallScreen ? 1 : 2}
      >
        <Avatar
          alt="user-logo"
          src=""
          sx={{
            width: isSmallScreen ? 36 : 48,
            height: isSmallScreen ? 36 : 48,
          }}
        />
        <Typography
          color={"GrayText"}
          fontSize={isSmallScreen ? "0.9rem" : "1rem"} // Font size scales with screen size
        >
          Start a thread...
        </Typography>
      </Stack>

      {/* Post button */}
      <Button
        size={isSmallScreen ? "small" : "medium"}
        sx={{
          px: isSmallScreen ? 2 : 3,
          color: "white",
          bgcolor: "gray",
          ":hover": {
            bgcolor: "black",
            cursor: "pointer",
          },
        }}
      >
        Post
      </Button>
    </Stack>
  );
};

export default InputThread;
