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
import { Checkbox, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const PostTwo: React.FC = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack flexDirection={"column"} justifyContent={"space-between"}>
      <Stack flexDirection={"column"} gap={2}>
        <Stack flexDirection={"column"}>
          <Typography
            variant="h6"
            fontSize={_700 ? "1.2rem" : _500 ? "1rem" : ".9rem"}
            color="GrayText"
          >
            Akshat tandon
          </Typography>
          <Typography
            variant="subtitle2"
            fontSize={
              _700 ? "1.2rem" : _400 ? "1rem" : _300 ? ".9rem" : ".8rem"
            }
            color="GrayText"
          >
            hi guyz ! comment on this project
          </Typography>
        </Stack>
        <img
          src="/Threads-logo-white-bg.png"
          alt="Image"
          loading="lazy"
          width={
            _700
              ? "400px"
              : _500
              ? "350px"
              : _400
              ? "250px"
              : _300
              ? "180px"
              : "150px"
          }
          height={"auto"}
        />
      </Stack>
      <Stack flexDirection={"column"} gap={1}>
        <Stack flexDirection={"row"} gap={2} m={1}>
          <Checkbox
            size={_700 ? "medium" : "small"}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
          <Checkbox
            size={_700 ? "medium" : "small"}
            icon={<ModeCommentOutlined />}
            checkedIcon={<ModeComment />}
          />
          <Checkbox
            size={_700 ? "medium" : "small"}
            icon={<LoopOutlined />}
            checkedIcon={<Loop />}
          />

          <Checkbox
            size={_700 ? "medium" : "small"}
            icon={<SendOutlined />}
            checkedIcon={<Send />}
          />
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          position={"relative"}
          left={5}
          mx={1}
          top={-3}
        >
          <Typography
            variant="caption"
            color="GrayText"
            fontSize={_700 ? "1rem" : ".9rem"}
          >
            5 likes
          </Typography>
          <Typography
            variant="caption"
            color="GrayText"
            fontSize={_700 ? "1rem" : ".9rem"}
          >
            2 comments
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;
