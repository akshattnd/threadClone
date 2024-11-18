import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Instagram } from "@mui/icons-material";

import { Link, Outlet } from "react-router-dom";
const ProfileLayout = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack gap={1} width={_700 ? "800px" : "90%"} p={2} m={2} mx={"auto"}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
        >
          <Stack gap={1}>
            <Typography variant="h2" fontWeight={"bold"} fontSize={"2rem"}>
              akshattandon__
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography variant="h2" fontSize={"1.1rem"} color="GrayText">
                akshattandon__
              </Typography>
              <Chip
                label={"threads.net"}
                size="small"
                sx={{ fontSize: ".8rem" }}
              ></Chip>
            </Stack>
          </Stack>
          <Avatar src="" alt="" sx={{ width: 60, height: 60 }} />
        </Stack>
        <Typography variant="subtitle2">this is bio!</Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="subtitle2" color="gray">
            19 follower
          </Typography>
          <IconButton size="large">
            <Instagram />
          </IconButton>
        </Stack>
        <Button
          sx={{
            mx: "auto",
            width: _700 ? "800px" : "90%",
            border: "1px solid black",
            borderColor: "black",
            color: "black",
            borderRadius: ".8rem",
          }}
        >
          {" "}
          edit Profile
        </Button>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          my={5}
          py={2}
          borderBottom={"2px solid black"}
          fontSize={_700 ? "1.2rem" : "1rem"}
          width={_700 ? "800px" : "90%"}
          mx={"auto"}
        >
          <Link to="threads/1">Threads</Link>

          <Link to={"replies/1"}>Replies</Link>

          <Link to={"repost/1"}>Repost</Link>
        </Stack>
      </Stack>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
