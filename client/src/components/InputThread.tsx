import {
  Stack,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../rtk/slice";
import { RootState } from "../rtk/store";

const InputThread: React.FC = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { myProfile } = useSelector((state: RootState) => state.service);
  return (
    <Stack
      onClick={() => {
        dispatch(addPostModel(true));
      }}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={isMediumScreen ? "70%" : "90%"}
      mx={"auto"}
      height={"3.5rem"}
      my={4}
      py={isSmallScreen ? 1 : 0}
      borderBottom={"2px solid gray"}
      sx={{
        gap: isSmallScreen ? 1 : 2,
      }}
    >

      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={isSmallScreen ? 1 : 2}
      >
        <Avatar
          alt="user-logo"
          src={myProfile ? myProfile.profileImg : " "}
          sx={{
            width: isSmallScreen ? 36 : 48,
            height: isSmallScreen ? 36 : 48,
          }}
        />
        <Typography
          color={"GrayText"}
          fontSize={isSmallScreen ? "0.9rem" : "1rem"}
        >
          Start a thread...
        </Typography>
      </Stack>


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
