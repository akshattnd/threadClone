import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/common/Post";
import { RootState } from "../../../rtk/store";
import { useSelector } from "react-redux";
const Repost = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { userData } = useSelector((state: RootState) => state.service);

  return (
    <Stack gap={2} width={_700 ? "800px" : "80%"} mx={"auto"}>
      {userData ? userData.user?.reposts > 0 ? userData.user.reposts.map((repost: any) => {
        return <Post e={repost} key={repost._id} />

      }) : <Typography textAlign={"center"} variant="h6">
        No Repost yet !
      </Typography>
        : null}

    </Stack>
  );
};

export default Repost;
