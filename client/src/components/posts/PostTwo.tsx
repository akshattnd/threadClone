import React, { useState, useEffect } from "react";
import { Favorite, FavoriteBorder, LoopOutlined, ModeCommentOutlined } from "@mui/icons-material";
import { IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import { useLikePostMutation, useRepostMutation, useSinglePostQuery } from "../../rtk/service";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
const PostTwo: React.FC<{ e: any }> = ({ e }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { darkMode, myProfile } = useSelector(({ service }: RootState) => service);
  const [likePost] = useLikePostMutation();
  const [repost, repostData] = useRepostMutation();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      const { data } = await likePost(e?._id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

  };
  const handleRepost = async () => {


    const result = await repost(e?._id);
    console.log(result);


  };
  const checkIsLiked = () => {
    if (e?.likes.length > 0) {

      const variable = e.likes.filter((like) => like._id === myProfile.user._id);
      if (variable.length > 0) {
        setIsLiked(true);
        return;
      }
    }
    setIsLiked(false);
  };
  useEffect(() => {
    if (repostData.isError) {
      toast.error(repostData.error?.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });

    }
    if (repostData.isSuccess) {
      toast.success(repostData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [repostData.isSuccess, repostData.isError]);
  useEffect(() => {


    checkIsLiked();
  }, [e]);
  return (
    <Stack flexDirection="column" justifyContent="space-between" gap={3} width={{ xs: "90%", sm: "70%", md: "60%" }} mx={2}>
      {/* User Info and Image */}
      <Link to={`/post/${e?._id}`} >
        <Stack spacing={2}>
          <Stack>
            <Typography variant={isLargeScreen ? "h6" : "subtitle1"} color={darkMode ? "white" : "GrayText"}>
              {e?.admin?.username ?? "Unknown User"}
            </Typography>
            <Typography variant="subtitle2" fontSize={isMediumScreen ? "0.9rem" : "0.8rem"} color={darkMode ? "white" : "GrayText"}>
              {e?.text}
            </Typography>
          </Stack>
          {e && e.media && (
            <img
              src={e.media}
              alt="Post"
              loading="lazy"
              style={{
                width: isLargeScreen ? "400px" : isMediumScreen ? "380px" : "350px",
                height: "300px",
                margin: "auto",
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
          )}
        </Stack>
      </Link>

      {/* Interaction Buttons */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} justifyContent="left">
          {
            isLiked ? (<IconButton onClick={handleLike} size={isLargeScreen ? "medium" : "small"}>
              <Favorite sx={{ color: "red" }} />
            </IconButton>) : (<IconButton onClick={handleLike} size={isLargeScreen ? "medium" : "small"}>
              <FavoriteBorder sx={{ color: darkMode ? "white" : "gray" }} />
            </IconButton>)
          }


          <Link to={`/post/${e?._id}#comment`} className="cursor-pointer">
            <IconButton size={isLargeScreen ? "medium" : "small"}>
              <ModeCommentOutlined sx={{ color: darkMode ? "white" : "gray" }} />
            </IconButton>
          </Link>
          <IconButton size={isLargeScreen ? "medium" : "small"} onClick={handleRepost}>
            <LoopOutlined sx={{ color: darkMode ? "white" : "gray" }} />
          </IconButton>
        </Stack>

        {/* Like and Comment Count */}
        <Stack direction="row" spacing={1} pl={2}>
          <Typography variant="caption" fontSize={isMediumScreen ? "1rem" : "0.9rem"} color={darkMode ? "white" : "GrayText"}>
            {e?.likes?.length ?? 0} likes
          </Typography>
          <Typography variant="caption" fontSize={isMediumScreen ? "1rem" : "0.9rem"} color={darkMode ? "white" : "GrayText"}>
            {e?.comments?.length ?? 0} comments
          </Typography>
        </Stack>
      </Stack>

    </Stack>
  );
};

export default PostTwo;
