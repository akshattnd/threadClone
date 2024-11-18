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

    "&.Mui-focused.Mui-active fieldset": {
      borderColor: "black",
    },
  },

  "& .MuiInputBase-input": {
    color: "black",
  },
});
const SinglePost = () => {
  const [coment, setComment] = useState<string>("");
  return (
    <>
      <Stack direction="column" my={5} gap={2}>
        <Post />
        <Stack direction="column" width={"80%"} mx={"auto"} my={5} gap={2}>
          <Comments></Comments>
        </Stack>
        <CustomTextField
          placeholder="comment here"
          id={"comments"}
          sx={{ width: "50%", mx: "auto", my: 5, p: 1 }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></CustomTextField>
      </Stack>
    </>
  );
};

export default SinglePost;
