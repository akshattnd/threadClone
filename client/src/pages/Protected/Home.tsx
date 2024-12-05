import React from "react";
import { Button, Stack } from "@mui/material";
import InputThread from "../../components/InputThread";
import Post from "../../components/common/Post";
const Home: React.FC = () => {
  return (
    <>
      <InputThread />
      <Stack flexDirection={"column"} gap={2} mb={5}>
        <Post />
        <Post />
        <Post />
      </Stack>
      <Button
        size={"large"}
        sx={{ my: 5, p: 3, textDecoration: "underline", cursor: "pointer" }}
      >
        load more
      </Button>
    </>
  );
};

export default Home;
