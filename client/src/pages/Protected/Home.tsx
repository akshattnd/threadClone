import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import InputThread from "../../components/InputThread";
import Post from "../../components/common/Post";
import { useAllPostQuery } from "../../rtk/service";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import Loading from "../../components/common/Loading";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { data, isLoading } = useAllPostQuery(page);
  const { allPost } = useSelector((state: RootState) => state.service);
  useEffect(() => {
    if (data && data.posts?.length > 3) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [data]);
  return (
    <>
      <InputThread />
      <Stack flexDirection={"column"} gap={2} mb={5}>
        {(allPost?.posts) ? (allPost.posts.length > 0) ? allPost.posts.map((post: any) => {
          return <Post key={post._id} e={post} />
        }) : <Typography>no post to shows</Typography> : isLoading && <Loading />}
      </Stack>
      {showMore ? <Button
        onClick={() => { setPage(p => p++) }}
        size={"large"}
        sx={{ my: 5, p: 3, textDecoration: "underline", cursor: "pointer" }}
      >
        load more
      </Button> : <Typography variant="caption" mb={1} mx={'auto'} >no more posts</Typography>}

    </>
  );
};

export default Home;
