import { LinearScaleOutlined } from "@mui/icons-material";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PostOne from "../posts/PostOne";
import PostTwo from "../posts/PostTwo";

const Post: React.FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"2px solid gray"}
      p={1}
      mx={_700 ? "auto" : "0"}
      width={_700 ? "70%" : "90%"}
      sx={{ cursor: "pointer" }}
    >
      <Stack flexDirection={"row"} gap={_700 ? 2 : 0}>
        <PostOne />
        <PostTwo />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={0}
        fontSize={_700 ? "1rem" : ".9rem"}
      >
        <Typography
          variant="caption"
          gap={1}
          position={"relative"}
          top={2}
          fontSize={"1rem"}
          color="GrayText"
        >
          24h
        </Typography>

        <LinearScaleOutlined
          fontSize={_700 ? "large" : "medium"}
          className="text-gray-600"
        />
      </Stack>
    </Stack>
  );
};

export default Post;
