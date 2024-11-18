import {
  Stack,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const InputThread: React.FC = () => {
  const _700 = useMediaQuery("(min-height:700px)");
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={_700 ? "70%" : "90%"}
      mx={"auto"}
      height={"3.5rem"}
      my={5}
      borderBottom={"2px solid gray"}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
        {/* avatar willl be use as srouce not for logo */}
        <Avatar alt="user-logo" src="" />

        <Typography color={"GrayText"}> Start a thread....</Typography>
      </Stack>
      <Button
        size={"medium"}
        sx={{
          marginX: "1px",
          color: "aliceblue",
          bgcolor: "gray",
          ":hover": {
            bgcolor: "black",
            cursor: "pointer",
          },
        }}
      >
        post
      </Button>
    </Stack>
  );
};

export default InputThread;
