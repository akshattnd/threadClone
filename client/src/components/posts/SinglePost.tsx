import { Stack, TextField } from "@mui/material";
import Post from "../common/Post";
import Comments from "./Comments";
import { styled } from "@mui/system";
import { useState } from "react";

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

  return (
    <>
      <Stack direction="column" my={5} gap={3} width="90%" mx="auto">
        <Post />
        <Stack direction="column" gap={3}>
          <Comments />
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
        />
      </Stack>
    </>
  );
};

export default SinglePost;
