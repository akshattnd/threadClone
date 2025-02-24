import { LinearScaleOutlined } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RootState } from "../../rtk/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDeleteCommentMutation, useSinglePostQuery } from "../../rtk/service";

const Comments = ({ e, postId }: { e: any, postId: any }) => {
  const { darkMode, myProfile } = useSelector(({ service }: RootState) => service);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [commentMenu, setCommentMenu] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { refetch } = useSinglePostQuery(postId);
  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();


  const checkAdmin = () => {
    if (e && myProfile) {
      if (e.admin._id == myProfile.user._id) {
        setIsAdmin(true);
      }
      return;
    }
    setIsAdmin(false);

  }
  const handleClose = () => {
    setCommentMenu(null);
  }
  const handleDeleteComment = async () => {
    await deleteComment({ id: e?._id, postId });
    handleClose();
    refetch();
  };
  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      // success toast
    }
    if (deleteCommentData.isError) {
      // error toast
    }
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);
  useEffect(() => {
    checkAdmin();
  }, [])

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={2}
        pb={4}
        borderBottom="1px solid gray"
        mx="auto"
        width={{ xs: "90%", sm: "70%" }}
        maxWidth="800px" // Restricts layout width for consistency
      >
        {/* User Info and Comment */}
        <Stack direction="row" gap={2}>
          <Avatar src={e?.admin ? e.admin.profileImg : ""} alt={e?.admin ? e.admin.username : " "} />
          <Stack direction="column">
            <Typography
              variant="h6"
              fontWeight="bold"
              color={darkMode ? "white" : "GrayText"}
              fontSize={{ xs: ".9rem", sm: "1rem" }}
            >
              {e ? e.admin?.username : " "}
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={{ xs: ".8rem", sm: ".9rem" }}
              color={darkMode ? "white" : "GrayText"}
            >
              {e ? e?.text : " "}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          fontSize={{ xs: ".8rem", sm: ".9rem" }}
        >
          <Typography
            position="relative"
            color={darkMode ? "white" : "GrayText"}
            variant="subtitle1"
            fontSize="inherit"
          >
            { }
          </Typography>
          {isAdmin && <IconButton
            sx={{ alignItems: "start", paddingTop: "0px" }}
            onClick={(e) => {
              setCommentMenu(e.currentTarget);
            }}
          >
            <LinearScaleOutlined
              fontSize={isMediumScreen ? "large" : "medium"}
              className={darkMode ? "text-white" : "text-gray-600"}
            />
          </IconButton>}

        </Stack>
      </Stack>

      {/* Dropdown Menu */}
      <Menu
        id="basic-menu"
        anchorEl={commentMenu}
        open={commentMenu != null ? true : false}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => {
          handleClose();

        }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comments;
