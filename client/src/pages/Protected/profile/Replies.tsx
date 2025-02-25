import { Stack, Typography, useMediaQuery } from "@mui/material";
import Comments from "../../../components/posts/Comments";
import { useSelector } from "react-redux";
import { RootState } from "../../../rtk/store";

const Replies = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { userData } = useSelector((state: RootState) => state.service);
  return (
    <>
      <Stack gap={2} width={_700 ? "800px" : "80%"} mx={"auto"}>
        {userData ? userData.user?.replies.length > 0 ? userData.user.replies.map((replies: any) => {
          return <Comments postId={replies.post} e={replies} key={replies._id} />

        }) : <Typography textAlign={"center"} variant="h6">
          No Replies yet !
        </Typography>
          : null}

      </Stack>
    </>
  );
};

export default Replies;
