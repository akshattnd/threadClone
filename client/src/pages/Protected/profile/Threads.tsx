import { Stack, useMediaQuery } from "@mui/material";
import Post from "../../../components/common/Post";

const Threads = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack gap={2} mb={10} width={_700 ? "800px" : "90%"} mx={"auto"}>
        <Post />
      </Stack>
    </>
  );
};

export default Threads;
