import {
  Favorite,
  FavoriteBorder,
  SendOutlined,
  Send,
  LoopOutlined,
  Loop,
  ModeCommentOutlined,
  ModeComment,
} from "@mui/icons-material";
import {
  Checkbox,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";

const PostTwo: React.FC = () => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Stack
      flexDirection="column"
      justifyContent="space-between"
      gap={3}
      width={{ xs: "90%", sm: "70%", md: "60%" }}
      mx={2}
    >
      {/* User Info and Image */}
      <Stack spacing={2}>
        <Stack>
          <Typography
            variant="h6"
            fontSize={
              isLargeScreen ? "1.2rem" : isMediumScreen ? "1rem" : ".9rem"
            }
            color={darkMode ? "white" : "GrayText"}
          >
            Akshat Tandon
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize={
              isLargeScreen ? "1rem" : isMediumScreen ? "0.9rem" : "0.8rem"
            }
            color={darkMode ? "white" : "GrayText"}
          >
            Hi guys! Comment on this project
          </Typography>
        </Stack>
        <img
          src="/Threads-logo-black-bg.webp"
          alt="Post Image"
          loading="lazy"
          style={{
            width: isLargeScreen
              ? "400px"
              : isMediumScreen
                ? "380px"
                : "350px",
            height: "300px",
            margin: "1 auto",
            borderRadius: "4px", // Slightly rounded corners
            objectFit: "cover", // Ensure proper scaling of the image
          }}
        />
      </Stack>

      {/* Interaction Buttons */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Checkbox
            size={isLargeScreen ? "medium" : "small"}
            icon={
              <FavoriteBorder sx={{ color: darkMode ? "white" : "gray" }} />
            }
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
          <Checkbox
            size={isLargeScreen ? "medium" : "small"}
            icon={
              <ModeCommentOutlined
                sx={{ color: darkMode ? "white" : "gray" }}
              />
            }
            checkedIcon={<ModeComment sx={{ color: "blue" }} />}
          />
          <Checkbox
            size={isLargeScreen ? "medium" : "small"}
            icon={<LoopOutlined sx={{ color: darkMode ? "white" : "gray" }} />}
            checkedIcon={<Loop sx={{ color: "green" }} />}
          />
          <Checkbox
            size={isLargeScreen ? "medium" : "small"}
            icon={<SendOutlined sx={{ color: darkMode ? "white" : "gray" }} />}
            checkedIcon={<Send sx={{ color: "purple" }} />}
          />
        </Stack>

        {/* Like and Comment Count */}
        <Stack direction="row" spacing={1} pl={2}>
          <Typography
            variant="caption"
            fontSize={isMediumScreen ? "1rem" : "0.9rem"}
            color={darkMode ? "white" : "GrayText"}
          >
            5 likes
          </Typography>
          <Typography
            variant="caption"
            fontSize={isMediumScreen ? "1rem" : "0.9rem"}
            color={darkMode ? "white" : "GrayText"}
          >
            2 comments
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;
