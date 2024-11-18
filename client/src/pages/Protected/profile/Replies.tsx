import { Stack } from "@mui/material";
import Comments from "../../../components/posts/Comments";

const Replies = () => {
  return (
    <>
      <Stack gap={2} width={"800px"} mx={"auto"}>
        <Comments></Comments>{" "}
      </Stack>
    </>
  );
};

export default Replies;
