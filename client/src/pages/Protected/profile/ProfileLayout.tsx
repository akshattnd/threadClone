import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../../rtk/slice";
import { Link, Outlet, useParams } from "react-router-dom";
import { RootState } from "../../../rtk/store";
import { useFollowUserMutation, useUserDetailsQuery } from "../../../rtk/service";
import { useEffect, useState } from "react";
import EditProfile from "../../../components/model/EditProfile";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { darkMode, myProfile } = useSelector(({ service }: RootState) => service);
  const params = useParams();
  const { data } = useUserDetailsQuery(params?.id);
  const [followUser, followUserData] = useFollowUserMutation();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [myAccount, setMyAccount] = useState<boolean>(false);
  const checkIsFollowing = () => {
    if (data && myProfile) {
      const follow = data.user.followers.filter((e: any) => e._id == myProfile.user?._id);
      if (follow.lenght > 0) {
        setIsFollowing(true);
        return;
      }

    }
    setIsFollowing(false);
  }
  const checkIsMyAccount = () => {

    if (data && myProfile) {
      const isTrue = data.user?._id == myProfile?.user?._id;
      setMyAccount(isTrue);
    }
  };
  const handleFollow = async () => {
    if (data) {
      await followUser(data?.user?._id);
    }
  }
  useEffect(() => {

    checkIsFollowing();
    checkIsMyAccount();
    console.log(data);

  }, [isFollowing, myAccount]);
  useEffect(() => {
    if (followUserData.isError) { }
    if (followUserData.isSuccess) { }
  }, [followUserData.isError, followUserData.isSuccess]);
  return (
    <>
      <Stack
        gap={1}
        width={{ xs: "90%", sm: "600px", md: "800px" }}
        maxWidth="800px" // Prevents the layout from exceeding 800px
        p={2}
        m={2}
        mx="auto"
      >
        {/* Header Section */}
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack gap={1}>
            <Typography
              variant="h2"
              sx={{ color: darkMode ? "white" : "black" }}
              fontWeight="bold"
              fontSize={{ xs: "1.5rem", sm: "2rem" }}
            >
              {data?.user ? data.user.username : " "}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="h2"
                fontSize={{ xs: "1rem", sm: "1.1rem" }}
                sx={{ color: darkMode ? "lightgray" : "gray" }}
              >
                {data?.user ? data.user.email : ""}
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{
                  color: darkMode ? "gray" : "gray",
                  fontSize: ".8rem",
                  backgroundColor: darkMode ? "#F1F0E8" : "#d1D2D2",
                }}
              />
            </Stack>
          </Stack>
          <Avatar src={data?.user ? data.user.profilePic : ""}
            alt={data?.user ? data.user.username : ""} sx={{ width: 60, height: 60 }} />
        </Stack>

        {/* Bio Section */}
        <Typography
          variant="subtitle2"
          sx={{ color: darkMode ? "lightgray" : "gray" }}
        >
          {data?.user ? data.user.bio : "bio"}
        </Typography>

        {/* Followers and Icon Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="subtitle2"
            color={darkMode ? "lightgray" : "gray"}
          >
            {data?.user && data.user.followers.length} followers
          </Typography>
          <IconButton size="large">
            <Instagram sx={{ color: darkMode ? "white" : "gray" }} />
          </IconButton>
        </Stack>

        {/* Edit Profile Button */}
        <Button
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: "800px",
            border: darkMode ? "1px solid white" : "1px solid black",
            color: darkMode ? "white" : "black",
            borderRadius: ".8rem",

          }}
          onClick={myAccount ? () => dispatch(editProfileModel(true)) : () => { handleFollow() }}
        >
          {myAccount ? "Edit Profile" : isFollowing ? "Follow user" : "followed"}
        </Button>


        {/* Navigation Links */}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          my={5}
          py={2}
          borderBottom={darkMode ? "2px solid white" : "2px solid black"}
          fontSize={{ xs: "1rem", sm: "1.2rem" }}
          width="100%"
          maxWidth="800px"
          mx="auto"
          sx={{ color: darkMode ? "white" : "black" }}
        >
          <Link to={`threads/${data?.user._id}`}>Threads</Link>
          <Link to={`replies/${data?.user._id}`}>Replies</Link>
          <Link to={`reposts/${data?.user._id}`}>Repost</Link>
        </Stack>
      </Stack>
      <Outlet />
      <EditProfile />
    </>
  );
};

export default ProfileLayout;
