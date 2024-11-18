import React from "react";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Stack,
  Stepper,
  useMediaQuery,
} from "@mui/material";
const PostOne: React.FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Badge
          badgeContent={"+"}
          color="info"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            alt="user-logo"
            src=""
            sx={{ width: _700 ? 36 : 28, height: _700 ? 36 : 28 }}
          />
        </Badge>
        <Stack flexDirection={"column"} alignItems={"center"} height={"100%"}>
          <Stepper
            orientation="vertical"
            activeStep={0}
            sx={{
              border: ".1rem solid gray",
              width: "0px",
              height: "100%",
            }}
          ></Stepper>
          <AvatarGroup
            max={2}
            sx={{
              "& .MuiAvatar-root": {
                width: _700 ? 24 : 16,
                height: _700 ? 24 : 16,
                fontSize: _700 ? 12 : 8,
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
