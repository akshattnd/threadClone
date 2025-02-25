import { Stack, useMediaQuery } from "@mui/material";
import Post from "../../../components/common/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../rtk/store";



const Threads = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { userData } = useSelector((state: RootState) => state.service);

  return (
    <>
      <Stack gap={2} mb={10} width={_700 ? "800px" : "90%"} mx={"auto"}>
        {userData && userData.user?.threads?.map((thread: any) => {
          return <Post e={thread} key={thread._id} />
        })}

      </Stack>
    </>
  );
};

export default Threads;
