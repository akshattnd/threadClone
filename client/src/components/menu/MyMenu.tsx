import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import { toggleMyMenu } from "../../rtk/slice";
import { useDeletePostMutation } from "../../rtk/service";
import { useEffect } from "react";

const MyMenu = () => {
  const dispatch = useDispatch();
  const { openMyMenu, darkMode, postId } = useSelector(
    (state: RootState) => state.service
  );

  const [deletePost, deletePostData] = useDeletePostMutation();
  const handleDeletePost = async () => {
    dispatch(toggleMyMenu(null));
    await deletePost(postId);
  }

  const handleClose = () => {
    dispatch(toggleMyMenu(null));
  };

  useEffect(() => {
    if (deletePostData.isSuccess) { }
    if (deletePostData.isError) { }
  }, [deletePostData.isError, deletePostData.isSuccess])

  return (
    <div>
      <Menu
        onClose={handleClose}
        anchorEl={openMyMenu}
        open={openMyMenu != null ? true : false}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          },
        }}
      >

        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "#444" : "#f0f0f0",
            },
          }}
          onClick={handleDeletePost}
        >
          Delete
        </MenuItem>

      </Menu>
    </div>
  );


  //   <Menu
  //     onClose={handleClose}
  //     anchorEl={openMyMenu}
  //     open={openMyMenu != null ? true : false}
  //     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     sx={{
  //       "& .MuiPaper-root": {
  //         backgroundColor: darkMode ? "#333" : "#fff", // Menu background
  //         color: darkMode ? "#fff" : "#000", // Text color
  //       },
  //     }}
  //   >
  //     <MenuItem
  //       onClick={handleDeletePost}
  //       sx={{
  //         "&:hover": {
  //           backgroundColor: darkMode ? "#444" : "#f0f0f0", // Hover effect
  //         },
  //       }}
  //     >
  //       delete
  //     </MenuItem>

  //   </Menu>
  // );
};

export default MyMenu;
