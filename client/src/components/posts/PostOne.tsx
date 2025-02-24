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
import { Link } from "react-router-dom";

const PostOne: React.FC<{ e: any }> = ({ e }) => {
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
        <Link to={`profile/${e?._id}`}>
          <Badge
            badgeContent={"+"}
            color={"info"}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              alt="user-logo"
              src={e?.admin ? e.admin.profileImg : ""}
              sx={{
                width: isMediumScreen ? 36 : 28,
                height: isMediumScreen ? 36 : 28,
              }}
            />
          </Badge>
        </Link>

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
          {e?.comments && e.comments.length > 0 && <AvatarGroup
            max={e.comments.length > 2 ? e.comments.length : 2}
            sx={{
              "& .MuiAvatar-root": {
                width: isMediumScreen ? 24 : 16,
                height: isMediumScreen ? 24 : 16,
                fontSize: isMediumScreen ? 12 : 8,
              },
            }}
          >

            <Avatar src={e.comments[0].admin.profileImg}
              alt={e.comments[0].admin.username}></Avatar>
            {e.comments.length > 1 && <Avatar src={e.comments[1].admin.profileImg} alt={e.comments[1].admin.username}></Avatar>}

          </AvatarGroup>}

        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;
