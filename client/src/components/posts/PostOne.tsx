import React from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Stack,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";

const PostOne: React.FC = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { darkMode } = useSelector(({ service }: RootState) => service);
  return (
    <>
      <Stack
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Badge with Avatar */}
        <Badge
          badgeContent={"+"}
          color={"info"}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            alt="user-logo"
            src=""
            sx={{
              width: isMediumScreen ? 36 : 28,
              height: isMediumScreen ? 36 : 28,
            }}
          />
        </Badge>

        {/* Stepper and AvatarGroup */}
        <Stack
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <Stepper
            orientation="vertical"
            activeStep={0}
            sx={{
              border: darkMode ? ".1rem solid white" : ".1rem solid gray",
              width: "0px",
              height: "100%",
            }}
          ></Stepper>
          <AvatarGroup
            max={2}
            sx={{
              "& .MuiAvatar-root": {
                width: isMediumScreen ? 24 : 16,
                height: isMediumScreen ? 24 : 16,
                fontSize: isMediumScreen ? 12 : 8,
              },
            }}
          >
            <Avatar src=""></Avatar>
            <Avatar src=""></Avatar>
            <Avatar src=""></Avatar>
          </AvatarGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;
