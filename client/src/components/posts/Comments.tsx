import { LinearScaleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

const Comments = () => {
  const handleDeleteComment = () => {};
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        px={2}
        pb={4}
        borderBottom={"1px solid gray"}
        mx={"auto"}
        width={"90%"}
      >
        <Stack direction={"row"} gap={2}>
          <Avatar src="" alt="" />
          <Stack direction="column">
            <Typography variant={"h6"} fontWeight={"bold"} fontSize={"1rem"}>
              Akshattandon__
            </Typography>
            <Typography
              variant={"subtitle2"}
              fontSize={".9rem"}
              color="GrayText"
            >
              this is comment
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Typography
            position={"relative"}
            top={5}
            color="GrayText"
            variant="subtitle1"
            fontSize={".9rem"}
          >
            24 min
          </Typography>

          <LinearScaleOutlined fontSize={"large"} className="text-gray-600" />
        </Stack>
      </Stack>
      <Menu
        id="basic-menu"
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comments;
