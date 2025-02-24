import { Stack, TextField } from "@mui/material";
import Post from "../common/Post";
import Comments from "./Comments";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../../rtk/service";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
});

const SinglePost = () => {
  const [comment, setComment] = useState<string>("");
  const params = useParams();
  const { data, refetch } = useSinglePostQuery(params?.id);
  console.log(data);
  const [addComment, addCommentData] = useAddCommentMutation();
  const handleAddComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (data && e.key == "Enter") {
      try {

        await addComment({ id: data.post._id, text: comment });
      } catch (err) {
        console.log(err);
      }

    }
  }

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComment("");
      refetch();
      // show success toast 
    }
    if (addCommentData.isError) {
      // show error toast
    }
  }, [addCommentData.isSuccess, addCommentData.isError]);

  return (
    <>
      <Stack direction="column" my={5} pb={5} gap={3} width="90%" mx="auto">
        <Post e={data?.post} />
        <Stack direction="column" gap={3} >
          {data && data.post?.comments.length > 0 && data.post.comments.map((comment: any) => {
            return <Comments key={comment._id} e={comment} postId={data.post._id} />
          })}

        </Stack>
        <CustomTextField
          placeholder="Comment here"
          id="comments"
          variant="outlined"
          fullWidth
          value={comment}
          sx={{
            maxWidth: "600px",
            mx: "auto",
            mt: 2,
            px: 2,
            bgcolor: "#f9f9f9",
            borderRadius: "5px",
          }}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}

        />
      </Stack>
    </>
  );
};

export default SinglePost;
